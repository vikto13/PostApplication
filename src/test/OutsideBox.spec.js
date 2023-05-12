import { shallowMount } from "@vue/test-utils";
import OutsideBox from "../components/OutsideBox.vue"
import { describe, it, expect } from "vitest";
import Vuex from 'vuex'
import Vue from "vue";

describe('OutsideBox.vue', () => {
    Vue.use(Vuex)
    let wrapper;
    let store;
    let state = {
        boxMessage: null
    };
    const getters = {
        boxMessage: (state) => state.boxMessage,
        article: () => null,
    };
    const actions = {
        clearArticle: () => null,
        clearMessage: ({ commit }) => {
            commit('setMessage')
        },
        joinArticles: () => null,
        fetchArticles: () => null,
    };
    const mutations = {
        setMessage: (state) => {
            state.boxMessage = {
                text: 'Testing',
                type: 'danger',
            }
        }
    };
    beforeEach(() => {
        store = new Vuex.Store({
            state,
            getters,
            actions,
            mutations
        })
        wrapper = shallowMount(OutsideBox, {
            store,
        });
    });
    it('shows message when clicked delete button', async () => {

        const modalHeader = wrapper.find('.modal-header')
        expect(modalHeader.text()).toBe('')
        expect(modalHeader.classes().includes('bg-danger')).toBeFalsy()

        const button = wrapper.find('button')
        await button.trigger('click')

        expect(modalHeader.text()).toBe('Testing')
        expect(modalHeader.classes().includes('bg-danger')).toBeTruthy()


    });

})