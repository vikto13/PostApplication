import axios from 'axios';
export default {
    state: {
        authors: [],
    },
    mutations: {
        setAuthors: (state, authors) => {
            state.authors = authors
        },
    },
    actions: {
        async fetchAuthors({ commit }) {
            const { data } = await axios.get(`${import.meta.env.VITE_DB_URL}/authors`);
            commit("setAuthors", data)
        }
    },
    getters: {
        authorsList: state => state.authors
    }
}