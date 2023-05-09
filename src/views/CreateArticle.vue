<template>
    <div
        v-show="article.create != null"
        class="modal"
        style="display: block; background-color: rgb(1, 0, 0, 0.45)"
    >
        <div class="modal-dialog" style="max-width: 50%">
            <div class="modal-content">
                <div
                    class="modal-header text-white d-flex flex-dirextion-row"
                    :class="submit ? `bg-${alert[submit].type}` : null"
                    @click="exit"
                >
                    <div v-if="submit" style="flex: 1">
                        {{ alert[submit].text }}
                    </div>
                    <button type="button" class="btn-close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-sm">
                            <label>Title</label>
                            <input
                                type="text"
                                class="form-control"
                                :class="isNotValid(!article.title)"
                                placeholder="Title"
                                v-model="article.title"
                                @input="(data) => changeValue('setTitle', data)"
                                maxlength="15"
                            />
                        </div>

                        <div class="col-sm">
                            <label>{{ text[Number(article.create)] }}</label>
                            <select
                                class="form-control"
                                v-model="article.author"
                                @input="
                                    (data) => changeValue('setAuthor', data)
                                "
                                :class="
                                    isNotValid(
                                        typeof article.author != 'number'
                                    )
                                "
                                :disabled="!article.create"
                            >
                                <option
                                    v-for="author in authorsList"
                                    :key="author.id"
                                    :value="author.id"
                                >
                                    {{ author.name }}
                                </option>
                            </select>
                        </div>

                        <div class="form-group" style="padding-top: 2%">
                            <label>Article content</label>
                            <textarea
                                class="form-control"
                                :class="isNotValid(!article.body)"
                                @input="(data) => changeValue('setBody', data)"
                                rows="3"
                                v-model="article.body"
                            ></textarea>
                        </div>

                        <div
                            v-show="!article.create"
                            class="col-sm"
                            style="padding-top: 2%"
                        >
                            <label>Created date</label>
                            <input
                                type="text"
                                disabled
                                class="form-control"
                                :placeholder="getDate(article)"
                            />
                        </div>
                    </div>
                </div>
                <div class="modal-footer f-flex justify-content-center">
                    <button
                        v-for="(button, index) in buttons[
                            Number(article.create)
                        ]"
                        :key="index"
                        type="button"
                        class="btn article-button"
                        style="width: 10rem"
                        :class="index ? `btn-${type}` : `btn-outline-${type}`"
                        @click="buttonPressed(index)"
                    >
                        {{ button }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Message from '../components/Message.vue'
import Alert from '../components/Alert.vue'
import { DateMixin } from './mixins/Date'
import Styles from '../assets/Styles'

export default {
    components: {
        Message,
        Alert,
    },
    mixins: [DateMixin],
    data() {
        return {
            submit: false,
            alert: {
                1: {
                    text: 'Please enter text in all fields',
                    type: Styles.danger,
                },
                2: {
                    text: 'Something went wrong, try again',
                    type: Styles.danger,
                },
                3: {
                    text: 'Successful! Everything is saved',
                    type: Styles.success,
                },
            },
            buttons: { 0: ['Delete', 'Edit'], 1: ['Create'] },
            text: { 0: 'Author', 1: 'Choose author' },
            type: Styles.primary,
        }
    },
    computed: {
        ...mapGetters(['articleList', 'authorsList', 'article']),
    },
    methods: {
        ...mapActions([
            'fetchArticles',
            'fetchAuthors',
            'clearArticle',
            'saveArticle',
            'deleteArticle',
            'updateArticle',
            'joinArticles',
        ]),
        isNotValid(check) {
            return this.submit && check ? `is-invalid` : null
        },
        exit() {
            this.clearArticle()
            this.submit = false
        },
        changeValue(whoUpdate, { target }) {
            this.$store.commit(whoUpdate, target.value)
        },
        async buttonPressed(index) {
            let { author, body, title } = this.article
            if (!title || typeof author != 'number' || !body) {
                this.submit = 1
                return
            }
            try {
                if (this.article.create) {
                    await this.saveArticle()
                } else {
                    index
                        ? await this.updateArticle()
                        : await this.deleteArticle()
                }
                this.submit = false
                await this.fetchArticles()
                this.joinArticles()
            } catch {
                this.submit = 2
            }
        },
    },
}
</script>
