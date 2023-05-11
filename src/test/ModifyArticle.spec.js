import { shallowMount } from '@vue/test-utils'
import ModifyArticle from "../components/ModifyArticle.vue"

describe('ModifyArticle.vue', () => {

    //   beforeEach(() => {
    //     wrapper = shallowMount(ArticleForm)
    //   })

    //   afterEach(() => {
    //     wrapper.destroy()
    //   })

    it('should render title input', () => {
        // const titleInput = wrapper.find('input[type="text"]')
        // expect(titleInput.exists()).toBe(true)
    })

    //   it('should render author select', () => {
    //     const authorSelect = wrapper.find('select')
    //     expect(authorSelect.exists()).toBe(true)
    //   })

    //   it('should render article content textarea', () => {
    //     const contentTextarea = wrapper.find('textarea')
    //     expect(contentTextarea.exists()).toBe(true)
    //   })

    //   it('should not submit article if any field is missing', async () => {
    //     wrapper.vm.article.title = ''
    //     await wrapper.vm.buttonPressed(0)
    //     expect(wrapper.vm.show).toBe(true)
    //   })

    //   it('should submit article if all fields are filled', async () => {
    //     wrapper.vm.article.title = 'Test title'
    //     wrapper.vm.article.author = 1
    //     wrapper.vm.article.body = 'Test body'
    //     await wrapper.vm.buttonPressed(0)
    //     expect(wrapper.vm.show).toBe(false)
    //   })
})