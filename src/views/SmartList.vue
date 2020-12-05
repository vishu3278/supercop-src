<template>
    <div class="is-clearfix">
        <div class="card">
            <div class="card-header has-background-info-light">
                <!-- <span class="card-header-icon">
                    <span class="icon has-text-info"><i class="las la-list-ol"></i></span>
                </span> -->
                <p class="card-header-title has-text-info-dark">{{name}}</p>
                <span class="card-header-icon has-text-info-dark" v-on:click="addSmart">
                    <span class="icon "><i class="las la-plus-circle"></i></span>
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
        <div class="level is-mobile p-3 m-0">
            <div class="level-left"><label class="level-item">Search</label></div>
            <div class="level-right">
                <div class="field has-addons">
                    <div class="control"><input type="text" class="input is-small" placeholder="Search"></div>
                    <div class="control"><button type="button" class="button is-small is-info"><i class="las la-search"></i></button></div>
                    <div class="control"><button type="button" class="button is-small is-ghost"><i class="las la-undo-alt"></i></button></div>
                </div>
            </div>
        </div>
        <div class="notification is-light is-danger m-0" v-if="errors && errors.length">
            <p v-for="(error, index) of errors" v-bind:key="index">
                {{index}} - {{error}}
            </p>
        </div>
        <progress v-show="submitting" class="progress is-small is-info" max="100">25%</progress>
        <div class="table-container content is-small">
            <table class="table is-narrow is-fullwidth">
                <thead>
                    <tr class="has-background-info ">
                        <th>Info</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody v-bind:class="{'is-hidden': activeTab=='approve'}">
                    <tr v-for="(item, index) of pendingList" :key="index">
                        <td>
                            <div class="media">
                                <div class="media-left">
                                    <figure class="image is-32x32 m-0">
                                        <img src="https://thesupercop.com/assets/images/dummy_user.png" v-if="!item.photo" alt="image">
                                        <img v-else v-bind:src="'https://thesupercop.com/uploads/smart_cards/' + item.photo" alt="image">
                                    </figure>
                                </div>
                                <div class="media-content">
                                    {{item.full_name_en}}<br>{{item.gender_en}}<br>{{item.birth_date}}
                                </div>
                            </div>
                            <span class="tag is-warning is-light">{{item.smart_unique_id}}</span><br>
                            Ack-{{item.ack_no}}
                        </td>
                        <td>{{item.address_state_en}}<br>{{item.address_district_en}}<br>{{item.address_block_en}}<br>{{item.created_at}}</td>
                        <td>
                            <button class="button is-primary is-small">
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
                                        <img src="https://thesupercop.com/assets/images/dummy_user.png" v-if="!item.photo" v-bind:alt="item.full_name_en">
                                        <img v-bind:src="'https://thesupercop.com/uploads/smart_cards/' + item.photo" v-bind:alt="item.full_name_en">
                                    </figure>
                                </div>
                                <div class="media-content">
                                    {{item.full_name_en}}<br>{{item.gender_en}}<br>{{item.birth_date}}
                                </div>
                            </div>
                            <span class="tag is-primary is-light">{{item.smart_unique_id}}</span><br>
                            Ack- {{item.ack_no}}
                        </td>
                        <td>{{item.address_state_en}}<br>{{item.address_district_en}}<br>{{item.address_block_en}}<br>{{item.created_at}}</td>
                        <td>
                            <button class="button is-primary is-small">
                                <span class="icon ">
                                    <i class="las la-print"></i>
                                </span>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-show="activeTab=='pending'">
            <Pagination :totalPages="pendingPages" :currentPage="currentPage" v-on:pageChange="pageChange($event)"></Pagination>
        </div>
        <div v-show="activeTab=='approve'">
            <Pagination :totalPages="approvePages" :currentPage="currentPage" v-on:pageChange="pageChange($event)"></Pagination>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import Pagination from '../components/Pagination'
export default {
    name: 'SmartList',
    data() {
        return {
            name: 'Smart List',
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
    mounted: function() {
        this.$emit("loaded", false);
        this.list('pending');
    },
    components: {
        Pagination
    },
    computed: {
        ...mapGetters(['getUser', 'getApiPath', 'getAadhaarImg', 'getPendingSmart', 'getApproveSmart']),
    },
    methods: {
        pageChange: function(page) {
            console.log(page);
            this.currentPage = page;
            this.list();
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
            let postData = JSON.stringify({ "_action": 'c21hcnQtbGlzdA==', "userUniqueID": this.getUser.userUniqueID, "cpage": this.currentPage, "status": this.actionEncode(arg) });
            // console.log(arg, this.actionEncode(arg));
            axios.post('https://thesupercop.com/webapis/v2/cards.php', postData)
                .then((response) => {
                    if (response.data.status == 1) {
                        if (arg == 'pending') {
                            this.pendingList = response.data.data;
                            this.pendingPages = response.data.total_pages;
                            // this.$store.dispatch('updatePendSmart', response.data.data);
                        } else {
                            this.approvedList = response.data.data;
                            this.approvePages = response.data.total_pages;
                            // this.$store.dispatch('updateApprSmart', response.data.data);
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
        addSmart: function() {
            this.$router.push({ name: 'SmartAdd' });
        }
    }
}
</script>