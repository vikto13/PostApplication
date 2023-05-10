<template>
    <div
        class="modal"
        style="display: block; background-color: rgb(1, 0, 0, 0.8)"
    >
        <div class="modal-dialog" style="max-width: 50%">
            <div class="modal-content">
                <div
                    class="modal-header text-white d-flex flex-dirextion-row"
                    :class="boxMessage ? `bg-${boxMessage.type}` : null"
                    @click="exit"
                >
                    <div v-if="boxMessage" style="flex: 1">
                        {{ boxMessage.text }}
                    </div>
                    <button type="button" class="btn-close"></button>
                </div>
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    computed: {
        ...mapGetters(['boxMessage', 'article']),
    },
    methods: {
        ...mapActions([
            'clearArticle',
            'clearMessage',
            'joinArticles',
            'fetchArticles',
        ]),
        async exit() {
            try {
                this.clearMessage()
                this.clearArticle()
                await this.fetchArticles()
                this.joinArticles()
            } catch {
                console.log('some')
            }
        },
    },
}
</script>
