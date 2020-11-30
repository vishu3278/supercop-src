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
        imgBaseUrl: 'https://thesupercop.com/workspace/dist/img/users/',
        apiBaseUrl: 'https://thesupercop.com/webapis/v2/',
        aadhaarImg: 'https://thesupercop.com/uploads/aadhaar/',
        vleList: [],
        aadhaarListPending: [],
        aadhaarListApprove: [],
        voterListPending: [],
        voterListApprove: []
    },
    getters: {
        getUser(state) {
            return state.user;
        },
        getWallet(state) {
            return state.wallet;
        },

        getApiPath(state) {
            return state.apiBaseUrl;
        },
        getImgPath(state) {
            return state.imgBaseUrl;
        },
        getAadhaarImg(state) {
            return state.aadhaarImg;
        },
        getVleList(state) {
            return state.vleList;
        },
        getPendingAadhaar(state) {
            return state.aadhaarListPending;
        },
        getApproveAadhaar(state) {
            return state.aadhaarListApprove;
        },
        getPendingVoter(state) {
            return state.voterListPending;
        },
        getApproveVoter(state) {
            return state.voterListApprove;
        }
    },
    mutations: {
        UPDATE_USER(state, user) {
            state.user = user;
        },
        UPDATE_WALLET(state, wallet) {
            state.wallet = wallet;
        },
        UPDATE_VLE_LIST(state, vleList){
            state.vleList = vleList;
        },
        UPDATE_PEND_AADHAAR(state, aadhaarList){
            state.aadhaarListPending = aadhaarList;
        },
        UPDATE_APPR_AADHAAR(state, aadhaarList){
            state.aadhaarListApprove = aadhaarList;
        },
        RESET_STORE(state){
            state.user = '',
            state.wallet = '',
            state.vleList = [],
            state.aadhaarListPending = [],
            state.aadhaarListApprove = []
        }
    },
    actions: {
        updateUser(context, user) {
            context.commit('UPDATE_USER', user)
        },
        updateWallet(context, wallet) {
            context.commit('UPDATE_WALLET', wallet)
        },
        updateVleList(context, vlelist) {
            context.commit('UPDATE_VLE_LIST', vlelist)
        },
        updatePendAaadhaar(context, aadhaarList) {
            context.commit('UPDATE_PEND_AADHAAR', aadhaarList)
        },
        updateApprAadhaar(context, aadhaarList) {
            context.commit('UPDATE_APPR_AADHAAR', aadhaarList)
        },
        resetStore(context){
            context.commit('RESET_STORE')
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