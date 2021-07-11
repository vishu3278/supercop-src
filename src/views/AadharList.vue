<template>
    <div>
        <div class="card">
            <div class="card-header has-background-info-light">
                <p class="card-header-title has-text-info-dark">{{name}}</p>
                <span class="card-header-icon" v-on:click="addAadhaar">
                    <span class="icon has-text-info"><i class="las la-plus-circle"></i></span>
                </span>
            </div>
            <div class="card-content p-0 mb-2">
                <div class="tabs is-fullwidth">
                    <ul>
                        <li v-bind:class="{'is-active': activeTab=='pending'}">
                            <a role="button" v-on:click="listCache('pending')">
                                <span>Pending</span>
                            </a>
                        </li>
                        <li v-bind:class="{'is-active': activeTab=='approve'}">
                            <a role="button" v-on:click="listCache('approve')">
                                <span>Approved</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- <div class="level is-mobile p-3 m-0">
            <div class="level-left"><label class="level-item">Search</label></div>
            <div class="level-right">
                <div class="field has-addons">
                    <div class="control"><input type="text" class="input is-small" placeholder="Search"></div>
                    <div class="control"><button type="button" class="button is-small is-info"><i class="las la-search"></i></button></div>
                    <div class="control"><button type="button" class="button is-small is-ghost"><i class="las la-undo-alt"></i></button></div>
                </div>
            </div>
        </div> -->
        <div class="table-container content is-small">
            <div class="notification is-light is-danger m-0" v-if="errors && errors.length">
                <p v-for="(error, index) of errors" v-bind:key="index">
                    {{index}} - {{error}}
                </p>
            </div>
            <!-- <progress v-show="submitting" class="progress is-small is-info" max="100">15%</progress> -->
            <table class="table is-narrow is-fullwidth">
                <thead>
                    <tr class="has-background-info ">
                        <th>Cardholder</th>
                        <th>Address/Created</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody v-bind:class="{'is-hidden': activeTab=='approve'}">
                    <tr v-for="(item, index) of pendingList" :key="index">
                        <td>
                            <div class="media">
                                <div class="media-left">
                                    <figure class="image is-32x32 m-0">
                                        <img src="https://thesupercop.com/assets/images/dummy_user.png" v-if="!item.photo" v-bind:alt="item.full_name_en">
                                        <img v-bind:src="getAadhaarImg + item.photo" v-bind:alt="item.full_name_en">
                                    </figure>
                                </div>
                                <div class="media-content">
                                    {{item.full_name_en}} ({{item.gender_en}})<br>{{item.birth_date}}<br>
                                    <span class="tag is-warning is-light">{{item.aadhaar_number}}</span>
                                </div>
                            </div>
                            Ack-{{item.ack_no}}
                        </td>
                        <td>{{item.address_state_en}}<br>{{item.address_district_en}}<br>{{item.address_block_en}}<br>{{item.created_at}}</td>
                        <td>
                            <button class="button is-primary is-small" v-on:click="print(item.p_id)">
                                <span class="icon ">
                                    <i class="las la-print"></i>
                                </span>
                            </button>
                        </td>
                    </tr>
                </tbody>
                <tbody v-bind:class="{'is-hidden': activeTab=='pending'}">
                    <tr v-for="(item, index) of approvedList" :key="index">
                        <td>
                            <div class="media">
                                <div class="media-left">
                                    <figure class="image is-32x32 m-0">
                                        <img src="https://thesupercop.com/assets/images/dummy_user.png" v-if="!item.photo" alt="image">
                                        <img v-else v-bind:src="getAadhaarImg + item.photo" alt="image">
                                    </figure>
                                </div>
                                <div class="media-content">
                                    {{item.full_name_en}} ({{item.gender_en}})<br>{{item.birth_date}}<br>
                                    <span class="tag is-primary is-light">{{item.aadhaar_number}}</span>
                                </div>
                            </div>
                            Ack-{{item.ack_no}}
                        </td>
                        <td>{{item.address_state_en}}<br>{{item.address_district_en}}<br>{{item.address_block_en}}<br>{{item.created_at}}</td>
                        <td>
                            <!-- <button class="button is-primary is-small" v-on:click="print(index)">
                                <span class="icon ">
                                    <i class="las la-print"></i>
                                </span>
                            </button> -->
                            {{item.p_id}}
                            <button class="button is-primary is-small" v-bind:id="item.p_id" v-on:click="print(item.p_id)">
                                <span class="icon ">
                                    <i class="las la-print"></i>
                                </span>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="box">
            <progress class="progress is-small is-warning" v-show="submitting" max="100">20%</progress>
            <div v-show="activeTab=='pending'">
                <pagination :totalPages="pendingPages" :currentPage="currentPage" v-on:pageChange="pageChange($event, 'pending')"></pagination>
            </div>
            <div v-show="activeTab=='approve'">
                <pagination :totalPages="approvePages" :currentPage="currentPage" v-on:pageChange="pageChange($event, 'approve')"></pagination>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Pagination from '../components/Pagination.vue'
