<template>
    <div v-if="articleList.length">
        <message @button-pressed="messagePressed"></message>
        <div class="form-outline mb-4" style="margin-top: 5%">
            <input
                type="search"
                class="form-control"
                placeholder="Search"
                v-model="searchText"
                v-debounce:1500="searching"
            />
        </div>

        <div v-if="showArticles.length">
            <h1>All articles</h1>
            <div class="row">
                <card
                    v-for="(article, index) in articlePart"
                    :key="article.id"
                    :header-text="`Author: ${article.author.name}`"
                    :id="article.id"
                    :body-text="article.body"
                    :footer-text="getDate(article)"
                    :buttons="['Delete', 'Edit']"
                    :title="article.title"
                    @pressed="cardButton"
                ></card>
            </div>
            <pagination :items-size="showArticles.length"> </pagination>
        </div>
        <h1 v-else>No articles found</h1>
    </div>
    <h1 v-else>There are no created article</h1>
</template>

<script>
import Pagination from './Pagination.vue'
import { MessageMixin } from '../views/mixins/Message'
import { mapGetters, mapActions } from 'vuex'
import Message from './Message.vue'
import { DateMixin } from '../views/mixins/Date'
import Card from './Card.vue'
import Styles from '../assets/Styles'

export default {
    components: {
        Pagination,
        Message,
        Card,
    },
    mixins: [DateMixin, MessageMixin],
    data() {
        return {
            searchText: '',

            articleId: null,
            message: {
                messageType: Styles.danger,
                titleText: 'You want to delete this article',
                bodyText: 'Are you sure?',
                buttons: ['No', 'Yes'],
            },
            alertInfo: {
                alertType: Styles.danger,
                text: 'something went wrong, try again',
                setTimer: true,
            },
        }
    },
    computed: {
        ...mapGetters([
            'articleList',
            'authorsList',
            'pagination',
            'showArticles',
        ]),
        articlePart() {
            let { currentPage, pageSlice } = this.pagination
            let show = currentPage * pageSlice
            let { length } = this.showArticles
            return this.showArticles.slice(
                show,
                show + pageSlice < length ? show + pageSlice : length
            )
        },
    },
    async created() {
        try {
            await this.fetchArticles()
            await this.fetchAuthors()
            this.joinArticles()
        } catch {
            this.alertInfo.setTimer = false
            this.alertTrigger()
        }
    },
    methods: {
        ...mapActions([
            'fetchArticles',
            'fetchAuthors',
            'showMessage',
            'deleteArticle',
            'getArticle',
            'joinArticles',
            'searchArticles',
        ]),
        async searching() {
            this.searchArticles(this.searchText)
        },
        async messagePressed(index) {
            if (index) {
                try {
                    await this.getArticle(this.articleId)
                    await this.deleteArticle()
                    await this.fetchArticles()
                    this.joinArticles()
                } catch {
                    this.alertTrigger()
                }
            }
        },
        async findArticle(id) {
            try {
                await this.getArticle(id)
                this.$store.commit('createArticle', false)
            } catch {
                this.alertTrigger()
            }
        },
        cardButton({ index, id }) {
            if (index) {
                this.findArticle(id)
            } else {
                this.articleId = id
                this.messageTrigger()
            }
        },
    },
}
</script>
