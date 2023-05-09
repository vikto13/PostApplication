<template>
    <div class="container">
        <alert></alert>
        <button class="btn btn-primary d-flex" @click="createArticle()">
            Create Article
        </button>
        <create-article> </create-article>
        <article-table></article-table>
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
