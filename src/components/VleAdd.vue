<template>
    <div class="is-clearfix">
        <div class="card">
            <div class="card-header has-background-info-light">
                <span class="card-header-icon has-text-info-dark">
                    <span class="icon "><i class="las la-user-plus"></i></span>
                </span>
                <p class="card-header-title has-text-info-dark">{{name}}</p>
                <!-- <span class="card-header-icon" v-on:click="addVle">
                    <span class="icon has-text-info"><i class="las la-plus-circle"></i></span>
                </span> -->
            </div>
            <div class="card-content">
                <div class="field">
                    <label class="label">Name</label>
                    <div class="control has-icons-right">
                        <input class="input" type="text" v-model="username" placeholder="Name">
                        <span class="icon is-right"><i class="las la-user"></i></span>
                    </div>
                </div>
                <div class="field">
                    <label class="label">Email</label>
                    <div class="control has-icons-right">
                        <input class="input" type="email" v-model="email" placeholder="Email">
                        <span class="icon is-right">
                            <i class="las la-envelope"></i>
                        </span>
                    </div>
                </div>
                <div class="field">
                    <label class="label">Contact No.</label>
                    <div class="control has-icons-right">
                        <input class="input" type="number" v-model="phone" placeholder="Contact No.">
                        <span class="icon is-right"><i class="las la-phone"></i></span>
                    </div>
                </div>
                <div class="field">
                    <label class="label">Alternate Phone No.</label>
                    <div class="control has-icons-right">
                        <input class="input" type="number" v-model="phone2" placeholder="Alternate Phone No.">
                        <span class="icon is-right"><i class="las la-phone-alt"></i></span>
                    </div>
                </div>
                <div class="field">
                    <label class="label">Password</label>
                    <div class="control has-icons-right">
                        <input class="input" type="password" v-model="password" minlength="6" placeholder="Password">
                        <span class="icon is-right"><i class="las la-lock"></i></span>
                    </div>
                </div>
                <div class="field">
                    <label class="label">Address</label>
                    <div class="control">
                        <textarea class="textarea" rows="2" v-model="address" placeholder="Address"></textarea>
                    </div>
                </div>
                <app-address v-on:stateID="getStateId($event)" v-on:districtID="getDistId($event)" v-on:blockID="getBlockId($event)"></app-address>
                
                <label class="label">Profile Pic/Logo</label>
                <ImagePreview v-on:imageData="photo = $event"></ImagePreview>
                
            </div>
        </div>
        <div class="box is-primary ">
            <button class="button is-fullwidth is-success" v-bind:class="{'is-loading':loading}" v-on:click="addVle">Submit</button>
            <div class="message is-danger" v-show="errors.length>0">
                <div class="message-body">
                    <ul>
                        <li v-for="(err, index) in errors" v-bind:key="index">{{index}} - {{err}}</li>
                    </ul>
                </div>
            </div>
            <div class="message" v-show="success">
                <div class="message-body">{{success}}</div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import Address from './Address.vue'
import ImagePreview from './ImagePreview.vue'
export default {
    name: 'VLEAdd',
    data() {
        return {
            name: 'Mobile VLE Add',
            userData: '',
            photo: '',
            phone: '',
            userUniqueID: '',
            username: '',
            email: '',
            phone2: '',
            password: '',
            address: '',
            state: '',
            district: '',
            block: '',
            parent_admin_user_id: '',
            errors: [],
            success: '',
            loading: false,
        }
    },
    components: {
        'app-address': Address,
        ImagePreview
    },
    mounted: function() {
        this.$emit("loaded", false);
        this.userData = this.$store.getters.getUser;
    },
    computed: {
        getAdminID: function() {
            return this.userData.userUniqueID;
        }
    },
    methods: {
        getStateId: function(arg) {
            this.state = arg;
        },
        getDistId: function(arg) {
            this.district = arg;
        },
        getBlockId: function(arg) {
            this.block = arg;
        },
        addVle: function() {
            this.errors = [];
            this.loading = true;
            // this.$router.push({ name: 'VLEList' });
            let postData = JSON.stringify({
                "_action": "dmxlLWFkZA==",
                "photo": this.photo,
                "phone": this.phone,
                "userUniqueID": this.phone,
                "username": this.username,
                "email": this.email,
                "phone2": this.phone2,
                "password": this.password,
                "address": this.address,
                "state": this.state,
                "district": this.district,
                "block": this.block,
                "parent_admin_user_id": this.getAdminID
            });
            axios.post('https://thesupercop.com/webapis/v2/vle-add.php', postData)
                .then((response) => {
                    if (response.data.status == 1) {
                        // this.user = response.data;
                        this.success = response.data.message;
                        // this.$router.push({ name: 'About', params: { user: this.user } });
                    } else {
                        this.errors.push(response.data.message);
                    }
                })
                .catch((error) => {
                    this.errors.push(error);
                })
                .then(()=>{
                    this.loading = false;
                })
        }
    }
}
</script>