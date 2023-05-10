import { AlertState } from "../InitializeState/AlertState";
export default {
    state: AlertState(),
    mutations: {
        setToShowAlert: (state, info) => {
            state.show = !state.show
            state.setTimer = info.setTimer;
            state.text = info.text;
            state.alertType = info.alertType
        },
        alertAction: (state, willShow) => {
            console.log(willShow)
            state.show = willShow
        }
    },
    actions: {
        showAlert({ commit }, setData) {
            commit("setToShowAlert", setData)
        },
        alertAction({ commit }, willShow) {
            commit("alertAction", willShow)
        }
    },
    getters: {
        alert: state => ({ ...state }),
    },
}
