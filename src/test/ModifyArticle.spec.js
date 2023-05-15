import ModifyArticle from "../components/ModifyArticle.vue"
import { describe, it, expect, test } from "vitest";
import createWrapper, { mergeDeep } from "./mockFacktory";
import { changeState } from "./addValues";


describe('ModifyArticle.vue', () => {
    let wrapper = createWrapper(ModifyArticle,
        {
            propsData: {
                buttons: {
                    1: ['Create'],
                    0: ['Delete', 'Edit'],
                    2: ['Delete', 'Cancel'],
                },
                text: { 0: 'Author', 1: 'Choose author' },
                type: 'primary',
                show: true,
                deleteIt: false,

            }
        })

    it('should display the correct buttons for edit form if article id is 0', async () => {
        wrapper = await mergeDeep(wrapper, changeState("article", { id: 1 }))
        const buttons = wrapper.findAll('button')
        expect(buttons.at(0).text()).toContain('Delete')
        expect(buttons.at(1).text()).toContain("Edit")
    })

    it('should display the correct buttons for edit form if article id is 1', async () => {
        wrapper = await mergeDeep(wrapper, changeState("article", { id: 0 }))
        const buttons = wrapper.findAll('button')
        expect(buttons.at(0).text()).toContain('Delete')
        expect(buttons.at(1).text()).toContain("Edit")
    })

    it('should display the correct text for edit form', async () => {
        wrapper = await mergeDeep(wrapper, changeState("article", { id: 1 }))
        const texts = wrapper.findAll('label')
        expect(texts.at(0).text()).toContain('Title')
        expect(texts.at(1).text()).toContain('Author')
        expect(texts.at(2).text()).toContain('Article content')
        expect(texts.at(3).isVisible()).toBeTruthy()
    })

    it('should display the correct text for create form', async () => {
        wrapper = await mergeDeep(wrapper, changeState("article", { id: null }))
        const texts = wrapper.findAll('label')
        expect(texts.at(0).text()).toContain('Title')
        expect(texts.at(1).text()).toContain('Choose author')
        expect(texts.at(2).text()).toContain('Article content')
        expect(texts.at(3).isVisible()).toBeFalsy()
    })

    it('should display the correct buttons for create form', async () => {
        wrapper = await mergeDeep(wrapper, changeState("article", { id: null }))
        const buttons = wrapper.findAll('button')
        expect(buttons.at(0).text()).toContain('Create')
        expect(buttons.length).equal(1)
    })
})