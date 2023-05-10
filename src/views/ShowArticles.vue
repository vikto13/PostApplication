<template>
    <div class="container">
        <div class="card text-bg-light">
            <div class="card-header" style="margin-bottom: 2%">
                <ul class="nav nav-pills card-header-pills">
                    <li
                        v-for="(component, index) in components"
                        :key="index"
                        class="nav-item"
                    >
                        <a
                            class="nav-link navbar-light"
                            :class="index == shows ? 'active disabled' : null"
                            href="#"
                            @click="clickedNav(index)"
                            >{{ component.name }}</a
                        >
                    </li>
                </ul>
            </div>
            <div class="container">
                <alert></alert>
                <component :is="components[shows].id"></component>
            </div>
            <component :is="article.create == false ? 'OutsideBox' : ''">
                <component :is="article.create == false ? 'ModifyArticle' : ''">
                </component>
            </component>
        </div>
    </div>
</template>
<script>
import Alert from '../components/Alert.vue'
import ArticleTable from '../components/ArticleTable.vue'
import ModifyArticle from '../components/ModifyArticle.vue'
import OutsideBox from '../components/OutsideBox.vue'
import { mapActions, mapGetters } from 'vuex'
export default {
    name: 'ShowArticle',
    components: {
        Alert,
        ArticleTable,
        ModifyArticle,
        OutsideBox,
    },
    data() {
        return {
            shows: 0,
            components: [
                { name: 'All articles', id: 'ArticleTable' },
                { name: 'Create', id: 'ModifyArticle' },
            ],
        }
    },
    computed: {
        ...mapGetters(['boxMessage', 'article']),
    },
    methods: {
        ...mapActions(['clearArticle', 'clearMessage', 'alertAction']),
        clickedNav(index) {
            this.clearArticle()
            this.alertAction(null)
            index ? this.$store.commit('createArticle', true) : null
            this.shows = index
        },
    },
}
</script>
