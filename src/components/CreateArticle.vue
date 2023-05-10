<template>
    <div class="container">
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
        </div>
        <button
            type="button"
            class="btn btn-primary"
            style="margin: 2% 0 2% 0; width: 8rem"
            @click.prevent="buttonPressed"
        >
            Save
        </button>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { DateMixin } from '../views/mixins/Date'
import Styles from '../assets/Styles'
import { MessageMixin } from '../views/mixins/Message'
export default {
    mixins: [DateMixin, MessageMixin],
    data() {
        return {
            submit: false,
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
        changeValue(whoUpdate, { target }) {
            this.$store.commit(whoUpdate, target.value)
        },
        async buttonPressed() {
            let { author, body, title } = this.article
            if (!title || typeof author != 'number' || !body) {
                this.alertTrigger(
                    Styles.danger,
                    'Write text in all fields',
                    false
                )
                this.submit = true
                return
            }
            try {
                await this.saveArticle()
                // this.submit = false
                // await this.fetchArticles()
                // this.joinArticles()
            } catch {
                this.alertTrigger(
                    Styles.danger,
                    'Something went wrong, try again',
                    true
                )
            }
        },
    },
}
</script>
