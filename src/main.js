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
        voterListApprove: [],
        drivingListPending: [],
        drivingListApprove: [],
        panListPending: [],
        panListApprove: [],
        smartListPending: [],
        smartListApprove: []
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
        },
        getPendingDl(state) {
            return state.drivingListPending;
        },
        getApproveDl(state) {
            return state.drivingListApprove;
        },
        getPendingPan(state) {
            return state.panListPending;
        },
        getApprovePan(state) {
            return state.panListApprove;
        },
        getPendingSmart(state) {
            return state.smartListPending;
        },
        getApproveSmart(state) {
            return state.smartListApprove;
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
        UPDATE_PEND_VOTER(state, voterList){
            state.voterListPending = voterList;
        },
        UPDATE_APPR_VOTER(state, voterList){
            state.voterListApprove = voterList;
        },
        UPDATE_PEND_DL(state, drivingList){
            state.drivingListPending = drivingList;
        },
        UPDATE_APPR_DL(state, drivingList){
            state.drivingListApprove = drivingList;
        },
        UPDATE_PEND_PAN(state, panList){
            state.panListPending = panList;
        },
        UPDATE_APPR_PAN(state, panList){
            state.panListApprove = panList;
        },
        UPDATE_PEND_SMART(state, smartList){
            state.smartListPending = smartList;
        },
        UPDATE_APPR_SMART(state, smartList){
            state.smartListApprove = smartList;
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
        updateApprAaadhaar(context, aadhaarList) {
            context.commit('UPDATE_APPR_AADHAAR', aadhaarList)
        },
        updatePendVoter(context, voterList) {
            context.commit('UPDATE_PEND_VOTER', voterList)
        },
        updateApprVoter(context, voterList) {
            context.commit('UPDATE_APPR_VOTER', voterList)
        },
        updatePendDl(context, drivingList) {
            context.commit('UPDATE_PEND_DL', drivingList)
        },
        updateApprDl(context, drivingList) {
            context.commit('UPDATE_APPR_DL', drivingList)
        },
        updatePendPan(context, panList) {
            context.commit('UPDATE_PEND_PAN', panList)
        },
        updateApprPan(context, panList) {
            context.commit('UPDATE_APPR_PAN', panList)
        },
        updatePendSmart(context, smartList) {
            context.commit('UPDATE_PEND_SMART', smartList)
        },
        updateApprSmart(context, smartList) {
            context.commit('UPDATE_APPR_SMART', smartList)
        },
        resetStore(context){
            context.commit('RESET_STORE')
        },
        setDate (context) {
            let formattedDate = ('0' + context.getDate()).slice(-2) + '-' + ('0' + (context.getMonth() + 1)).slice(-2) + '-' + context.getFullYear();
            console.log(formattedDate);
            return formattedDate;
        },
    }
})

new Vue({
    router,
    // bulma,
    store,
    render: h => h(App)
    // render: function (h) { return h(App) }
}).$mount('#app')