<template>
    <div>
        <div class="card">
            <div class="card-header has-background-info-light">
                <p class="card-header-title has-text-info-dark">{{name}}</p>
                <span class="card-header-icon has-text-info-dark" v-on:click="addVoter">
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
        <div class="table-container content is-small">
            <div class="notification is-light is-danger m-0" v-if="errors && errors.length">
                <p v-for="(error, index) of errors" v-bind:key="index">
                    {{index}} - {{error}}
                </p>
            </div>
            <progress v-show="submitting" class="progress is-small is-info" max="100">25%</progress>
            <table class="table is-narrow is-fullwidth">
                <thead>
                    <tr class="has-background-info ">
                        <th>Info</th>
                        <th>Name (Gender)<br>Parent<br>Voter ID</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in getPendingVoter" v-bind:key="index">
                        <td>Ack- ACK300441605776484<br>
                            VLE- Gaurav saini<br>
                            <span class="tag">8QE741955043</span></td>
                        <td>Name (F)<br>Parent Name<br>UP/83/412/0540055</td>
                        <td>State<br>District<br>Block</td>
                        <td>
                            <button class="button is-primary is-small">
                                <span class="icon ">
                                    <i class="las la-print"></i>
                                </span>
                            </button>
                        </td>
                    </tr>
                    <!-- <tr v-for="vle in vlelist" :key="vle.id">
                        <td>
                            <figure class="image is-32x32 m-0">
                                <img src="https://thesupercop.com/assets/images/dummy_user.png" v-if="!vle.photo" v-bind:alt="vle.f_name">
                                <img v-bind:src="getImgPath + vle.photo" v-bind:alt="vle.f_name">
                            </figure>
                        </td>
                        <td>{{vle.f_name}}<br>{{vle.phone}}<br>{{vle.email}}</td>
                        <td>{{vle.state_ID}}<br>{{vle.district_ID}}<br>{{vle.block_ID}}</td>
                        <td><button class="button is-warning is-small">
                                <span class="icon is-small">
                                    <i class="las la-toggle-off"></i>
                                </span>
                            </button></td>

                    </tr> -->
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
    name: 'VoterList',
    data() {
        return {
            name: 'Voter List',
            userData: '',
            submitting: false,
            activeTab: 'pending',
            errors: [],
            pendingList: [],
            approvedList: []
        }
    },
    mounted: function() {
        this.$emit("loaded", false);
        // this.userData = this.$store.getters.getUser;
        this.list('pending');
    },
    computed: {
        ...mapGetters(['getUser', 'getApiPath', 'getAadhaarImg', 'getPendingVoter', 'getApproveVoter']),
    },
    methods: {
        actionEncode: function(arg) {
            console.log(arg);
            return btoa(arg);
        },
        listCache: function(arg) {
            switch (arg) {
                case 'pending':
                    console.log(this.getPendingVoter.length);
                    if (!this.getPendingVoter.length) {
                        this.list('pending');
                    }
                    this.errors = [];
                    this.activeTab = 'pending';
                    break;
                case 'approve':
                    console.log(this.getApproveVoter.length);
                    if (!this.getApproveVoter.length) {
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
            let postData = JSON.stringify({ "_action": 'dm90ZXItbGlzdA==', "userUniqueID": this.getUser.userUniqueID, "cpage": 1, "status": this.actionEncode(arg) });
            // console.log(arg, this.actionEncode(arg));
            axios.post('https://thesupercop.com/webapis/v2/cards.php', postData)
                .then((response) => {
                    if (response.data.status == 1) {
                        if (arg == 'pending') {
                            this.pendingList = response.data.data;
                            // this.$store.dispatch('updatePendAaadhaar', response.data.data);
                        } else {
                            this.approvedList = response.data.data;
                            // this.$store.dispatch('updateApprAadhaar', response.data.data);
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
        addVoter: function() {
            this.$router.push({ name: 'VoterAdd' });
        }
    }
}
</script>
<style>
.button.is-small .icon {
    font-size: 1.5em;
    margin-top: -0.125em;
}
</style>