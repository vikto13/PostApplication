import { createLocalVue, mount, shallowMount } from "@vue/test-utils";
import Pagination from "../components/Pagination.vue"
import { describe, it, expect } from "vitest";
import Vuex from 'vuex'
import createWrapper, { mergeDeep } from "./mockFacktory";
import { changeState } from "./addValues";

describe("Pagination.vue", () => {

    let wrapper = createWrapper(Pagination, {
        propsData: { itemsSize: 3 }
    })

    it("should not navigate to next and previuos pages", () => {
        const pageButtons = wrapper.findAll('.disabled')
        expect(pageButtons).toHaveLength(2);
    })

    it("should navigate to next page", async () => {
        wrapper = createWrapper(Pagination, {
            propsData: { itemsSize: 10 }
        })
        const pageButtons = wrapper.findAll('.disabled')
        expect(pageButtons).toHaveLength(1);
    })

    it("should navigate to previous page", async () => {
        wrapper = createWrapper(Pagination, {
            propsData: { itemsSize: 32 }
        })
        wrapper = await mergeDeep(wrapper, changeState("pagination", { currentPage: 2 }))
        const pageButtons = wrapper.findAll('.disabled')
        expect(pageButtons).toHaveLength(0);
    })

    it("should disable the next button when is on the last page ", async () => {
        wrapper = createWrapper(Pagination, {
            propsData: { itemsSize: 7 }
        })
        wrapper = await mergeDeep(wrapper, changeState("pagination", { currentPage: 1 }))
        const pageButtons = wrapper.findAll('a')
        expect(pageButtons.at(pageButtons.length - 1).classes().includes('disabled')).toBeTruthy()
    })

    it("shows one pagination button if items are less than given pagine size", async () => {
        wrapper = createWrapper(Pagination, {
            propsData: { itemsSize: 4 }
        })
        wrapper = await mergeDeep(wrapper, changeState("pagination", { currentPage: 0 }))
        const pageButtons = wrapper.findAll('a')
        expect(pageButtons).toHaveLength(3)
    })

    it("shows five pagination buttons if are a lot of items", async () => {
        wrapper = createWrapper(Pagination, {
            propsData: { itemsSize: 15000 }
        })
        wrapper = await mergeDeep(wrapper, changeState("pagination", { currentPage: 5 }))
        const pageButtons = wrapper.findAll('a')
        expect(pageButtons).toHaveLength(5)
    })

    it("should change button to active when going to next page", async () => {
        wrapper = createWrapper(Pagination, {
            propsData: { itemsSize: 25 }
        })
        wrapper = await mergeDeep(wrapper, changeState("pagination", { currentPage: 0 }))

        const button = wrapper.findAll('a')
        expect(button.at(1).classes().includes('active')).toBeTruthy()
        await button.at(button.length - 1).trigger('click')
        expect(button.at(1).classes().includes('active')).toBeFalsy()
        expect(button.at(2).classes().includes('active')).toBeTruthy()
    });
});