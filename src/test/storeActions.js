import vuex from 'vuex'
import Vue from "vue"

Vue.use(vuex);

export default new vuex.Store({
    state: () => ({
        boxMessage: false,
        article: { title: 'Test', id: 0 },
        authorsList: [
            { id: 0, name: 'Test' }
        ],
        articleList: [],
        showArticles: [],
        message: {
            messageType: 'danger',
            titleText: 'Test',
            bodyText: 'Test1',
            buttons: ['Testing'],
            show: true,
        },
        alert: {
            show: null,
            alertType: 'danger',
            text: 'Test1',
            setTimer: false
        },
        pagination: {
            currentPage: 0,
            pageSlice: 4,
        }
    }),
    getters: {
        article: (state) => state.article,
        boxMessage: (state) => state.boxMessage,
        authorsList: (state) => state.authorsList,
        message: (state) => state.message,
        alert: (state) => state.alert,
        articleList: (state) => state.articleList,
        showArticles: (state) => state.showArticles,
        pagination: (state) => state.pagination
    },
    actions: {
        clearArticle: () => vi.fn(),
        clearMessage: () => vi.fn(),
        joinArticles: () => vi.fn(),
        fetchArticles: () => vi.fn(),
        getArticle: () => vi.fn(),
        deleteArticle: () => vi.fn(),
        fetchAuthors: () => vi.fn(),
        pressMessageButton: ({ commit }) => {
            commit('changeMessage')
        },
        alertAction: ({ commit }, action) => {
            commit('changeAlert', action)
        },
        toNextPage: ({ commit }) => {
            commit("nextPagination")
        }

    },
    mutations: {
        decreasePage: () => vi.fn(),
        changeBoxMessage: (state, message) => {
            state.boxMessage = message
        },
        changeMessage: (state) => {
            state.message.show = !state.message.show
        },
        changeAlert: (state, action) => {
            state.alert.show = typeof action == 'boolean' ? action : null
        },
        nextPagination: (state) => {
            state.pagination.currentPage = state.pagination.currentPage + 1
        }
    }
})