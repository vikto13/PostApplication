<template>
    <div v-if="articleList.length">
        <message @button-pressed="messagePressed"></message>
        <div class="card text-bg-light">
            <div class="card-header">
                <ul class="nav nav-pills card-header-pills">
                    <li class="nav-item">
                        <a class="nav-link active navbar-light" href="#"
                            >All articles</a
                        >
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Create</a>
                    </li>
                </ul>
            </div>

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
                                article.body,
                                article.title,
                            ]"
                            :size="
                                pagination.currentPage * pagination.pageSlice +
                                index +
                                1
                            "
                            @pressed="cardButton"
                        ></card>
                    </div>
                    <pagination :items-size="showArticles.length"> </pagination>
                </div>
                <h1 v-else>No articles found</h1>

                <!-- <div
                    v-for="article in articlePart"
                    :key="article.id"
                    class="card"
                >
                    <div class="card-body">
                        <div class="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
                            <div class="col">
                                <div class="p-3">Row column</div>
                            </div>
                        </div>
                    </div>
                </div> -->
            </div>
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
            console.log(currentPage, pageSlice)
            console.log(length)
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
