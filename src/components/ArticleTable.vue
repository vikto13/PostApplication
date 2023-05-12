<template>
    <div v-if="articleList.length">
        <message @button-pressed="messagePressed"></message>

        <div class="card-body">
            <div class="form-outline mb-4">
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
                        :id="article.id"
                        :texts="[
                            `Author: ${article.author.name}`,
                            getDate(article),
                            article.title,
                        ]"
                        :size="
                            pagination.currentPage * pagination.pageSlice +
                            index +
                            1
                        "
                        @pressed="cardButton"
                        @pressedHeader="(id) => $router.push(`/article/${id}`)"
                    ></card>
                </div>
                <pagination :items-size="showArticles.length"> </pagination>
            </div>
            <h1 v-else>No articles found</h1>
        </div>
    </div>
    <h1 v-else>There are no created article</h1>
</template>

<script>
import Pagination from './Pagination.vue'
import { MessageMixin } from '../views/mixins/Message'
import { mapGetters, mapActions } from 'vuex'
import { DateMixin } from '../views/mixins/Date'
import Card from './Card.vue'
import Styles from '../assets/Styles'

export default {
    components: {
        Pagination,
        message: () => import('./Message.vue'),
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
        }
    },
    computed: {
        ...mapGetters(['articleList', 'pagination', 'showArticles']),
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
            this.alertTrigger(
                Styles.danger,
                'Something went wrong, try again',
                true
            )
        }
    },
    methods: {
        ...mapActions([
            'fetchArticles',
            'fetchAuthors',
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
                    this.alertTrigger(
                        Styles.danger,
                        'something went wrong, try again',
                        true
                    )
                }
            }
        },
        async findArticle(id) {
            try {
                await this.getArticle(id)
                this.$store.commit('createArticle', false)
            } catch {
                this.alertTrigger(
                    Styles.danger,
                    'something went wrong, try again',
                    true
                )
            }
        },
        cardButton({ target, id }) {
            if (target) {
                this.articleId = id
                this.messageTrigger()
            } else {
                this.findArticle(id)
            }
        },
    },
}
</script>
