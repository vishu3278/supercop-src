<template>
    <div>
        <div v-show="userData">
            <div class="box is-radiusless has-background-link has-text-white">
                <div class="buttons">
                    <a href="#!" class="button is-fullwidth" onclick="scanQR()">Scan Card</a>
                    <a href="#!" class="button is-inverted is-outlined is-fullwidth" v-on:click="showData()">Show Data</a>
                </div>
            </div>
        </div>
        <div class="box" v-show="!userData">
            <router-link to="/" class="button is-fullwidth is-warning">Login Again</router-link>
        </div>
        <div v-show="xmldata && !response">
            <div class="card ">
                <div class="card-header">
                    <p class="card-header-title has-text-info">Convert Language </p>
                    <a href="#" class="card-header-icon" aria-label="more options">
                        <span class="icon"><i class="las la-language"></i></span>
                    </a>
                </div>
                <div class="card-content">
                    <table class="table is-striped is-fullwidth" style="font-size:14px;">
                        <tr v-for="(value, name, index) in xmldata" v-bind:key="name">
                            <td>{{index}}</td>
                            <th>{{name}}</th>
                            <td>{{value}}</td>
                        </tr>
                    </table>
                    <label>Select Language</label>
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
                            <button class="button is-info " v-on:click="changeLang()">Convert</button>
                        </div>
                    </div>
                    <div class="field">
                        <label>Name </label>
                        <div class="control">
                            <input type="text" class="input is-info" v-model="xmldata.name" readonly="">
                        </div>
                    </div>
                    <div class="field">
                        <label>नाम </label>
                        <div class="control">
                            <input type="text" class="input is-info" v-model="full_name_hi">
                        </div>
                    </div>
                    <label>Parent Name</label>
                    <div class="field has-addons">
                        <div class="control">
                            <span class="select">
                                <select v-model="getCo.pType" class="input is-info">
                                    <option>Type</option>
                                    <option value="C/O">C/O</option>
                                    <option value="D/O">D/O</option>
                                    <option value="S/O" selected="">S/O</option>
                                    <option value="W/O">W/O</option>
                                </select>
                            </span>
                        </div>
                        <div class="control is-expanded">
                            <input type="text" class="input is-info" v-model="xmldata.gname" readonly="">
                        </div>
                    </div>
                    <div class="field ">
                        <label>माता पिता का नाम (अभिभावक)</label>
                        <div class="control is-expanded">
                            <input type="text" class="input is-info" v-model="parent_name_hi">
                        </div>
                    </div>
                    <div class="field">
                        <label>Address</label>
                        <div class="control">
                            <textarea class="textarea is-info" v-model="full_address" rows="2" readonly=""></textarea>
                        </div>
                    </div>
                    <div class="field">
                        <label>पता</label>
                        <div class="control">
                            <textarea class="textarea is-info" v-model="address_line_hi" rows="2"></textarea>
                        </div>
                    </div>
                    <div class="field">
                        <label>District</label>
                        <div class="control">
                            <input type="text" class="input is-info" v-model="xmldata.dist" readonly="">
                        </div>
                    </div>
                    <div class="field">
                        <label>जिला</label>
                        <div class="control">
                            <input type="text" class="input is-info" v-model="district_hi">
                        </div>
                    </div>
                    <div class="field">
                        <label>Block</label>
                        <div class="control">
                            <input type="text" class="input is-info" v-model="xmldata.subdist" readonly="">
                        </div>
                    </div>
                    <div class="field" v-show="xmldata.dist!=xmldata.subdist">
                        <label>खंड</label>
                        <div class="control">
                            <input type="text" class="input is-info" v-model="block_hi">
                        </div>
                    </div>
                    <div class="field">
                        <label>Date of Birth</label>
                        <div class="control">
                            <input type="text" class="input is-info" v-model="xmldata.dob" readonly="">
                        </div>
                    </div>
                    <input type="hidden" id="genderInput" v-model="getGender">
                    <input type="hidden" id="pTypeInput" v-model="getCo.pType">
                    <input type="hidden" id="coInput" v-model="getCo.co">
                </div>
            </div>
        </div>
        <div v-show="!response && address_line_hi">
            <div class="card">
                <div class="card-header">
                    <p class="card-header-title has-text-success">Upload Image</p>
                    <a href="#" class="card-header-icon" aria-label="more options">
                        <span class="icon"><i class="las la-image"></i></span>
                    </a>
                </div>
                <div class="card-content">
                    <image-preview v-on:imageData="base64Photo = $event"></image-preview>
                    <div class="buttons has-addons" v-show="qrdata">
                        <button class="button" v-on:click="clearData()">Clear</button>
                        <button class="button is-success is-expanded" v-bind:class="{'is-loading':submitting}" v-on:click="submitData()">Submit</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="message is-danger" v-show="errors.length>0">
            <div class="message-body">
                <ul>
                    <li v-for="err in errors" v-bind:key="err">{{err}}</li>
                </ul>
            </div>
        </div>
        <br>
        <p class="has-text-centered has-text-weight-light">copyright &copy; 2020</p>
        <br>
    </div>
