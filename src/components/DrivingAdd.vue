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
                <form action="">
                    <div class="field">
                        <label class="label">Full Name (पूरा नाम) *</label>
                        <div class="control">
                            <input v-model="fullname" class="input" type="text" placeholder="Full Name" required="">
                        </div>
                        <p class="help is-danger" v-show="!fullname">Please fill this field</p>
                    </div>
                    <div class="field">
                        <label class="label">Son/Daughter/Wife of (पिता/पति का नाम) *</label>
                        <div class="control">
                            <input v-model="guardian" class="input" type="email" placeholder="Father's Name" required="">
                        </div>
                        <p class="help is-danger" v-show="!guardian">Please fill this field</p>
                    </div>
                    <div class="field">
                        <label class="label">Date of Birth (जन्म तिथि) *</label>
                        <div class="control">
                            <v-date-picker :locale="{masks:{title:'MMM YYYY', L:'DD-MM-YYYY'}}" v-model="dob" color="blue" :max-date="new Date()" :input-props="{class:'input is-info', readonly: 'true'}" is-dark is-required is-expanded />
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Date of Issue (जारी करने की तिथि) *</label>
                        <div class="control">
                            <v-date-picker :locale="{masks:{title:'MMM YYYY', L:'DD-MM-YYYY'}}" v-model="dateofissue" color="blue" :max-date="new Date()" :input-props="{class:'input is-info', readonly: 'true'}" is-dark is-required is-expanded />
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Validity (वैद्यता)*</label>
                        <div class="control">
                            <v-date-picker :locale="{masks:{title:'MMM YYYY', L:'DD-MM-YYYY'}}" v-model="validity" color="blue" :min-date="new Date()" :input-props="{class:'input is-info', readonly: 'true'}" is-dark is-required is-expanded />
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Driving Licence No. *</label>
                        <div class="control">
                            <input v-model="drivingno" class="input" type="text" placeholder="Driving Licence No." required="">
                        </div>
                        <p class="help is-danger" v-show="!drivingno">Please fill this field</p>
                    </div>
                    <div class="field ">
                        <label class="label">Driving Licence Type *</label>
                        <div class="control">
                            <div class="select is-multiple">
                                <select v-model="drivingtype" multiple="" size="4" required="">
                                    <!-- <option>Type</option> -->
                                    <option value="MC50CC">MC 50CC (Motorcycle 50cc)</option>
                                    <option value="MCEX50CC">MC EX50CC (Motorcycle more than 50cc) </option>
                                    <option value="FVG">FVG—Motorcycles</option>
                                    <option value="MCWG">M/CYCL.WG (Motorcycle With Gear)</option>
                                    <option value="LMV">LMV (Light Motor Vehicle)</option>
                                    <option value="LMVNT">LMV-NT (Light Motor Vehicle—Non Transport)</option>
                                    <option value="LMVTR">LMV-TR (Light Motor Vehicle—Transport)</option>
                                    <option value="HMV">HMV (Heavy Motor Vehicle)</option>
                                    <option value="HPMV">HPMV (Heavy Passenger Motor Vehicle)</option>
                                    <option value="HTV">HTV (Heavy Transport Vehicle)</option>
                                    <option value="TRAILER">TRAILER </option>
                                </select>
                            </div>
                        </div>
                        <p class="help" v-bind:class="{'is-danger': drivingtype.length==0}" v-text="drivingtype.length ? drivingtype : 'Fill this field'"> </p>
                    </div>
                    <div class="field">
                        <label class="label">Comment</label>
                        <div class="control">
                            <textarea v-model="comment" class="textarea" rows="2" placeholder="Comments"></textarea>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Address (पता) *</label>
                        <div class="control">
                            <textarea v-model="address" class="textarea" rows="2" placeholder="Address (पता)"></textarea>
                        </div>
                    </div>
                    <address-fields></address-fields>
                    <div class="field">
                        <label class="label">Pincode (पिन कोड) *</label>
                        <div class="control">
                            <input class="input" v-model="pincode" type="number" placeholder="Pincode" minlength="6" maxlength="6">
                        </div>
                    </div>
                    <div class="field">
                        <label class="checkbox"><input type="checkbox" v-model="agree" required="required" aria-required="true"> I will be responsible for details entered in this form.</label>
                    </div>
                </form>
            </div>
        </div>
        <div v-show="agree" class="box is-primary ">
            <!-- <p class="title is-5">Upload images</p> -->
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
import AddressFields from './Address.vue'
import ImagePreview from './ImagePreview.vue'
export default {
    name: 'DrivingAdd',
    data() {
        return {
            name: 'Driving Licence Add',
            userData: '',
            fullname: '',
            fathername: '',
            agree: '',
            dob: '',
            drivingtype: '',
            dateofissue: '',
            pic: '',
            pincode: '',
            signature: '',
            idproof: '',
            disclaimer: ''
        }
    },
    components: {
        AddressFields,
        ImagePreview
    },
    mounted: function() {
        this.$emit("loaded", false);
        this.userData = this.$store.getters.getUser;
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