import axios from 'axios';
export default {
    state: {
        authors: [],
        author: {
            name: '',
            id: null,
            created_at: null,
            updated_at: null
        }
    },
    mutations: {
        setAuthors: (state, authors) => {
            state.authors = authors
        },
        setAuthor: (state, author) => {
            state.author = author
        },
    },
    actions: {
        async fetchAuthors({ commit }) {
            const { data } = await axios.get(`${import.meta.env.VITE_DB_URL}/authors`);
            console.log(data)
            commit("setAuthors", data)
        },
        async fetchAuthor({ commit }, id) {
            const { data } = await axios.get(`${import.meta.env.VITE_DB_URL}/authors/${id}`);
            commit("setAuthor", data)
        }
    },
    getters: {
        authorsList: state => state.authors,
        author: state => state.author
    }
}