</template>
<script>
import axios from 'axios'
// import { mapGetters } from 'vuex'
import ImagePreview from './ImagePreview.vue'
export default {
    data() {
        return {
            name: "About user",
            // userData: this.$route.params.user,
            userData: '',
            imgBaseUrl: "https://thesupercop.com/workspace/dist/img/users/",
            qrdata: '',
            xmldata: '',
            full_address: '',
            language: 'hi',
            full_name_hi: '',
            parent_type: '',
            care_of: '',
            parent_name: '',
            parent_name_hi: '',
            address_line_hi: '',
            district_hi: '',
            block_hi: '',
            gender: '',
            imgName: '',
            base64Photo: '',
            errors: [],
            submitting: false,
            response: '',
            wallet: '',
            progress: 0
        }
    },
    components: { ImagePreview },
    mounted: function() {
        // window.sessionStorage.setItem('user', JSON.stringify(this.$route.params.user));
        window.sessionStorage.removeItem('response');
        this.$emit("loaded", false);
        window.sessionStorage.setItem('QRCODE', '<?xml version="1.0" encoding="UTF-8"?> <PrintLetterBarcodeData uid="360979299510" name="My Card" gender="F" yob="1998" gname="Demo Card" co="S/O Demo Card" house="555 House" street="Street 15" lm="Lane 48" loc="Locality" vtc="what  is this" po="Post Office" dist="Baghpat" subdist="Binauli" state="Uttar Pradesh" pc="247001" dob="13/08/1998"/>');
        // window.sessionStorage.setItem('QRCODE', '<?xml version="1.0" encoding="UTF-8"?> <PrintLetterBarcodeData uid="360979299510" name="Deepak Kumar" gender="M" yob="1995" gname="Prakash Kumar" co="S/O Prakash Kumar" house="135 Pratap Nagar" street="Gali 19" lm="Shanti Nagar" loc="Sikandarpur" vtc="" po="Sadar Bazar" dist="Shamli" subdist="Shamli" state="Uttar Pradesh" pc="110042" dob="13/08/1995"/>');
        // this.userData = JSON.parse(window.sessionStorage.getItem("user"));
        this.userData = this.$store.getters.getUser;
        if (!this.userData) {
            this.$router.push({ name: 'Home' });
        } else {
            this.$emit('userData', this.userData)
        }

    },
    computed: {
        // ...mapGetters(['getUser']),
        
        getGender: function() {
            let gender;
            if (this.xmldata.gender == "M") {
                gender = "1";
            } else if (this.xmldata.gender == "F") {
                gender = "2";
            } else {
                gender = "3";
            }
            return gender;
        },
        getCo: function() {
            let co = '',
                pType = '';
            if (this.xmldata.co) {
                co = (this.xmldata.co.replace(/^[cCsSdDwW]\/[oO]/, '')).trim();
                pType = (this.xmldata.co.match(/^[cCsSdDwW]\/[oO]/))[0];
            }
            console.log(co, pType);
            return { "pType": pType, "co": co };
        }
    },
    methods: {
        clearData: function() {
            Object.assign(this.$data, this.$options.data());
            window.sessionStorage.removeItem("QRCODE");
            this.userData = JSON.parse(window.sessionStorage.getItem("user"));
            this.response = JSON.parse(window.sessionStorage.getItem("response"));
        },
        /*loadImageFileAsURL: function() {
            let filesSelected = document.getElementById("inputFileToLoad").files;
            this.imgName = filesSelected[0].name;
            if (filesSelected.length > 0) {
                let fileReader = new FileReader();
                fileReader.onloadend = function() {
                    document.getElementById("imgPreview").src = fileReader.result
                };
                fileReader.readAsDataURL(filesSelected[0]);
            }
        },*/
        changeLang: function() {
            this.parent_name = document.getElementById("coInput").value;

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

            translate(this.language, this.xmldata.name).then((result) => {
                this.full_name_hi = result;
            });

            translate(this.language, this.parent_name).then((result) => {
                this.parent_name_hi = result;
            });

            translate(this.language, this.full_address).then((result) => {
                this.address_line_hi = result;
            });

            translate(this.language, this.xmldata.dist).then((result) => {
                this.district_hi = result;
            });
            if (this.xmldata.subdist != this.xmldata.dist) {
                translate(this.language, this.xmldata.subdist).then((result) => {
                    this.block_hi = result;
                });
            }
        },
        showData: function() {
            if (window.sessionStorage.getItem('QRCODE')) {
                this.errors = [];
                this.qrdata = window.sessionStorage.getItem('QRCODE');
                var parser = new DOMParser();
                var xmlDoc = parser.parseFromString(this.qrdata, "text/xml");
                var xml = xmlDoc.getElementsByTagName('PrintLetterBarcodeData')[0];

                var obj = {};
                for (var j = 0; j < xml.attributes.length; j++) {
                    var attribute = xml.attributes.item(j);
                    obj[attribute.nodeName] = attribute.nodeValue;
                }
                this.xmldata = obj;
                this.full_address = (this.xmldata.house ? this.xmldata.house : '') + ' ' + (this.xmldata.street ? this.xmldata.street : '') + ' ' + (this.xmldata.loc ? this.xmldata.loc : '') + ' ' + (this.xmldata.lm ? this.xmldata.lm : '') + ' ' + (this.xmldata.vtc ? this.xmldata.vtc : '') + ' ' + (this.xmldata.po ? this.xmldata.po : '');
            } else {
                this.errors.push("Please Scan QR code to show data.")
            }
        },
        submitData: function() {
            this.submitting = true;
            let parent_type = document.getElementById("pTypeInput").value;
            let co = document.getElementById("coInput").value;
            // let imgData = document.getElementById("imgPreview").src;
            let gender = document.getElementById("genderInput").value;
            let submit_data = JSON.stringify({
                "_action": "YWFkYWRoYXI=",
                "userUniqueID": this.userData.userUniqueID,
                "full_name_en": this.xmldata.name,
                "full_name_hi": this.full_name_hi,
                "birth_date": this.xmldata.dob.replace(/\//gi, '-'),
                "gender": gender,
                "aadhaar_number": this.xmldata.uid,
                "parent_type": parent_type,
                "parent_name_en": co,
                "parent_name_hi": this.parent_name_hi,
                "address_line_en": this.full_address,
                "address_line_hi": this.address_line_hi,
                "address_state": this.xmldata.state,
                "address_district": this.xmldata.dist,
                "address_district_hi": this.district_hi,
                "address_block": (this.xmldata.subdist != this.xmldata.dist) ? this.xmldata.subdist : '',
                "address_block_hi": this.block_hi,
                "address_pincode": this.xmldata.pc,
                "base64Photo": this.base64Photo
            })
            console.log(submit_data);
            axios.post('https://thesupercop.com/webapis/aadharcard.php', submit_data)
                .then((response) => {
                    if (response.data.status == 1) {
                        // this.response = response.data;
                        window.sessionStorage.setItem("response", JSON.stringify(response.data));
                        this.clearData();
                        this.errors = [];
                        let wait = setInterval(() => {
                            this.progress += 10
                            if (this.progress >= 100) {
                                clearInterval(wait);
                                this.$router.push({ name: 'Home' });
                            }
                        }, 250);
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
<style>
</style>