import { AlertState } from "../../store/InitializeState/AlertState"
import { MessageState } from "../../store/InitializeState/MessageState"
import { mapActions } from "vuex"
export const MessageMixin = {
    methods: {
        ...mapActions([
            'showMessage',
            'showAlert'
        ]),
        messageTrigger() {
            let { messageType, bodyText, buttons, titleText } = this.message
            this.showMessage(
                MessageState(
                    messageType, titleText, bodyText, buttons
                )
            )
        },
        alertTrigger(alertType, text, setTimer) {
            this.showAlert(
                AlertState(
                    alertType,
                    text,
                    setTimer,
                )
            )
        }
    },
}