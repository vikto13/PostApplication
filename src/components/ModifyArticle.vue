<template>
    <div v-show="show">
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
                        @input="(data) => changeValue('setAuthor', data)"
                        :class="isNotValid(typeof article.author != 'number')"
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

                <div v-show="article.id" class="col-sm" style="padding-top: 2%">
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
                v-for="(button, index) in buttons[Number(!article.id)]"
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
import Message from './Message.vue'
import Alert from './Alert.vue'
import Styles from '../assets/Styles'
import { DateMixin } from '../views/mixins/Date'
import { MessageMixin } from '../views/mixins/Message'

export default {
    components: {
        Message,
        Alert,
    },
    mixins: [DateMixin, MessageMixin],
    data() {
        return {
            buttons: { 1: ['Create'], 0: ['Delete', 'Edit'] },
            text: { 0: 'Author', 1: 'Choose author' },
            type: Styles.primary,
            show: true,
            delete: false,
        }
    },
    computed: {
        ...mapGetters([
            'articleList',
            'authorsList',
            'article',
            'message',
            'boxMessage',
        ]),
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
            'clearMessage',
            'showBoxMessage',
        ]),
        isNotValid(check) {
            return this.boxMessage && check ? `is-invalid` : null
        },
        changeValue(whoUpdate, { target }) {
            this.$store.commit(whoUpdate, target.value)
        },
        async buttonPressed(index) {
            console.log(this.article)
            let { author, body, title } = this.article
            if (!title || typeof author != 'number' || !body) {
                this.article.create
                    ? this.alertTrigger(
                          Styles.danger,
                          'Write text in all fields',
                          false
                      )
                    : this.showBoxMessage(1)
                return
            }
            try {
                if (this.article.create) {
                    await this.saveArticle()
                    this.alertTrigger(
                        Styles.success,
                        'Successfully, your article is saved',
                        false
                    )
                    this.show = false
                } else {
                    if (index) {
                        await this.updateArticle()
                        this.showBoxMessage(4)
                    } else if (!this.delete) {
                        this.delete = true
                        this.showBoxMessage(2)
                    } else {
                        await this.deleteArticle()
                        this.show = false
                        this.showBoxMessage(5)
                    }
                }
            } catch {
                this.showBoxMessage(2)
            }
        },
    },
}
</script>
