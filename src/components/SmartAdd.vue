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
                <div class="field">
                    <label class="label">Full Name</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="Full Name" required="">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Father's Name</label>
                    <div class="control">
                        <input class="input" type="email" placeholder="Father's Name" required="">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Date of Birth</label>
                    <div class="control">
                        <v-date-picker :locale="{masks:{title:'MMM YYYY', L:'DD-MM-YYYY'}}" v-model="dob" color="blue" :max-date="new Date()" :input-props="{class:'input is-info', readonly: 'true'}" is-dark is-required is-expanded />
                    </div>
                </div>
                <div class="field">
                    <label class="label">Gender</label>
                    <div class="control">
                        <span class="select is-fullwidth">
                            <select name="" id="" v-model="gender" class="input is-info" required="">
                                <option selected="" value="">Select Gender</option>
                                <option value="1">
                                    Male (
                                    पुरुष) </option>
                                <option value="2">
                                    Female (
                                    महिला) </option>
                                <option value="3">
                                    Transgender (
                                    ट्रांसजेंडर) </option>
                            </select>
                        </span>
                    </div>
                </div>
                <app-address></app-address>
                <div class="field">
                    <label class="label">Pincode</label>
                    <div class="control">
                        <input class="input" type="number" placeholder="Pincode" minlength="6" maxlength="6" required="">
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
            <div class="field">
                <label class="label">Aadhaar No.</label>
                <div class="control">
                    <input class="input" type="text" placeholder="Aadhaar No.">
                </div>
            </div>
            <div class="field">
                <label class="label">PAN No.</label>
                <div class="control">
                    <input class="input" type="text" placeholder="PAN No.">
                </div>
            </div>

            <div class="field">
                <label class="label">Driving License No.</label>
                <div class="control">
                    <input class="input" type="text" placeholder="Driving License No.">
                </div>
            </div>
            <div class="field">
                <label class="label">Voter ID</label>
                <div class="control">
                    <input class="input" type="text" placeholder="Voter ID">
                </div>
            </div>

            <p class="title is-5">Address Information</p>
            <label class="label">Upload Photo</label>
            <ImagePreview v-on:imageData="pic = $event"></ImagePreview>
            
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
import Address from './Address.vue'
import ImagePreview from './ImagePreview.vue'
export default {
    name: 'SmartAdd',
    data() {
        return {
            name: 'Smart Add',
            userData: '',
            fullname: '',
            fathername: '',
            gender: '',
            agree: '',
            dob: '',
            pic: '',
            signature: '',
            idproof: '',
            disclaimer: ''
        }
    },
    components: {
        ImagePreview,
        'app-address': Address,
    },
    mounted: function() {
        this.$emit("loaded", false);
        // this.userData = this.$store.getters.getUser;
    },
    methods: {
        list: function() {


        },
    }
}
</script>