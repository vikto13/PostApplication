import VueRouter from "vue-router";
import ShowArticles from "../views/ShowArticles.vue"
import NotFound from "../views/NotFound.vue"
import DetailArticle from "../views/DetailArticle.vue"
export const routers = new VueRouter({
    routes: [
        {
            path: '/',
            component: ShowArticles
        },
        {
            path: '/article/:id',
            component: DetailArticle
        },
        {
            path: '*',
            component: NotFound
        }
    ]
});



