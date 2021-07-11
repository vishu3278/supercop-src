<template>
    <div class="is-clearfix">
        <div class="card">
            <div class="card-header has-background-info-light">
                <span class="card-header-icon has-text-info-dark">
                    <span class="icon "><i class="las la-id-card-alt"></i></span>
                </span>
                <p class="card-header-title has-text-info-dark">{{name}}</p>
            </div>
            <div class="card-content">
                <form action="" v-on:submit.prevent="submitForm">
                    <div class="field">
                        <label class="label">Date of Birth (जन्म तिथि) *</label>
                        <div class="control">
                            <v-date-picker :locale="{masks:{title:'MMM YYYY', L:'DD-MM-YYYY'}}" v-model="dob" color="blue" :max-date="new Date()" :input-props="{class:'input is-info', readonly: 'true', required: 'required'}" is-dark is-required is-expanded />
                            <p class="help is-danger" v-show="!dob">Date is required</p>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Driving Licence No. *</label>
                        <div class="control">
                            <input v-model="dlno" class="input is-info" type="text" placeholder="Driving Licence No." required="">
                        </div>
                        <p class="help is-danger" v-show="!dlno">Please fill this field</p>
                    </div>
                    <label class="label">Upload signature*</label>
                    <image-preview imgId="dl_sign" imgType="image/jpeg, image/png" v-on:imageData="base64Photo = $event" ></image-preview>
                    
                    <div class="field">
                        <label class="checkbox"><input type="checkbox" v-model="agree" required="required" aria-required="true"> I will be responsible for details entered in this form.</label>
                    </div>
                    <div class="message is-danger" v-show="errors.length>0">
                        <div class="message-body">
                            <ul>
                                <li v-for="(err, index) in errors" v-bind:key="index">{{index}} - {{err}}</li>
                            </ul>
                        </div>
                    </div>
                    <div v-show="agree">
                        <div class="buttons has-addons">
                            <button type="button" class="button" v-on:click="clearData()">Clear</button>
                            <button type="submit" class="button is-success is-expanded" v-bind:class="{'is-loading':submitting}">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="box">
            <div class="message is-success" v-if="response">
                <div class="message-body">
                    <p>{{response.message}}</p>
                    <!-- <p>Your acknowledgement no is {{response.data.ack_no}}</p> -->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import ImagePreview from '../components/ImagePreview'
export default {
    name: 'DrivingAdd',
    data() {
        return {
            name: 'Driving Licence Add',
            userData: '',
            dlno: '',
            dob: '',
            sign: '',
            idproof: '',
            agree: false,
            errors: [],
            base64Photo: '',
            minsize: 5,
            maxsize: 500,
            imgsize: { class: '', msg: ''},
            submitting: false,
            response: '',
        }
    },
    components: { ImagePreview },
    mounted: function() {
        this.$emit("loaded", false);
        this.userData = this.$store.getters.getUser;
        window.sessionStorage.removeItem("response");
    },
    computed: {
        setDate: function() {
            let formattedDate = this.dob.getFullYear() + '-' + ('0' + (this.dob.getMonth() + 1)).slice(-2) + '-' + ('0' + this.dob.getDate()).slice(-2);
            return formattedDate;
        }
    },
    methods: {
        clearData: function() {
            Object.assign(this.$data, this.$options.data());
            // window.sessionStorage.removeItem("QRCODE");
            document.querySelector("#dl_sign").src = '';
            this.userData = JSON.parse(window.sessionStorage.getItem("user"));
            this.response = JSON.parse(window.sessionStorage.getItem("response"));
        },
        submitForm: function() {
            let postImg = document.querySelector("#dl_sign").src;
            let postData = JSON.stringify({
                "_action": "ZGwtYWRk",
                "userUniqueID": this.userData.userUniqueID,
                "birth_day": this.setDate,
                "driving_licence_no": this.dlno,
                "base64Photo": { "driving_licence_sign": postImg }
            })
            this.submitting = true;
            axios.post('https://thesupercop.com/webapis/v2/cards.php', postData)
                .then(response => {
                    if (response.data.status == 1) {
                        window.sessionStorage.setItem("response", JSON.stringify(response.data));
                        this.clearData();
                        this.errors = [];
                        setTimeout(function() {
                            this.response = '';
                        }, 4500)
                    } else {
                        this.errors.push(response.data.message);
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