import axios from 'axios'
export default {
    name: 'Aadhaarlist',
    data() {
        return {
            name: 'Aadhaar List',
            userData: '',
            approvedList: [],
            pendingList: [],
            errors: [],
            pendingPages: '',
            approvePages: '',
            currentPage: 1,
            submitting: false,
            activeTab: 'pending',
        }
    },
    components: {
        Pagination
    },
    mounted: function() {
        this.$emit("loaded", false);
        this.userData = JSON.parse(window.sessionStorage.getItem("user"));
        this.$emit('userData', this.userData)
        this.list('pending');
    },
    computed: {
        ...mapGetters(['getUser', 'getApiPath', 'getAadhaarImg', 'getPendingAadhaar', 'getApproveAadhaar']),
    },
    methods: {
        pageChange: function(page, type) {
            console.log(page);
            this.currentPage = page;
            this.list(type);
        },
        actionEncode: function(arg) {
            // console.log(arg);
            return btoa(arg);
        },
        listCache: function(arg) {
            switch (arg) {
                case 'pending':
                    this.errors = [];
                    this.activeTab = 'pending';
                    this.list('pending');
                    break;
                case 'approve':
                    this.errors = [];
                    this.activeTab = 'approve';
                    this.list('approve');
                    break;
                default:
                    this.list('pending');
                    break;
            }
        },
        list: function(arg) {
            this.errors = [];
            this.submitting = true;
            let postData = JSON.stringify({ "_action": 'YWFkaGFhci1saXN0', "userUniqueID": this.userData.userUniqueID, "cpage": this.currentPage, "status": this.actionEncode(arg) });
            // console.log(arg, this.actionEncode(arg));
            axios.post('https://thesupercop.com/webapis/v2/cards.php', postData)
                .then((response) => {
                    if (response.data.status == 1) {
                        if (arg == 'pending') {
                            this.pendingList = response.data.data;
                            this.pendingPages = response.data.total_pages;
                            window.sessionStorage.setItem('pendingPages', this.pendingPages);
                            // this.$store.dispatch('updatePendAaadhaar', response.data.data);
                        } else {
                            this.approvedList = response.data.data;
                            this.approvePages = response.data.total_pages;
                            window.sessionStorage.setItem('approvePages', this.approvePages);
                            // this.$store.dispatch('updateApprAaadhaar', response.data.data);
                        }
                    } else {
                        this.errors.push(response.data.message);
                    }
                })
                .catch((error) => {
                    this.errors.push(error);
                })
                .then(() => {
                    this.submitting = false;
                    if (arg == 'pending') {
                        this.activeTab = 'pending';
                    } else {
                        this.activeTab = 'approve';
                    }
                })

        },
        addAadhaar: function() {
            this.$router.push({ name: 'AadhaarAdd' });
        },
        print: function(cardid) {
            // let cardData = this.approvedList.slice(index, index + 1)[0];
            console.log(cardid);
            this.$router.push({ name: 'AadharPrint', params: {cardid: cardid} })
            /*let p_id = event.currentTarget.getAttribute("id");
            var cardids = [];
            cardids[0] = p_id;
            let postData = {"o_id":cardids};
            axios({
                method: 'post',
                url: 'https://thesupercop.com/workspace/include/cards/aadhaar-print.php?o_id='+this.cardids,
                data: postData,
                responseType: 'document'
            })
            .then(response => {
                console.log(response.status, response.data);
                this.$router.push({ name: 'AadharPrint', params: {page: response.data} })
                // openPrint();
            })
            .catch(error => {
                console.log(error);
            })
            .then(()=>{
                let errHtml = '<html><body><h4>This is error page.</h4><p>This error is returned by ajax request.</p></body></html>';
                // var pageContent = 'data:text/html;base64,' + btoa(errHtml);
                // console.log(pageContent);
                this.$router.push({ name: 'AadharPrint', params: {page: errHtml} })
            })*/

        }
    }
}
</script>