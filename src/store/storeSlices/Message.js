import Styles from "../../assets/Styles";
import { MessageState } from "../InitializeState/MessageState";
export default {
    state: {
        ...MessageState(),
        boxMessage: false,
        messageStyle: {
            1: {
                text: "Something went wrong, try again",
                type: Styles.danger
            },
            2: {
                text: "Please write text in all fields",
                type: Styles.danger
            },
            3: {
                text: "Are you sure you want delete this article?",
                type: Styles.danger
            },
            4: {
                text: "Successfully, your article is saved",
                type: Styles.success
            },
            5: {
                text: "Successfully, you edited this article",
                type: Styles.success
            },
            6: {
                text: "Successfully, you deleted this article",
                type: Styles.success
            },

        }
    },
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
        },
        setBoxMessage: (state, what) => {
            state.boxMessage = what
        },
        disableMessage: (state) => {
            state.boxMessage = false
            state.show = false
        }
    },
    actions: {
        showMessage({ commit }, setData) {
            commit("setToShowMessage", setData)
        },
        pressMessageButton({ commit }) {
            commit("messageIsPressed")
        },
        showBoxMessage({ commit }, who) {
            commit("setBoxMessage", who)
        },
        clearMessage({ commit }) {
            commit("disableMessage")
        }
    },
    getters: {
        message: state => ({ ...state }),
        boxMessage: state => {
            return state.boxMessage ? state.messageStyle[state.boxMessage] : false
        }
    },
}
