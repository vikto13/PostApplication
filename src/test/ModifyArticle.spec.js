import { shallowMount } from "@vue/test-utils";
import ModifyArticle from "../components/ModifyArticle.vue"
import { describe, it, expect } from "vitest";
import Vuex from 'vuex'
import Vue from "vue";

describe('ModifyArticle.vue', () => {
    let wrapper;
    let state;
    let getters;
    let store;
    let data;

    Vue.use(Vuex)
    beforeEach(() => {
        state = {
            article: {
                id: 1,
                title: 'Test',
                body: 'Test1',
                author: 1,
                created_at: '2022-02-23',
                updated_at: null,
            }
        }
        getters = {
            article: (state) => state.article,
            authorsList: () => [
                { id: 1, name: "Test1" },
                { id: 2, name: "Test2" },
                { id: 0, name: "Test" }
            ],
            message: () => null,
            boxMessage: () => null,
        }
        data = {
            data: () => {
                return {
                    buttons: { 1: ['Create'], 0: ['Delete', 'Edit'] },
                    text: { 0: 'Author', 1: 'Choose author' },
                    type: Styles.primary,
                    show: true,
                    delete: false,
                }
            }
        }
    })
    it('should display the correct buttons for edit form', () => {
        store = new Vuex.Store({
            state,
            getters,
        })

        wrapper = shallowMount(ModifyArticle, {
            propsData: data,
            store,
        })

        const buttons = wrapper.findAll('button')
        expect(buttons.at(0).text()).toContain('Delete')
        expect(buttons.at(1).text()).toContain("Edit")
    })
    it('should display the correct text for edit form', () => {
        store = new Vuex.Store({
            state,
            getters,
        })

        wrapper = shallowMount(ModifyArticle, {
            propsData: data,
            store,
        })
        const texts = wrapper.findAll('label')
        expect(texts.at(0).text()).toContain('Title')
        expect(texts.at(1).text()).toContain('Author')
        expect(texts.at(2).text()).toContain('Article content')
        expect(texts.at(3).text()).toContain('Created date')
        expect(texts.length).equal(4)

    })
    it('should display the correct buttons for edit form', () => {
        store = new Vuex.Store({
            state,
            getters,
        })

        wrapper = shallowMount(ModifyArticle, {
            propsData: data,
            store,
        })
        const buttons = wrapper.findAll('button')
        expect(buttons.at(0).text()).toContain('Delete')
        expect(buttons.at(1).text()).toContain("Edit")
    })
    it('should display the correct text for create form', () => {
        store = new Vuex.Store({
            state: {
                article: {
                    id: null,
                    title: '',
                    body: '',
                    author: null,
                    created_at: null,
                    updated_at: null,
                }
            },
            getters,
        })
        wrapper = shallowMount(ModifyArticle, {
            propsData: data,
            store,
        })
        const texts = wrapper.findAll('label')
        expect(texts.at(0).text()).toContain('Title')
        expect(texts.at(1).text()).toContain('Choose author')
        expect(texts.at(2).text()).toContain('Article content')
        expect(texts.at(3).isVisible()).toBeFalsy()

    })
})