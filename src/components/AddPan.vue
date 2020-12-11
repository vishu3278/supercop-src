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
                <form action="" v-on:submit.prevent="submitPan">
                    <div class="field">
                        <label class="label">Full Name*</label>
                        <div class="control">
                            <input class="input is-info" type="text" v-model="fullname" placeholder="Full Name" required="">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Father's Name*</label>
                        <div class="control">
                            <input class="input is-info" type="text" v-model="fathername" placeholder="Father's Name" required="">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Date of Birth*</label>
                        <div class="control">
                            <v-date-picker :locale="{masks:{title:'MMM YYYY', L:'DD-MM-YYYY'}}" v-model="dob" color="blue" :max-date="new Date()" :input-props="{class:'input is-info', readonly: 'true', required: ''}" is-dark is-required is-expanded />
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">PAN No.*</label>
                        <div class="control">
                            <input class="input is-info" type="text" v-model="pan" placeholder="PAN No." required="">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Upload Photo*</label>
                        <ImagePreview imgId="pan_picture" v-on:imageData="base64Photo.pan_image = $event"></ImagePreview>
                    </div>
                    <div class="field">
                        <label class="label">Upload Signature*
                            <small class="has-text-weight-normal has-text-danger-dark">for best results, upload only transparent png file</small>
                        </label>
                        <ImagePreview imgId="pan_signature" v-on:imageData="base64Photo.pan_sign = $event"></ImagePreview>
                    </div>
                    <div class="field">
                        <label class="checkbox"><input type="checkbox" v-model="agree" required="required" aria-required="true"> I will be responsible for details entered in this form.</label>
                    </div>
                    <div v-show="agree" class="buttons has-addons">
                        <button class="button " v-on:click="clearData()">Clear</button>
                        <button type="submit" class="button is-success is-expanded" v-bind:class="{'is-loading':submitting}">Submit</button>
                    </div>
                </form>
                <div class="message is-success" v-show="response.message">
                    <div class="message-body" v-text="response.message"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
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
            pan: '',
            base64Photo: {
                pan_image: '',
                pan_sign: ''
            },
            errors: [],
            submitting: false,
            response: '',
            success: ''
        }
    },
    components: {
        ImagePreview
    },
    mounted: function() {
        window.sessionStorage.removeItem('response');
        this.$emit("loaded", false);
        this.userData = this.$store.getters.getUser;
    },
    computed: {
        setDate: function() {
            let formattedDate = (this.dob.getFullYear() + '-' + ('0' + (this.dob.getMonth() + 1)).slice(-2) + '-' + ('0' + this.dob.getDate()).slice(-2));
            return formattedDate;
        },
    },
    methods: {
        clearData: function() {
            Object.assign(this.$data, this.$options.data());
            this.userData = JSON.parse(window.sessionStorage.getItem("user"));
            this.response = JSON.parse(window.sessionStorage.getItem("response"));
        },
        submitPan: function() {
            this.submitting = true;
            let submit_data = JSON.stringify({
                "_action": "cGFuLWFkZA==",
                "userUniqueID": this.userData.userUniqueID,
                "full_name_en": this.fullname,
                "father_name": this.fathername,
                "birth_day": this.setDate,
                "pan_number": this.pan,
                "base64Photo": this.base64Photo
            })

            axios.post('https://thesupercop.com/webapis/v2/cards.php', submit_data)
                .then((response) => {
                    if (response.data.status == 1) {
                        // this.response = response.data;
                        window.sessionStorage.setItem("response", JSON.stringify(response.data));
                        this.clearData();
                        // this.errors = [];
                        setTimeout(function() {
                            // this.response = JSON.parse(window.sessionStorage.getItem("response"));
                            this.response = '';
                        }, 5000)
                    } else {
                        this.submitting = false;
                        this.errors.push(response.data.message);
                        window.sessionStorage.setItem("response", JSON.stringify(response.data.message));
                    }
                })
                .catch(error => {
                    this.submitting = false;
                    this.errors.push(error);
                })
                .then(() => {
                    this.submitting = false;
                })

        },
    }
}
</script>