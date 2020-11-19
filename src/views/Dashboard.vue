<template>
    <div>
        <div v-show="userData">
            <div class="box m-0 is-radiusless has-background-link has-text-white">
                <div class="media">
                    <figure class="media-left">
                        <p class="image is-64x64">
                            <img v-bind:src="'https://thesupercop.com/workspace/dist/img/users/'+userData.photo" style="width:64px;height:64px; object-fit:contain;" alt="">
                        </p>
                    </figure>
                    <div class="media-content">
                        <p class="title is-size-5"> <strong class="has-text-white">{{userData.username}}</strong></p>
                        <p class="subtitle"><span class="tag is-medium ">{{userData.userUniqueID}}</span></p>
                    </div>
                </div>
                <p class="is-size-4 has-text-info-light"><i class="las la-rupee-sign"></i><strong class="has-text-warning-light">{{wallet.balance_amount}}</strong> <small class=" is-size-6">in your Wallet (Min <i class="las la-rupee-sign"></i>{{wallet.MINIMUM_BALANCE}})</small></p>
            </div>
            <div id="dashmenu" class="grid">
                <div class="box ">
                    <div class="buttons">
                        <a href="#!" class="button is-text is-fullwidth" onclick="scanQR()">Scan Card</a>
                        <a href="#!" class="button is-text is-inverted is-outlined is-fullwidth" v-on:click="showData()">Show Sample Data</a>
                    </div>
                </div>
                <div class="box ">
                    <div class="buttons">
                        <router-link to="/addaadhar" class="button is-text is-fullwidth">Add Aadhaar</router-link>
                        <router-link to="/listaadhar" class="button is-text is-fullwidth">List Aadhaar Cards</router-link>
                    </div>
                </div>
                <div class="box ">
                    <div class="buttons">
                        <router-link to="/addaadhar" class="button is-text is-fullwidth">Add Pan Card</router-link>
                        <router-link to="/addaadhar" class="button is-text is-fullwidth">List Pan Card</router-link>
                    </div>
                </div>
                <div class="box ">
                    <div class="buttons">
                        <router-link to="/addaadhar" class="button is-text is-fullwidth">Add Voter Card</router-link>
                        <router-link to="/addaadhar" class="button is-text is-fullwidth">List Voter Card</router-link>
                    </div>
                </div>
                <div class="box ">
                    <div class="buttons">
                        <router-link to="/addaadhar" class="button is-text is-fullwidth">Add Driving License</router-link>
                        <router-link to="/addaadhar" class="button is-text is-fullwidth">List Driving License</router-link>
                    </div>
                </div>
                <div class="box ">
                    <div class="buttons">
                        <router-link to="/addaadhar" class="button is-text is-fullwidth">Add Smart Card</router-link>
                        <router-link to="/addaadhar" class="button is-text is-fullwidth">List Smart Card</router-link>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="notification is-danger" v-show="errors.length">
            <button class="delete" v-on:click="errors=[]"></button>
            <p v-for="err in errors" v-bind:key="err">{{err}}</p>
        </div> -->
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
                            <input type="text" class="input is-info" v-model="xmldata.name">
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
                            <input type="text" class="input is-info" v-model="xmldata.gname">
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
                            <textarea class="textarea is-info" v-model="full_address" rows="2"></textarea>
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
                            <input type="text" class="input is-info" v-model="xmldata.dist">
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
                            <input type="text" class="input is-info" v-model="xmldata.subdist">
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
                            <input type="text" class="input is-info" v-model="xmldata.dob">
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
                    <div class="field ">
                        <p>Select image and upload</p>
                        <div class="control">
                            <div class="file has-name is-warning">
                                <label class="file-label">
                                    <input type="file" class="file-input" id="inputFileToLoad" accept="image/*" v-on:change="loadImageFileAsURL()">
                                    <span class="file-cta">
                                        <span class="file-icon">
                                            <i class="las la-upload"></i>
                                        </span>
                                        <span class="file-label">
                                            Choose a file…
                                        </span>
                                    </span>
                                    <span class="file-name" v-text="imgName">
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <p class="is-size-5 has-text-centered has-text-danger">Or</p>
                    <div class="field">
                        <label>Capture image and crop before upload</label>
                        <div class="control">
                            <button type="button" class="button is-warning is-fullwidth" onclick="cameraGo()"><i class="las la-camera"></i> Camera</button>
                        </div>
                    </div>
                    <div class="field">
                        <div class="image">
                            <img id="imgPreview">
                        </div>
                    </div>
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
export default {
    data() {
        return {
            name: "About user",
            // userData: this.$route.params.user,
            userData: '',
            imgBaseUrl: "https://drsolution.co.in/workspace/dist/img/users/",
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
    mounted: function() {
        // window.sessionStorage.setItem('user', JSON.stringify(this.$route.params.user));
        window.sessionStorage.removeItem('response');
        this.$emit("loaded", false);
        window.sessionStorage.setItem('QRCODE', '<?xml version="1.0" encoding="UTF-8"?> <PrintLetterBarcodeData uid="360979299510" name="My Card" gender="F" yob="1998" gname="Demo Card" co="S/O Demo Card" house="555 House" street="Street 15" lm="Lane 48" loc="Locality" vtc="what  is this" po="Post Office" dist="Baghpat" subdist="Binauli" state="Uttar Pradesh" pc="247001" dob="13/08/1998"/>');
        // window.sessionStorage.setItem('QRCODE', '<?xml version="1.0" encoding="UTF-8"?> <PrintLetterBarcodeData uid="360979299510" name="Deepak Kumar" gender="M" yob="1995" gname="Prakash Kumar" co="S/O Prakash Kumar" house="135 Pratap Nagar" street="Gali 19" lm="Shanti Nagar" loc="Sikandarpur" vtc="" po="Sadar Bazar" dist="Shamli" subdist="Shamli" state="Uttar Pradesh" pc="110042" dob="13/08/1995"/>');
        // this.userData = JSON.parse(window.sessionStorage.getItem("user"));
        this.userData = this.$store.getters.getUsers;
        if (!this.userData) {
            this.$router.push({ name: 'Home' });
        } else {
            this.$emit('userData', this.userData)
        }

        let postData = JSON.stringify({ "_action": "ZXdhbGxldA==", "userUniqueID": this.userData.userUniqueID });
        if (this.wallet.length < 1) {
            axios.post('https://thesupercop.com/webapis/v2/ewallet.php', postData)
                .then((response) => {
                    if (response.data.status == 1) {
                        this.wallet = response.data.data;
                        this.$store.dispatch('updateWallet', this.wallet);
                    } else {
                        this.errors.push(response.data.message)
                    }
                })
                .catch((error) => {
                    this.errors.push(error);
                })
        }

    },
    computed: {
        // ...mapGetters(['getUsers']),
        /*getUsers: function(){
            return this.$store.getters.getUsers;
        },*/
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
        loadImageFileAsURL: function() {
            let filesSelected = document.getElementById("inputFileToLoad").files;
            this.imgName = filesSelected[0].name;
            if (filesSelected.length > 0) {
                let fileReader = new FileReader();
                fileReader.onloadend = function() {
                    document.getElementById("imgPreview").src = fileReader.result
                };
                fileReader.readAsDataURL(filesSelected[0]);
            }
        },
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
            let imgData = document.getElementById("imgPreview").src;
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
                "base64Photo": imgData
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
.grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
}

#dashmenu .box {
    padding: 0;
    margin: 0;
    border-radius: 0;
    box-shadow: none;
}

#dashmenu .box:nth-child(1) {
    background-color: rgba(50, 50, 50, 0.1);
}

#dashmenu .box:nth-child(2) {
    background-color: rgba(50, 50, 50, 0.15);
}

#dashmenu .box:nth-child(3) {
    background-color: rgba(50, 50, 50, 0.2);
}

#dashmenu .box:nth-child(4) {
    background-color: rgba(50, 50, 50, 0.25);
}

#dashmenu .box:nth-child(5) {
    background-color: rgba(50, 50, 50, 0.3);
}

#dashmenu .box:nth-child(6) {
    background-color: rgba(50, 50, 50, 0.35);
}

#dashmenu .box .buttons {
    padding-top: 10px;
    padding-bottom: 5px;
}

#dashmenu .button.is-text {
    text-decoration: none;
}
</style>