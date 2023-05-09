import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import { routers as router } from "./router/routers"
import axios from 'axios';
import Vuex from 'vuex'
import { inilializeStore } from "./store/initializeStore"
import vueDebounce from 'vue-debounce'

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.prototype.$http = axios;
Vue.use(vueDebounce, {
    listenTo: ['input']
});

const store = new Vuex.Store(inilializeStore)

new Vue({
    store,
    router,
    render: (h) => h(App),
}).$mount('#app');
