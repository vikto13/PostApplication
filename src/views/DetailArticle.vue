<template>
    <div>
        <h1 v-if="isLoading"></h1>
        <div v-else class="modal" style="display: block">
            <h1 v-if="!article.id">THE ARTICLE NOT FOUND</h1>
            <div v-else class="container" style="margin-top: 5%">
                <div class="card">
                    <div class="card-header">
                        <button
                            type="button"
                            class="btn-close float-end"
                            @click="$router.push({ path: '/' })"
                        ></button>
                    </div>

                    <div class="card-body">
                        <h2 class="card-title">{{ article.title }}</h2>
                        <p class="card-text">
                            {{ article.body }}
                        </p>
                    </div>

                    <div class="modal-footer">Author: {{ author.name }}</div>
                    <div class="modal-footer">
                        <p>Created: {{ getTime(article.created_at) }}</p>
                        <p>Modified: {{ getTime(article.updated_at) }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Alert from '../components/Alert.vue'
import { DateMixin } from './mixins/Date'
export default {
    components: { Alert },
    mixins: [DateMixin],
    data() {
        return {
            isLoading: true,
        }
    },
    async created() {
        try {
            await this.getArticle(this.$route.params.id)
            await this.fetchAuthor(this.article.author)
            this.isLoading = false
        } catch {
            this.isLoading = false
            this.trigger
        }
    },
    computed: {
        ...mapGetters(['article', 'author']),
    },
    methods: {
        ...mapActions(['getArticle', 'fetchAuthor']),
    },
}
</script>
