import { PaginationState } from "../InitializeState/PaginationState";
export default {
    state: PaginationState,
    mutations: {
        changePage: (state, toNext) => {
            state.currentPage = typeof toNext == 'boolean' ? toNext ? state.currentPage + 1 : state.currentPage - 1 : toNext
        },
        decreasePage: (state) => {
            state.currentPage = state.currentPage - 1
        }
    },
    actions: {
        toNextPage({ commit }, isNext) {
            commit("changePage", isNext)
        },
    },
    getters: {
        pagination: state => ({ ...state }),
    },
}
