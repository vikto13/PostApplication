import { createLocalVue, mount, shallowMount } from "@vue/test-utils";
import ArticleTable from "../components/ArticleTable.vue"
import Vuex from 'vuex'
import Vue from "vue";

const localVue = createLocalVue()
localVue.use(Vuex)

describe('ArticleTable.vue', () => {
    Vue.use(Vuex)
    let state;
    let getters;
    let actions;
    let store;
    let mutations;
    let wrapper;
    const articleList = [
        { id: 1, title: 'Article1', author: 1 },
        { id: 2, title: 'Article2', author: 2 },
    ]
    const authorList = [
        { id: 1, name: 'Tester1' },
        { id: 2, name: 'Tester2' },
    ]
    const pagination = { currentPage: 1, pageSlice: 4 }
    const data = {
        data() {
            return {
                searchText: '',
                articleId: null,
                message: {
                    messageType: Styles.danger,
                    titleText: 'You want to delete this article',
                    bodyText: 'Are you sure?',
                    buttons: ['No', 'Yes'],
                },
            }
        },
    }
    afterEach(() => {
        wrapper.destroy()
    });
    beforeEach(() => {

        getters = {
            articleList: state => state.articleList,
            authorList: state => state.authorList,
            pagination: state => state.pagination,
            createArticle: () => null,
            showArticles: () => state.showArticles,
            allertTrigger: () => null,
        }
        actions = {
            fetchArticles: () => null,
            fetchAuthors: () => null,
            joinArticles: () => null
        }
    });

    it('displays "There are no created article" when no found articles', async () => {
        state = {
            articleList: [],
            authorList,
            pagination,
            showArticles: []
        }
        store = new Vuex.Store({
            getters,
            actions,
            state,
            mutations
        })

        wrapper = shallowMount(ArticleTable, {
            propsData: data,
            store
        })
        expect(wrapper.find('h1').text()).toBe('There are no created article')
    })
    //shows that failed to resolve directive: debounce
    // it('displays articles ', async () => {
    //     state = {
    //         articleList,
    //         authorList,
    //         pagination,
    //         showArticles: [
    //             {
    //                 id: 1, title: 'Article1', author: { id: 1, name: 'Tester1' }, created_at: "2023-05-12T06:01:42.183Z",
    //                 updated_at: null,
    //             },
    //             {
    //                 id: 2, title: 'Article2', author: { id: 2, name: 'Tester2' }, created_at: "2023-05-12T06:02:11.943Z",
    //                 updated_at: "2023-05-14T06:02:11.943Z",
    //             },
    //         ]
    //     }
    //     store = new Vuex.Store({
    //         getters,
    //         actions,
    //         state,
    //         mutations
    //     })
    //     wrapper = shallowMount(ArticleTable, {
    //         propsData: data,
    //         store
    //     })
    //     console.log(wrapper.findAll('card').length)
    // })
})