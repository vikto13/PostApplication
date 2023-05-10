<template>
    <div class="container">
        <alert></alert>
        <article-table></article-table>
        <button class="btn btn-primary d-flex" @click="createArticle()">
            Create Article
        </button>
        <create-article> </create-article>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Alert from '../components/Alert.vue'
import ArticleTable from '../components/ArticleTable.vue'
import CreateArticle from './CreateArticle.vue'

export default {
    name: 'ShowArticle',
    components: {
        Alert,
        ArticleTable,
        CreateArticle,
    },
    methods: {
        createArticle() {
            this.$store.commit('createArticle', true)
        },
    },
}
</script>
