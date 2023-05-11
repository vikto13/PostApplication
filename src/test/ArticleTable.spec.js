import { createLocalVue, mount, shallowMount } from "@vue/test-utils";
import ArticleTable from "../components/ArticleTable.vue"
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('ArticleTable.vue', () => {
    // let state
    // let getters
    // let actions
    // let store
    // let mutations


    // beforeEach(() => {
    //     const articleList = [
    //         { id: 1, title: 'Article1', author: 1 },
    //         { id: 2, title: 'Article2', author: 2 },
    //     ]
    //     const authorList = [
    //         { id: 1, name: 'Tester1' },
    //         { id: 2, name: 'Tester2' },
    //     ]
    //     const pagination = { currentPage: 1, pageSlice: 4 }

    //     state = {
    //         articleList,
    //         authorList,
    //         pagination,
    //         showArticles: []
    //     }
    //     getters = {
    //         articleList: state => state.articleList,
    //         showArticles: state => state.showArticles,
    //         authorList: state => state.articleList,
    //         pagination: state => state.pagination,
    //     }
    //     mutations = {
    //         join: (state) => {
    //             console.log("joiing")
    //             // state.showArticles = state.articleList.map((article) => ({
    //             //     ...article,
    //             //     author: state.authorsList.find(
    //             //         ({ id }) => id == article.author
    //             //     ),
    //             // }))
    //         }
    //     }
    //     actions = {
    //         fetchArticles: () => {
    //             console.log("doing this")
    //         },
    //         fetchAuthors: () => null,
    //         // showMessage: jest.fn(),
    //         // deleteArticle: jest.fn(),
    //         // getArticle: jest.fn(),
    //         joinArticles: ({ emmit }) => {

    //             emmit('join')
    //         }
    //         // searchArticles: jest.fn(),
    //     }
    //     store = new Vuex.Store({
    //         getters,
    //         actions,
    //         state,
    //     })

    // })


    // it('displays articles', async () => {
    //     // expect(wrapper.findAll('.card-body .card').length).toBe(2)
    //     // console.log(wrapper.findAll('.card-body .card').length)
    //     const wrapper = shallowMount(ArticleTable, {
    //         store,
    //         localVue
    //     });

    //     console.log(wrapper.findAll("card").length)
    // })

    it('displays "No articles found" when no articles match the search', async () => {
        // await wrapper.setData({ searchText: 'Article 3' })
        // expect(wrapper.find('h1').text()).toBe('No articles found')
    })

    // it('searches for articles when the search text is updated', async () => {
    //     const searchInput = wrapper.find('input[type="search"]')
    //     await searchInput.setValue('Article 1')
    //     expect(wrapper.findAll('.card-body .card').length).toBe(1)
    // })

    // add more tests as needed
})