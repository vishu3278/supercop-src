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
                <form action="" v-on:submit.prevent="submitData">
                    <div class="notification is-warning is-light p-2">
                        Hindi fields will be translated by clicking the "Translate" button. You can fill your translated text in the field.
                    </div>
                    <div class="field">
                        <label class="label">Voter ID Number*</label>
                        <div class="control"><input type="text" class="input is-info" v-model="voterid" required=""></div>
                    </div>
                    <div class="field">
                        <label class="label">Date of Birth*</label>
                        <div class="control">
                            <v-date-picker :locale="{masks:{title:'MMM YYYY', L:'DD-MM-YYYY'}}" v-model="dob" color="blue" :max-date="new Date()" :input-props="{class:'input is-info', 'readonly':'true', 'required':''}" is-required />
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Address*</label>
                        <div class="control">
                            <textarea class="textarea is-info" v-model="address_line_en" rows="2" required=""></textarea>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">पता*</label>
                        <div class="control">
                            <textarea class="textarea is-info" v-model="address_line_hi" rows="2" required=""></textarea>
                        </div>
                        <p class="help">Language will be translated</p>
                    </div>
                    <!-- <address-fields></address-fields> -->
                    <div class="field">
                        <label class="label">Thana/Tehsil*</label>
                        <div class="control">
                            <input type="text" class="input is-info" v-model="thana">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">थाना/तहसील*</label>
                        <div class="control">
                            <input type="text" class="input is-info" v-model="thana_hi">
                        </div>
                        <p class="help">Language will be translated</p>
                    </div>
                    <div class="field">
                        <label class="label">State*</label>
                        <div class="control">
                            <select class="input is-info" v-model="stateid" placeholder="State (राज्य) " required="">
                                <option value="">Select State</option>
                                <option value="485">Andaman and Nicobar (अण्डमान और निकोबार) </option>
                                <option value="486">Andhra Pradesh (आंध्र प्रदेश) </option>
                                <option value="487">Arunachal Pradesh (अरुणाचल प्रदेश) </option>
                                <option value="488">ASSAM (অসম ) </option>
                                <option value="489">Bihar (बिहार) </option>
                                <option value="490">Chandigarh (चंडीगढ़) </option>
                                <option value="491">Chhattisgarh (छत्तीसगढ़) </option>
                                <option value="492">Dadra and Nagar Haveli (दादरा और नगर हवेली) </option>
                                <option value="493">Daman and Diu (दमन और दीव) </option>
                                <option value="494">Delhi (दिल्ली) </option>
                                <option value="495">Goa (गोवा) </option>
                                <option value="496">Gujarat ( ગુજરાત) </option>
                                <option value="497">Haryana (हरियाणा) </option>
                                <option value="498">Himachal Pradesh (हिमाचल प्रदेश) </option>
                                <option value="499">Jammu and Kashmir (जम्मू और कश्मीर) </option>
                                <option value="500">Jharkhand (झारखंड) </option>
                                <option value="501">Karnataka (कर्नाटक) </option>
                                <option value="502">Kerala (केरल) </option>
                                <option value="503">Lakshadweep (लक्षद्वीप) </option>
                                <option value="504">Madhya Pradesh (मध्य प्रदेश) </option>
                                <option value="505">Maharashtra (महाराष्ट्र) </option>
                                <option value="506">Manipur (मणिपुर) </option>
                                <option value="507">Meghalaya (मेघालय) </option>
                                <option value="508">Mizoram (मिजोरम) </option>
                                <option value="509">Nagaland (नगालैंड) </option>
                                <option value="510">Orissa (ओडिशा) </option>
                                <option value="511">Pondicherry (पांडिचेरी) </option>
                                <option value="512">Punjab (ਪੰਜਾਬ) </option>
                                <option value="513">Rajasthan (राजस्थान) </option>
                                <option value="514">Sikkim (सिक्किम) </option>
                                <option value="515">Tamil Nadu (तमिलनाडु) </option>
                                <option value="522">Telangana (तेलंगाना) </option>
                                <option value="516">Tripura (त्रिपुरा) </option>
                                <option value="517">Uttar Pradesh (उत्तर प्रदेश) </option>
                                <option value="518">Uttarakhand (उत्तराखंड) </option>
                                <option value="519">West Bengal (पश्चिम बंगाल) </option>
                            </select>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Pincode*</label>
                        <div class="control">
                            <input type="number" class="input is-info" v-model="pincode" required="" minlength="6" maxlength="6">
                        </div>
                    </div>
                    <label class="label">Select Language</label>
                    <div class="field has-addons">
                        <div class="control is-expanded">
                            <div class="select is-info is-fullwidth">
                                <select v-model="language">
                                    <option value="hi" selected="">Hindi</option>
                                    <option value="pa">Punjabi</option>
                                    <option value="gu">Gujrati</option>
                                    <option value="mr">Marathi</option>
                                    <option value="ta">Tamil</option>
                                    <option value="kn">Kannada</option>
                                    <option value="bn">Bengali</option>
                                    <option value="te">Telugu</option>
                                    <option value="sd">Sindhi</option>
                                </select>
                            </div>
                        </div>
                        <div class="control">
                            <button class="button is-info " v-on:click.prevent="changeLang()">Translate</button>
                        </div>
                    </div>
                    <div v-show="translateError.length>0">
                        <span class="tag is-danger is-light" v-for="err in translateError" :key="err" v-text="err"></span>
                    </div>
                    <div class="field">
                        <label class="label">Profile Image*</label>
                        <image-preview imgId="voter_pic" v-on:imageData="profilePic = $event"></image-preview>
                    </div>
                    <!-- <div class="field">
                        <label class="label">Upload ID Proof*</label>
                        <image-preview imgId="voter_proof" v-on:imageData="idproof = $event"></image-preview>
                    </div> -->
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
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
// import AddressFields from './Address.vue'
import ImagePreview from './ImagePreview.vue'
export default {
    name: 'VoterAdd',
    data() {
        return {
            componentTitle: 'Add Voter Card',
            userData: '',
            language: 'hi',
            address_line_en: '',
            address_line_hi: '',
            thana: '',
            thana_hi: '',
            stateid: '',
            pincode: '',
            dob: '',
            voterid: '',
            agree: false,
            profilePic: '',
            idproof: '',
            errors: [],
            translateError: [],
            submitting: false,
            response: '',
        }
    },
    components: { /*AddressFields,*/ ImagePreview },
    mounted: function() {
        window.sessionStorage.removeItem('response');
        this.$emit("loaded", false);
        this.userData = this.$store.getters.getUser;
    },
    computed: {
        setDate: function() {
            let formattedDate = this.dob.getFullYear() + '-' + ('0' + (this.dob.getMonth() + 1)).slice(-2) + '-' + ('0' + this.dob.getDate()).slice(-2);
            // console.log(formattedDate);
            return formattedDate;
        }
    },
    methods: {
        validate: function(event) {
            let el = event.target.attributes;
            console.log(el[1]);
            // return event.target.value;
        },
        clearData: function() {
            Object.assign(this.$data, this.$options.data());
            // window.sessionStorage.removeItem("QRCODE");
            this.userData = JSON.parse(window.sessionStorage.getItem("user"));
            this.response = JSON.parse(window.sessionStorage.getItem("response"));
        },
        changeLang: function() {
            let self = this;

            function translate(translateTo, text, translateFrom = 'auto') {
                if (text == '' || text == null) {
                    self.translateError.push("Empty field " + text + " not allowed");
                } else {
                    self.translateError = [];
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
            }

            translate(this.language, this.thana).then((result) => {
                this.thana_hi = result;
            });

            translate(this.language, this.address_line_en).then((result) => {
                this.address_line_hi = result;
            });
        },
        submitData: function() {
            if (this.profilePic == '') {
                this.errors.push("Upload photo")
            } else {

                this.submitting = true;

                let submit_data = JSON.stringify({
                    "_action": "dm90ZXItYWRk",
                    "userUniqueID": this.userData.userUniqueID,
                    "birth_day": this.setDate,
                    "voterid_number": this.voterid,
                    "address_line_en": this.address_line_en,
                    "address_line_hi": this.address_line_hi,
                    "address_state_id": this.stateid,
                    "thana": this.thana,
                    "thana_hi": this.thana_hi,
                    "address_pincode": this.pincode,
                    "base64Photo": { "photo": this.profilePic }
                })

                axios.post('https://thesupercop.com/webapis/v2/cards.php', submit_data)
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
}
</script>