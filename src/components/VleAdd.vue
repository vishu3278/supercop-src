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
                    <div class="control">
                        <input class="input" type="text" placeholder="Name">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Email</label>
                    <div class="control">
                        <input class="input" type="email" placeholder="Email">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Contact No.</label>
                    <div class="control">
                        <input class="input" type="number" placeholder="Contact No.">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Password</label>
                    <div class="control">
                        <input class="input" type="password" placeholder="Password">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Address</label>
                    <div class="control">
                        <textarea class="textarea" rows="2" placeholder="Address"></textarea>
                    </div>
                </div>
                <app-address></app-address>
                <div class="field">
                    <label>Block Coordinator</label>
                    <div class="control">
                        <div class="select is-fullwidth">
                            <select v-model="blockcoord" class="input is-info">
                                <option value="" selected="">Select Block Coordinator</option>
                                <option></option>
                            </select>
                        </div>
                        <p class="help is-danger">No blocks found</p>
                    </div>
                </div>
                <label >Profile Pic</label>
                <ImagePreview v-on:imageData="profilepic = $event"></ImagePreview>
                <div class="field">
                    <label class="label">UserID</label>
                    <div class="control">
                        <input class="input" type="text" readonly="" placeholder="UserID">
                    </div>
                </div>
                <div class="field">
                    <label>Select Admin</label>
                    <div class="control">
                        <div class="select is-fullwidth">
                            <select v-model="blockcoord" class="input is-info">
                                <option value="" selected="">Select Admin</option>
                                <option></option>
                            </select>
                        </div>
                        <p class="help is-danger">No Admins</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="box is-primary ">
            <p class="title is-5">Other Information</p>
            <div class="field">
                <label class="label">Aadhaar No.</label>
                <div class="control">
                    <input class="input" type="number" placeholder="Aadhaar No.">
                </div>
            </div>
            <ImagePreview v-on:imageData="aadhaarpic = $event"></ImagePreview>
            <div class="field">
                <label class="label">PAN No.</label>
                <div class="control">
                    <input class="input" type="number" placeholder="PAN No.">
                </div>
            </div>
            <ImagePreview v-on:imageData="panpic = $event"></ImagePreview>
            <button class="button is-fullwidth is-success">Submit</button>
        </div>
        
    </div>
</template>
<script>
// import axios from 'axios'
import Address from './Address.vue'
import ImagePreview from './ImagePreview.vue'
export default {
    name: 'VLEAdd',
    data() {
        return {
            name: 'VLE Add',
            userData: '',
            profilepic: '',
            aadhaarpic: '',
            panpic: '',
            blockcoord: ''
        }
    },
    components: {
        'app-address': Address,
        ImagePreview
    },
    mounted: function() {
        this.$emit("loaded", false);
        this.userData = this.$store.getters.getUsers;
    },
    methods: {
        list: function() {

            /*axios.post('https://thesupercop.com/webapis/login.php', postData)
                .then(response => {
                    if (response.data.status == 1) {
                        this.user = response.data;
                        this.errors = [];
                        this.$router.push({ name: 'About', params: { user: this.user } });
                    } else {
                        this.errors.push(response.data.message);
                    }
                })
                .catch(error => {
                    this.errors.push(error);
                })*/
        },
        addVle: function() {
            this.$router.push({ name: 'VLEList' });
        }
    }
}
</script>