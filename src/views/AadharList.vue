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
        <div class="table-container content is-small">
            <div class="notification is-light is-danger m-0" v-if="errors && errors.length">
                <p v-for="(error, index) of errors" v-bind:key="index">
                    {{index}} - {{error}}
                </p>
            </div>
            <progress v-show="submitting" class="progress is-small is-info" max="100">15%</progress>
            <table class="table is-narrow is-fullwidth">
                <thead>
                    <tr class="has-background-info ">
                        <th>Cardholder</th>
                        <th>Address</th>
                        <th>Act</th>
                    </tr>
                </thead>
                <tbody v-bind:class="{'is-hidden': activeTab=='approve'}">
                    <tr v-for="(item, index) of getPendingAadhaar" :key="index">
                        <td>
                            <div class="media">
                                <div class="media-left">
                                    <figure class="image is-32x32 m-0">
                                        <img src="https://thesupercop.com/assets/images/dummy_user.png" v-if="!item.photo" v-bind:alt="item.full_name_en">
                                        <img v-bind:src="getAadhaarImg + item.photo" v-bind:alt="item.full_name_en">
                                    </figure>
                                </div>
                                <div class="media-content">
                                    {{item.aadhaar_number}}<br>{{item.full_name_en}}<br>{{item.gender_en}}-{{item.birth_date}}
                                </div>
                            </div>
                            {{item.ack_no}}<br>VLE-<span class="tag">{{item.u_unique_id}}</span>
                        </td>
                        <td>{{item.address_state_en}}<br>{{item.address_district_en}}<br>{{item.address_block_en}}</td>
                        <td>
                            <button class="button is-primary is-small" v-on:click="print(index)">
                                <span class="icon ">
                                    <i class="las la-print"></i>
                                </span>
                            </button>
                        </td>
                    </tr>
                </tbody>
                <tbody v-bind:class="{'is-hidden': activeTab=='pending'}">
                    <tr v-for="(item, index) of getApproveAadhaar" :key="index">
                        <td>
                            <div class="media">
                                <div class="media-left">
                                    <figure class="image is-32x32 m-0">
                                        <img src="https://thesupercop.com/assets/images/dummy_user.png" v-if="!item.photo" v-bind:alt="item.full_name_en">
                                        <img v-bind:src="getAadhaarImg + item.photo" v-bind:alt="item.full_name_en">
                                    </figure>
                                </div>
                                <div class="media-content">
                                    {{item.aadhaar_number}}<br>{{item.full_name_en}}<br>{{item.gender_en}}-{{item.birth_date}}
                                </div>
                            </div>
                            {{item.ack_no}}<br>VLE-<span class="tag">{{item.u_unique_id}}</span>
                        </td>
                        <td>{{item.address_state_en}}<br>{{item.address_district_en}}<br>{{item.address_block_en}}</td>
                        <td>
                            <button class="button is-primary is-small" v-on:click="print(index)">
                                <span class="icon ">
                                    <i class="las la-print"></i>
                                </span>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
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
            submitting: false,
            activeTab: 'pending',
        }
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
        actionEncode: function(arg) {
            // console.log(arg);
            return btoa(arg);
        },
        listCache: function(arg) {
            switch (arg) {
                case 'pending':
                    console.log(this.getPendingAadhaar.length);
                    if (!this.getPendingAadhaar.length) {
                        this.list('pending');
                    }
                    this.errors = [];
                    this.activeTab = 'pending';
                    break;
                case 'approve':
                    console.log(this.getApproveAadhaar.length);
                    if (!this.getApproveAadhaar.length) {
                        this.list('approve');
                    }
                    this.errors = [];
                    this.activeTab = 'approve';
                    break;
                default:
                    this.list('pending');
                    break;
            }
        },
        list: function(arg) {
            this.errors = [];
            this.submitting = true;
            let postData = JSON.stringify({ "_action": 'YWFkaGFhci1saXN0', "userUniqueID": this.userData.userUniqueID, "cpage": 1, "status": this.actionEncode(arg) });
            // console.log(arg, this.actionEncode(arg));
            axios.post('https://thesupercop.com/webapis/v2/cards.php', postData)
            .then((response) => {
                if (response.data.status == 1) {
                    if (arg == 'pending') {
                        this.pendingList = response.data.data;
                        this.$store.dispatch('updatePendAaadhaar', response.data.data);
                    } else {
                        this.approvedList = response.data.data;
                        this.$store.dispatch('updateApprAadhaar', response.data.data);
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
        print: function(index) {
            let cardData = this.approvedList.slice(index, index+1)[0];
            // console.log(cardData);
            this.$router.push({ name: 'AadharPrint', params: cardData })
        }
    }
}
</script>