import { MessageState } from "../InitializeState/MessageState";

export default {
    state: MessageState(),
    mutations: {
        setToShowMessage: (state, info) => {
            state.show = true
            state.titleText = info.titleText;
            state.bodyText = info.bodyText;
            state.buttons = info.buttons;
            state.messageType = info.messageType
        },
        messageIsPressed: (state) => {
            state.show = false
        }
    },
    actions: {
        showMessage({ commit }, setData) {
            commit("setToShowMessage", setData)
        },
        pressButton({ commit }) {
            commit("messageIsPressed")
        }
    },
    getters: {
        message: state => ({ ...state }),
    },
}
