<template>
    <div class="is-clearfix">
        <div class="card">
            <div class="card-header has-background-info-light">
                <span class="card-header-icon has-text-info-dark">
                    <span class="icon "><i class="las la-user-plus"></i></span>
                </span>
                <p class="card-header-title has-text-info-dark">{{name}}</p>
            </div>
            <div class="card-content">
                <div class="field">
                    <label class="label">Full Name</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="Full Name">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Father's Name</label>
                    <div class="control">
                        <input class="input" type="email" placeholder="Father's Name">
                    </div>
                </div>
                <div class="field">
                    <label>Date of Birth</label>
                    <div class="control">
                        <v-date-picker :locale="{masks:{title:'MMM YYYY', L:'DD-MM-YYYY'}}" v-model="dob" color="blue" :max-date="new Date()" :input-props="{class:'input is-info', readonly: 'true'}" is-dark is-required is-expanded />
                    </div>
                </div>
                <div class="field">
                    <label class="label">PAN No.</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="PAN No.">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Comment</label>
                    <div class="control">
                        <textarea class="textarea" rows="2" placeholder="Comments"></textarea>
                    </div>
                </div>
                <div class="field">
                    <label class="checkbox"><input type="checkbox" v-model="agree" required="required" aria-required="true"> I will be responsible for details entered in this form.</label>
                </div>
            </div>
        </div>
        <div v-show="agree" class="box is-primary ">
            <p class="title is-5">Address Information</p>
            <label class="label">Upload Photo</label>
            <ImagePreview v-on:imageData="pic = $event"></ImagePreview>
            <label class="label">Upload Signature</label>
            <ImagePreview v-on:imageData="signature = $event"></ImagePreview>
            <label class="label">Upload ID Proof</label>
            <image-preview v-on:imageData="idproof = $event"></image-preview>
            <label class="label">Upload Disclaimer</label>
            <image-preview v-on:imageData="disclaimer = $event"></image-preview>

            <button class="button is-fullwidth is-success">Submit</button>
        </div>
        
    </div>
</template>
<script>
// import axios from 'axios'
// import Address from './Address.vue'
import ImagePreview from './ImagePreview.vue'
export default {
    name: 'PANAdd',
    data() {
        return {
            name: 'PAN Add',
            userData: '',
            fullname: '',
            fathername: '',
            agree: '',
            dob: '',
            pic: '',
            signature: '',
            idproof: '',
            disclaimer: ''
        }
    },
    components: {
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
    }
}
</script>