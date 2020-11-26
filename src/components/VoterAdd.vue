<template>
    <div>
        <div class="card ">
            <div class="card-header has-background-info-light">
                <div class="card-header-icon has-text-info">
                    <span class="icon"><i class="las la-portrait" aria-hidden="true"></i></span>
                </div>
                <p class="card-header-title has-text-info-dark">{{componentTitle}} </p>
            </div>
            <div class="card-content">
                <form action="">
                    <p class="help">Hindi fields will be translated</p>
                    <div class="field">
                        <label class="label">Name </label>
                        <div class="control">
                            <input type="text" class="input is-info" v-model="name" required="">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">नाम </label>
                        <div class="control">
                            <input type="text" class="input is-info" v-model="full_name_hi" required="">
                        </div>
                    </div>
                    <label class="label">Parent Type &amp; {{parent_type}} Name</label>
                    <div class="field has-addons">
                        <div class="control">
                            <span class="select">
                                <select v-model="parent_type" class="input is-info" required="">
                                    <!-- <option selected="" value="">P Type</option> -->
                                    <option value="Father">Father</option>
                                    <option value="Husband">Husband</option>
                                </select>
                            </span>
                        </div>
                        <div class="control is-expanded">
                            <input type="text" class="input is-info" v-model="parent_name" required="">
                        </div>
                    </div>
                    <div class="field ">
                        <label class="label" v-text="parent_type == 'Father' ? 'पिता का नाम' : 'पति का नाम'">पिता का नाम / पति का नाम *</label>
                        <div class="control is-expanded">
                            <input type="text" class="input is-info" v-model="parent_name_hi" required="">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Date of Birth</label>
                        <div class="control">
                            <v-date-picker :locale="{masks:{title:'MMM YYYY', L:'DD-MM-YYYY'}}" v-model="dob" color="blue" :max-date="new Date()" :input-props="{class:'input is-info', 'readonly':'true'}" is-required />
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Gender</label>
                        <div class="control">
                            <span class="select is-fullwidth">
                                <select name="" id="" v-model="gender" class="input is-info">
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
                    <div class="field">
                        <label class="label">Address</label>
                        <div class="control">
                            <textarea class="textarea is-info" v-model="full_address" rows="2" required=""></textarea>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">पता</label>
                        <div class="control">
                            <textarea class="textarea is-info" v-model="full_address_hi" rows="2" required=""></textarea>
                        </div>
                    </div>
                    <address-fields></address-fields>
                    <div class="field">
                        <label class="label">Thana/Tehsil *</label>
                        <div class="control">
                            <input type="text" class="input is-info" v-model="block_hi">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">थाना/तहसील *</label>
                        <div class="control">
                            <input type="text" class="input is-info" v-model="district_hi">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Pincode</label>
                        <div class="control">
                            <input type="number" class="input is-info" v-model="pincode" required="" minlength="6" maxlength="6">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Date </label>
                        <div class="control">
                            <v-date-picker :locale="{masks:{title:'MMM YYYY', L:'DD-MM-YYYY'}}" v-model="date" color="blue" :max-date="new Date()" :input-props="{class:'input is-info', 'readonly':'true'}" is-required />
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Voter ID Number</label>
                        <div class="control"><input type="text" class="input is-info" v-model="voterid" required=""></div>
                    </div>
                    <div class="field">
                        <label class="label">Comment</label>
                        <div class="control">
                            <textarea class="textarea is-info" v-model="comment" rows="2"></textarea>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Assembly Constituency No. (विधान सभा निर्वाचन संख्या) *</label>
                        <div class="control">
                            <input type="number" class="input is-info" v-model="constno" required="" >
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Assembly Constituency Name *</label>
                        <div class="control"><input type="text" class="input is-info" v-model="constname" required=""></div>
                    </div>
                    <div class="field">
                        <label class="label">विधान सभा निर्वाचन नाम *</label>
                        <div class="control"><input type="text" class="input is-info" v-model="constname_hi" required=""></div>
                    </div>
                    <div class="field">
                        <label class="label">Part No. (भाग संख्या) *</label>
                        <div class="control">
                            <input type="number" class="input is-info" v-model="partno" required="" >
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Part Name *</label>
                        <div class="control"><input type="text" class="input is-info" v-model="partname" required=""></div>
                    </div>
                    <div class="field">
                        <label class="label">भाग नाम *</label>
                        <div class="control"><input type="text" class="input is-info" v-model="partname_hi" required=""></div>
                    </div>
                    <div class="field">
                        <label class="checkbox"><input type="checkbox" v-model="agree" required="required" aria-required="true"> I will be responsible for details entered in this form.</label>
                    </div>
                </form>
            </div>
        </div>
        <div v-show="agree" class="box">
            <div class="field">
                <label class="label">Profile Image *</label>
                <image-preview v-on:imageData="profilePic = $event"></image-preview>
            </div>
            <div class="field">
                <label class="label">Upload ID Proof *</label>
                <image-preview v-on:imageData="idproof = $event"></image-preview>
            </div>
            <div class="field">
                <label class="label">Upload Disclaimer *</label>
                <image-preview v-on:imageData="disclaimer = $event"></image-preview>
            </div>
            <div class="field">
                <label class="label">Upload Authority Signature *</label>
                <image-preview v-on:imageData="authsignature = $event"></image-preview>
            </div>
            <div class="buttons has-addons">
                <button class="button" v-on:click="clearData()">Clear</button>
                <button class="button is-success is-expanded" v-bind:class="{'is-loading':submitting}" v-on:click="submitData()">Submit</button>
            </div>
        </div>
        <div class="message is-danger" v-show="errors.length>0">
            <div class="message-body">
                <ul>
                    <li v-for="(err, index) in errors" v-bind:key="index">{{index}} - {{err}}</li>
                </ul>
            </div>
        </div>
        <div class="box">
            <div class="message is-success" v-if="response">
                <div class="message-body">
                    <p>{{response.message}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import AddressFields from './Address.vue'
import ImagePreview from './ImagePreview.vue'
export default {
    name: 'VoterAdd',
    data() {
        return {
            componentTitle: 'Add Voter Card',
            name: '',
            userData: '',
            language: 'hi',
            full_name_hi: '',
            parent_type: '',
            parent_name: '',
            parent_name_hi: '',
            full_address: '',
            full_address_hi: '',
            state: '',
            stateid: '',
            districtList: [],
            districtid: '',
            district: '',
            district_hi: '',
            blockList: [],
            blockid: '',
            block: '',
            block_hi: '',
            pincode: '',
            dob: '',
            gender: '',
            uid: '',
            agree: false,
            idproof: '',
            profilePic: '',
            disclaimer:'',
            authsignature: '',
            errors: [],
            submitting: false,
            response: '',
        }
    },
    components: { AddressFields, ImagePreview },
    mounted: function() {
        window.sessionStorage.removeItem('response');
        this.$emit("loaded", false);
        this.userData = this.$store.getters.getUser;
    },
    computed: {
        setDate: function() {
            let formattedDate = ('0' + this.dob.getDate()).slice(-2) + '-' + ('0' + (this.dob.getMonth() + 1)).slice(-2) + '-' + this.dob.getFullYear();
            console.log(formattedDate);
            return formattedDate;
        },

    },
    methods: {
        validate: function(event) {
            let el = event.target.attributes;
            console.log(el[1]);
            // return event.target.value;
        },
        fetchDistrict: function(event) {
            this.state = event.target.selectedOptions[0].dataset.state;
            // console.log(event);
            this.districtList = [];
            this.blockList = [];
            if (this.stateid) {
                let stateData = JSON.stringify({ state: this.stateid });
                axios.post('https://thesupercop.com/webapis/stateAjax.php', stateData)
                    .then((response) => {
                        if (response.status == 200) {
                            // console.log(response);
                            if (response.data.status == 1) {
                                console.log(response.data.district)
                                this.districtList = response.data.district;
                                // this.stateError.district = '';
                            } else {
                                // this.stateError.district = response.data.message
                            }
                        } else {
                            // this.stateError.district = response.statusText;
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            } else {
                // this.stateError.district = ""
            }
        },
        fetchBlock: function(event) {
            this.district = event.target.selectedOptions[0].dataset.dist;
            this.district_hi = event.target.selectedOptions[0].dataset.disthindi;
            this.blockList = [];
            if (this.districtid) {
                let districtData = JSON.stringify({ district: this.districtid });
                axios.post('https://thesupercop.com/webapis/stateAjax.php', districtData)
                    .then((response) => {
                        if (response.status == 200) {
                            // console.log(response);
                            if (response.data.status == 1) {
                                console.log(response.data.block)
                                this.blockList = response.data.block;
                            } else {
                                // console.warn(response.data.message)
                                // this.stateError.block = response.data.message
                            }
                        } else {
                            // this.stateError.block = response.statusText;
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            } else {
                // this.stateError.block = ""
            }
        },
        changeBlock: function(event) {
            this.block = event.target.selectedOptions[0].dataset.block;
            this.block_hi = event.target.selectedOptions[0].dataset.blockhindi;
        },
        clearData: function() {
            Object.assign(this.$data, this.$options.data());
            // window.sessionStorage.removeItem("QRCODE");
            this.userData = JSON.parse(window.sessionStorage.getItem("user"));
            this.response = JSON.parse(window.sessionStorage.getItem("response"));
        },
        loadImageFileAsURL: function() {
            let filesSelected = document.getElementById("inputFileToLoad").files;
            this.imgName = filesSelected[0].name;
            if (filesSelected.length > 0) {
                const fsize = filesSelected[0].size;
                const file = Math.round((fsize / 1024));
                // The size of the file. 
                if (file >= 200) {
                    alert("File too Big, please select a file less than 200kb");
                } else if (file < 10) {
                    alert("File too small, please select a file greater than 10kb");
                } else {
                    this.errors.push(file + 'kb');
                    let fileReader = new FileReader();
                    fileReader.onloadend = function() {
                        document.getElementById("imgPreview").src = fileReader.result
                    };
                    fileReader.readAsDataURL(filesSelected[0]);
                }
            }
        },
        changeLang: function() {
            function translate(translateTo, text, translateFrom = 'auto') {
                return new Promise((resolve, reject) => {
                    const url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" +
                        translateFrom + "&tl=" + translateTo + "&dt=t&q=" + encodeURI(text);

                    fetch(url).then(response => {
                        response.json().then(data => {
                            resolve(data[0][0][0]);
                            /*alert(data[0][0][0]);*/
                        }, reject)
                    }, reject)
                });
            }

            translate(this.language, this.name).then((result) => {
                this.full_name_hi = result;
            });

            translate(this.language, this.parent_name).then((result) => {
                this.parent_name_hi = result;
            });

            translate(this.language, this.full_address).then((result) => {
                this.full_address_hi = result;
            });

            /*if (this.district) {
                translate(this.language, this.district).then((result) => {
                    this.district_hi = result;
                });
            }
            if (this.block) {
                if (this.block != this.district) {
                    translate(this.language, this.block).then((result) => {
                        this.block_hi = result;
                    });
                }else{
                    this.block_hi = this.district_hi;
                }
            }*/
        },
        submitData: function() {
            this.submitting = true;

            let imgData = document.getElementById("imgPreview").src;
            let submit_data = JSON.stringify({
                "_action": "YWFkYWRoYXI=",
                "userUniqueID": this.userData.userUniqueID,
                "full_name_en": this.name,
                "full_name_hi": this.full_name_hi,
                "birth_date": this.setDate,
                "gender": this.gender,
                "aadhaar_number": this.uid,
                "parent_type": this.parent_type,
                "parent_name_en": this.parent_name,
                "parent_name_hi": this.parent_name_hi,
                "address_line_en": this.full_address,
                "address_line_hi": this.full_address_hi,
                "address_state": this.state,
                "address_district": this.district,
                "address_district_hi": this.district_hi,
                "address_block": this.block,
                "address_block_hi": this.block_hi,
                "address_pincode": this.pincode,
                "base64Photo": imgData
            })

            axios.post('https://thesupercop.com/webapis/aadharcard.php', submit_data)
                .then((response) => {
                    if (response.data.status == 1) {
                        // this.response = response.data;
                        window.sessionStorage.setItem("response", JSON.stringify(response.data));
                        this.clearData();
                        this.errors = [];
                        setTimeout(function() {
                            this.response = '';
                        }, 4500)
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
        }
    }
}
</script>