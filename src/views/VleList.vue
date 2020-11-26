<template>
    <div class="is-clearfix">
        <div class="card">
            <div class="card-header has-background-info-light">
                <!-- <span class="card-header-icon">
                    <span class="icon has-text-info"><i class="las la-list-ol"></i></span>
                </span> -->
                <p class="card-header-title has-text-info-dark">{{name}}</p>
                <span class="card-header-icon has-text-info-dark" v-on:click="addVle">
                    <span class="icon "><i class="las la-plus-circle"></i></span>
                </span>
            </div>
        </div>
        <div class="table-container content is-small">
            <div class="notification is-light is-danger m-0" v-if="errors && errors.length">
                <p v-for="(error, index) of errors" v-bind:key="index">
                    {{index}} - {{error}}
                </p>
            </div>
            <div class="notification is-light is-success m-0" v-if="success">
                {{success}}
            </div>
            <progress v-show="submitting" class="progress is-small is-info" max="100">15%</progress>
            <table class="table is-narrow is-fullwidth">
                <thead v-if="!errors">
                    <tr class="has-background-info ">
                        <th>Img</th>
                        <th>VLE Info</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(vle, index) in vlelist" :key="vle.id" v-bind:class="[ vle.status == 'Active' ? '' : 'has-background-danger-light']">
                        <td>
                            <figure class="image is-32x32 m-0">
                                <img src="https://thesupercop.com/assets/images/dummy_user.png" v-if="!vle.photo" v-bind:alt="vle.f_name">
                                <img v-bind:src="getImgPath + vle.photo" v-bind:alt="vle.f_name">
                            </figure>
                        </td>
                        <td>{{vle.f_name}}<br>{{vle.phone}}<br>{{vle.email}}</td>
                        <td>{{vle.state_ID}}<br>{{vle.district_ID}}<br>{{vle.block_ID}}</td>
                        <td><button class="button is-small is-rounded" @click="changeStatus(vle.userUniqueID, vle.status, index)">
                                <span class="icon">
                                    <i class="las " v-bind:class="[ vle.status == 'Active' ? 'la-toggle-on has-text-success' : 'la-toggle-off has-text-danger']"></i>
                                </span>
                            </button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
    name: 'VLEList',
    data() {
        return {
            name: 'VLE List',
            userID:'',
            // userData: '',
            userImgPath: '',
            apiPath: '',
            submitting: false,
            errors: [],
            success: '',
            vlelist: []
        }
    },
    mounted: function() {
        this.$emit("loaded", false);
        let sessionUser = JSON.parse(window.sessionStorage.getItem('user'));
        this.userID = sessionUser.userUniqueID;
        // this.userData = this.$store.getters.getUser;
        this.$emit('userData', sessionUser);
        this.submitting = true;
        let postData = JSON.stringify({ "_action": "dmxlLWxpc3Q=", "userUniqueID": this.userID });
        axios.post(this.getApiPath + 'vle-list.php', postData)
            .then(response => {
                if (response.data.status == 1) {
                    this.vlelist = response.data.data;
                    this.errors = [];
                    // this.$router.push({ name: 'About', params: { user: this.user } });
                } else {
                    this.errors.push(response.data.message);
                }
            })
            .catch((error) => {
                this.errors.push(error);
            })
            .then(() => {
                this.submitting = false;
            })
    },
    computed: {
        // ...mapState(['user']),
        ...mapGetters(['getUser', 'getApiPath', 'getImgPath']),
        /*userID() {
            return this.getUser.userUniqueID;
        }*/
    },
    methods: {
        autoHideMsg() {
            if (this.success != null) {
                setTimeout(function() {
                    this.success = '';
                }, 4500)
            }
        },
        statusEncode(status) {
            if (status == 'Active') {
                return 'SW4tQWN0aXZl'
            } else {
                return 'QWN0aXZl'
            }
        },
        changeStatus: function(userID, status, index) {
            this.submitting = true;
            let postData = JSON.stringify({ "_action": "dmxlLXN0YXR1cw==", "userUniqueID": userID, "status": this.statusEncode(status) });
            console.log(this.statusEncode(status), index);
            axios.post(this.getApiPath + 'vle-status.php', postData)
                .then(response => {
                    if (response.data.status == 1) {
                        this.success = response.data.message;
                        this.vlelist[index].status = response.data.acstatus;
                    } else {
                        this.errors.push(response.data.message)
                    }
                })
                .catch((error) => { this.errors.push(error) })
                .then(() => {
                    this.submitting = false;
                })
        },
        addVle: function() {
            this.$router.push({ name: 'VLEAdd' });
        }
    }
}
</script>