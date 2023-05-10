<template>
    <div
        v-show="message.show"
        class="modal"
        style="display: block; background-color: rgb(1, 0, 0, 0.45)"
    >
        <div class="modal-dialog">
            <div class="modal-content">
                <div
                    class="modal-header text-white d-flex justify-content-center"
                    :class="`bg-${message.messageType}`"
                >
                    <h5 class="modal-title">{{ message.titleText }}</h5>
                </div>
                <div class="modal-body">
                    <i
                        class="fas fa-times fa-3x"
                        :class="`text-${message.messageType}`"
                        >{{ message.bodyText }}</i
                    >
                </div>
                <div class="modal-footer f-flex justify-content-center">
                    <button
                        v-for="(button, index) in message.buttons"
                        :key="index"
                        type="button"
                        class="btn"
                        :class="
                            index
                                ? `btn-${message.messageType}`
                                : `btn-outline-${message.messageType}`
                        "
                        style="width: 20%"
                        @click="buttonIsPressed(index)"
                    >
                        {{ button }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters(['message']),
    },
    methods: {
        ...mapActions(['pressButton']),
        buttonIsPressed(index) {
            this.pressButton()
            this.$emit('button-pressed', index)
        },
    },
}
</script>
