import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import bulma from 'bulma/css/bulma.min.css'
import Vuex from 'vuex'

Vue.use(Vuex)

Vue.config.productionTip = false

const store = new Vuex.Store({
    state: {
        count: 0,
        user: '',
        wallet: '',
        imgBaseUrl: 'https://thesupercop.com/workspace/dist/img/users/'
    },
    getters: {
        getUsers(state) {
            return state.user;
        },
        getWallet(state) {
            return state.wallet;
        },
        getImgPath(state) {
            return state.imgBaseUrl;
        }
    },
    mutations: {
        updateUser(state, user) {
            state.user = user;
        },
        updateWallet(state, wallet) {
            state.wallet = wallet;
        }
    },
    actions: {
        updateUser(context, user) {
            context.commit('updateUser', user)
        },
        updateWallet(context, wallet) {
            context.commit('updateWallet', wallet)
        }
    }
})

new Vue({
    router,
    // bulma,
    store,
    render: h => h(App)
    // render: function (h) { return h(App) }
}).$mount('#app')