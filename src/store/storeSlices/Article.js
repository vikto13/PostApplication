import axios from 'axios';
import { ArticleState } from '../InitializeState/ArticleState';
export default {
    state: ArticleState,
    mutations: {
        setArticles: (state, articles) => {
            state.articles = articles
        },
        setArticle: (state, data) => {
            state.article = data
        },
        setShowArticles: (state, show) => {
            state.showArticles = show
        },
        dismissArticle: (state) => {
            state.article = {
                author: null,
                body: '',
                create: false,
                created_at: null,
                updated_at: null,
                id: null,
                title: '',
            }
            state.create = null;
        },
        createArticle: (state, whatDo) => {
            state.create = whatDo
        },
        generateDate: (state) => {
            if (state.article.created_at) {
                state.article.updated_at = new Date().toISOString();
            }
            else {
                state.article.created_at = new Date().toISOString();
            }
        },
        setTitle: (state, title) => {
            state.article.title = title
        },
        setAuthor: (state, author) => {
            state.article.author = Number(author)
            console.log(state)
        },
        setBody: (state, body) => {
            state.article.body = body
        },

    },
    actions: {
        async fetchArticles({ commit }) {
            const { data } = await axios.get(`${import.meta.env.VITE_DB_URL}/articles`)
            commit("setArticles", data)
        },
        async getArticle({ commit }, id) {
            const { data } = await axios.get(`${import.meta.env.VITE_DB_URL}/articles/${id}`)
            commit("setArticle", data)
        },
        clearArticle({ commit }) {
            commit("dismissArticle")
        },
        async saveArticle({ state, commit }) {
            commit("generateDate")
            let { title, body, author, created_at, updated_at } = state.article;
            const newArticle = { title, body, author, created_at, updated_at };
            await axios.post(`${import.meta.env.VITE_DB_URL}/articles`, newArticle)

        },
        async deleteArticle({ state, commit }) {
            const { id } = state.article;
            await axios.delete(`${import.meta.env.VITE_DB_URL}/articles/${id}`)
        },
        async updateArticle({ state, commit }) {
            commit("generateDate")
            let { title, body, author, id, created_at, updated_at } = state.article;
            const updateArticle = { title, body, author, created_at, updated_at };
            await axios.put(`${import.meta.env.VITE_DB_URL}/articles/${id}`, updateArticle)
        },
        async searchArticles({ commit, getters }, text) {
            let { data: title } = await axios.get(`${import.meta.env.VITE_DB_URL}/articles?title_like=${text}`)
            let { data: body } = await axios.get(`${import.meta.env.VITE_DB_URL}/articles?body_like=${text}`)
            let concatulate = title.concat(body.filter(item2 => !title.some(item1 => item1.id === item2.id)));
            commit('setShowArticles', joinTables(concatulate, getters.authorsList))
        },
        joinArticles({ commit, getters }) {
            commit('setShowArticles', joinTables(getters.articleList, getters.authorsList))
        }
    },
    getters: {
        articleList: state => state.articles,
        article: state => ({ ...state.article, create: state.create }),
        showArticles: state => state.showArticles
    },
}
function joinTables(articleList, authorsList) {
    return articleList.map((article) => ({
        ...article,
        author: authorsList.find(
            ({ id }) => id == article.author
        ),
    }));
}