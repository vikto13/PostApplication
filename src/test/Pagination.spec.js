import { createLocalVue, mount, shallowMount } from "@vue/test-utils";
import Pagination from "../components/Pagination.vue"
import { describe, it, expect } from "vitest";
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe("Pagination.vue", () => {
    let state
    let getters
    let actions
    let store
    let mutations
    beforeEach(() => {
        state = {
            currentPage: 0,
            pageSlice: 4,
        },
            mutations = {
                next: (state) => {
                    state.currentPage = state.currentPage + 1
                }
            }
        actions = {
            toNextPage: ({ commit }, value) => {
                commit('next', value)
            }
        },
            getters = {
                pagination: state => ({ ...state }),

            }
        store = new Vuex.Store({
            getters,
            actions,
            state,
            mutations
        })
    });
    it("should not navigate to next and previuos pages", () => {
        const itemsSize = 3;

        const wrapper = shallowMount(Pagination, {
            propsData: { itemsSize },
            store,
            localVue
        });

        const pageButtons = wrapper.findAll('.disabled')
        expect(pageButtons).toHaveLength(2);
    });
    it("should navigate to next page", () => {
        const itemsSize = 8;

        const wrapper = shallowMount(Pagination, {
            propsData: { itemsSize },
            store,
            localVue
        });

        const pageButtons = wrapper.findAll('.disabled')
        expect(pageButtons).toHaveLength(1);
    });
    it("should navigate to previous page", () => {
        const itemsSize = 32;
        store.getters.pagination.currentPage = 1

        const wrapper = shallowMount(Pagination, {
            propsData: { itemsSize },
            store,
            localVue
        });

        const pageButtons = wrapper.findAll('.disabled')
        expect(pageButtons).toHaveLength(0);
    });
    it("should disable the next button when is on the last page ", () => {
        const itemsSize = 7;
        store.getters.pagination.currentPage = 1

        const wrapper = shallowMount(Pagination, {
            propsData: { itemsSize },
            store,
            localVue
        });

        const pageButtons = wrapper.findAll('a')
        expect(pageButtons.at(pageButtons.length - 1).classes().includes('disabled')).toBeTruthy()
    });
    it("shows one pagination button if items are less than given pagine size", () => {
        const itemsSize = 4;
        store.getters.pagination.currentPage = 0

        const wrapper = shallowMount(Pagination, {
            propsData: { itemsSize },
            store,
            localVue
        });

        const pageButtons = wrapper.findAll('a')
        expect(pageButtons).toHaveLength(3)
    });
    it("shows five pagination buttons if are a lot of items", () => {
        const itemsSize = 15000;
        store.getters.pagination.currentPage = 5

        const wrapper = shallowMount(Pagination, {
            propsData: { itemsSize },
            store,
            localVue
        });

        const pageButtons = wrapper.findAll('a')
        expect(pageButtons).toHaveLength(5)
    });
    it("should change button to active when going to next page", async () => {
        const itemsSize = 25;
        const wrapper = shallowMount(Pagination, {
            propsData: { itemsSize },
            store,
            localVue
        });
        const button = wrapper.findAll('a')

        expect(button.at(1).classes().includes('active')).toBeTruthy()
        await button.at(button.length - 1).trigger('click')
        expect(button.at(1).classes().includes('active')).toBeFalsy()
        expect(button.at(2).classes().includes('active')).toBeTruthy()
    });
});