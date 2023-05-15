<template>
    <div v-show="show">
        <div v-show="!deleteIt" class="modal-body">
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
                    <label>{{
                        text[Number(typeof article.id == 'number')]
                    }}</label>
                    <select
                        class="form-control"
                        v-model="article.author"
                        @input="(data) => changeValue('setAuthor', data)"
                        :class="isNotValid(article.author == null)"
                        :disabled="article.id"
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
                    v-show="article.id != null"
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
                    deleteIt ? 2 : Number(typeof article.id == 'number')
                ]"
                :key="index"
                type="button"
                class="btn article-button"
                style="width: 10rem; margin: 2%"
                :class="index ? `btn-${type}` : `btn-outline-${type}`"
                @click="buttonPressed(index)"
            >
                {{ button }}
            </button>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Styles from '../assets/Styles'
import { DateMixin } from '../views/mixins/Date'
import { MessageMixin } from '../views/mixins/Message'

export default {
    mixins: [DateMixin, MessageMixin],
    data() {
        return {
            buttons: {
                0: ['Create'],
                1: ['Delete', 'Edit'],
                2: ['Delete', 'Cancel'],
            },
            text: { 0: 'Choose author', 1: 'Author' },
            type: Styles.primary,
            show: true,
            deleteIt: false,
        }
    },
    computed: {
        ...mapGetters(['authorsList', 'article', 'message', 'boxMessage']),
    },
    methods: {
        ...mapActions([
            'saveArticle',
            'deleteArticle',
            'updateArticle',
            'showBoxMessage',
            'clearMessage',
            'clearArticle',
            'fetchArticles',
            'joinArticles',
        ]),
        isNotValid(check) {
            return this.boxMessage && check ? `is-invalid` : null
        },
        changeValue(whoUpdate, { target }) {
            this.$store.commit(whoUpdate, target.value)
        },
        async buttonPressed(index) {
            let { author, body, title } = this.article
            if (!title || typeof author != 'number' || !body) {
                this.article.id != null
                    ? this.alertTrigger(
                          Styles.danger,
                          'Write text in all fields',
                          false
                      )
                    : this.showBoxMessage(5)
                return
            }
            try {
                if (this.article.id == null) {
                    await this.saveArticle()
                    this.alertTrigger(
                        Styles.success,
                        'Successfully, your article is saved',
                        false
                    )
                    this.show = false
                } else {
                    if (index && !this.deleteIt) {
                        await this.updateArticle()
                        this.showBoxMessage(4)
                    } else if (!this.deleteIt) {
                        this.deleteIt = true
                        this.showBoxMessage(3)
                    } else {
                        if (index) {
                            this.deleteIt = false
                            this.showBoxMessage(0)
                        } else {
                            await this.deleteArticle()
                            this.clearMessage()
                            this.clearArticle()
                            await this.fetchArticles()
                            this.joinArticles()
                        }
                    }
                }
            } catch {
                this.article.id == null
                    ? this.alertTrigger(
                          Styles.danger,
                          'Something went wrong, try again',
                          false
                      )
                    : this.showBoxMessage(1)
            }
        },
    },
}
</script>
