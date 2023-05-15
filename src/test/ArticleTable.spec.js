import ArticleTable from "../components/ArticleTable.vue"
import Vue from "vue";
import createWrapper, { mergeDeep } from "./mockFacktory";
import { changeState } from "./addValues";
import { describe, it, expect, vi } from "vitest";


describe('ArticleTable.vue', () => {
    Vue.directive('debounce', {
        bind: vi.fn()
    })
    const articles = [
        {
            id: 1, title: 'Article1', author: { id: 1, name: 'Tester1' }, created_at: "2023-05-12T06:01:42.183Z",
            updated_at: null,
        },
        {
            id: 2, title: 'Article2', author: { id: 2, name: 'Tester2' }, created_at: "2023-05-12T06:02:11.943Z",
            updated_at: "2023-05-14T06:02:11.943Z",
        },
    ]
    let wrapper = createWrapper(ArticleTable)

    it('should display notification if data of articles is empty', async () => {
        wrapper = await mergeDeep(wrapper, changeState("articleList", []))
        expect(wrapper.find('h1').text()).toContain('There are no created article')
    })

    it('should display notification if not find the articles ', async () => {
        wrapper = await mergeDeep(wrapper, changeState("articleList", articles))
        expect(wrapper.find('h1').text()).toContain('No articles found')
    })

    it('should display the articles', async () => {
        wrapper = await mergeDeep(wrapper, changeState("showArticles", articles))
        expect(wrapper.findAll("card-stub").length).toEqual(2)
    })

})