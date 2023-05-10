import VueRouter from "vue-router";
import ShowArticles from "../views/ShowArticles.vue"
import NotFound from "../views/NotFound.vue"
export const routers = new VueRouter({
    routes: [
        {
            path: '/',
            component: ShowArticles
        },
        {
            path: '*',
            component: NotFound
        }
    ]
});



