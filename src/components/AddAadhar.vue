<template>
    <div>
        <div class="card ">
            <div class="card-header has-background-info-light">
                <div class="card-header-icon has-text-info">
                    <span class="icon"><i class="las la-address-card" aria-hidden="true"></i></span>
                </div>
                <p class="card-header-title has-text-info-dark">{{componentTitle}} </p>
            </div>
            <div class="card-content">
                <div class="field">
                    <label>Name </label>
                    <div class="control">
                        <input type="text" class="input is-info" v-model="name" required="">
                    </div>
                </div>
                <div class="field">
                    <label>नाम </label>
                    <div class="control">
                        <input type="text" class="input is-info" v-model="full_name_hi" required="">
                    </div>
                </div>
                <label>Parent Type &amp; Name</label>
                <div class="field has-addons">
                    <div class="control">
                        <span class="select">
                            <select v-model="parent_type" class="input is-info" required="">
                                <option selected="" value="">Type</option>
                                <option value="C/O">C/O</option>
                                <option value="D/O">D/O</option>
                                <option value="S/O" selected="">S/O</option>
                                <option value="W/O">W/O</option>
                            </select>
                        </span>
                    </div>
                    <div class="control is-expanded">
                        <input type="text" class="input is-info" v-model="parent_name" required="">
                    </div>
                </div>
                <div class="field ">
                    <label>माता पिता का नाम (अभिभावक)</label>
                    <div class="control is-expanded">
                        <input type="text" class="input is-info" v-model="parent_name_hi" required="">
                    </div>
                </div>
                <div class="field">
                    <label>Address</label>
                    <div class="control">
                        <textarea class="textarea is-info" v-model="full_address" rows="2" required=""></textarea>
                    </div>
                </div>
                <div class="field">
                    <label>पता</label>
                    <div class="control">
                        <textarea class="textarea is-info" v-model="full_address_hi" rows="2" required=""></textarea>
                    </div>
                </div>
                <div class="field">
                    <label>State (राज्य)</label>
                    <div class="select is-fullwidth">
                        <select v-model="stateid" v-on:change="fetchDistrict($event)" class="input is-info " required="">
                            <option value="">Select State</option>
                            <option value="485" data-state="Andaman and Nicobar">
                                Andaman and Nicobar (
                                अण्डमान और निकोबार) </option>
                            <option value="486" data-state="Andhra Pradesh">
                                Andhra Pradesh (
                                आंध्र प्रदेश) </option>
                            <option value="487" data-state="Arunachal Pradesh">
                                Arunachal Pradesh (
                                अरुणाचल प्रदेश) </option>
                            <option value="488" data-state="ASSAM">
                                ASSAM (
                                অসম ) </option>
                            <option value="489" data-state="Bihar">
                                Bihar (
                                बिहार) </option>
                            <option value="490" data-state="Chandigarh">
                                Chandigarh (
                                चंडीगढ़) </option>
                            <option value="491" data-state="Chhattisgarh">
                                Chhattisgarh (
                                छत्तीसगढ़) </option>
                            <option value="492" data-state="Dadra and Nagar Haveli">
                                Dadra and Nagar Haveli (
                                दादरा और नगर हवेली) </option>
                            <option value="493" data-state="Daman and Diu">
                                Daman and Diu (
                                दमन और दीव) </option>
                            <option value="494" data-state="Delhi">
                                Delhi (
                                दिल्ली) </option>
                            <option value="495" data-state="Goa">
                                Goa (
                                गोवा) </option>
                            <option value="496" data-state="Gujarat">
                                Gujarat (
                                ગુજરાત) </option>
                            <option value="497" data-state="Haryana">
                                Haryana (
                                हरियाणा) </option>
                            <option value="498" data-state="Himachal Pradesh">
                                Himachal Pradesh (
                                हिमाचल प्रदेश) </option>
                            <option value="499" data-state="Jammu and Kashmir">
                                Jammu and Kashmir (
                                जम्मू और कश्मीर) </option>
                            <option value="500" data-state="Jharkhand">
                                Jharkhand (
                                झारखंड) </option>
                            <option value="501" data-state="Karnataka">
                                Karnataka (
                                कर्नाटक) </option>
                            <option value="502" data-state="Kerala">
                                Kerala (
                                केरल) </option>
                            <option value="503" data-state="Lakshadweep">
                                Lakshadweep (
                                लक्षद्वीप) </option>
                            <option value="504" data-state="Madhya Pradesh">
                                Madhya Pradesh (
                                मध्य प्रदेश) </option>
                            <option value="505" data-state="Maharashtra">
                                Maharashtra (
                                महाराष्ट्र) </option>
                            <option value="506" data-state="Manipur">
                                Manipur (
                                मणिपुर) </option>
                            <option value="507" data-state="Meghalaya">
                                Meghalaya (
                                मेघालय) </option>
                            <option value="508" data-state="Mizoram">
                                Mizoram (
                                मिजोरम) </option>
                            <option value="509" data-state="Nagaland">
                                Nagaland (
                                नगालैंड) </option>
                            <option value="510" data-state="Orissa">
                                Orissa (
                                ओडिशा) </option>
                            <option value="511" data-state="Pondicherry">
                                Pondicherry (
                                पांडिचेरी) </option>
                            <option value="512" data-state="Punjab">
                                Punjab (
                                ਪੰਜਾਬ) </option>
                            <option value="513" data-state="Rajasthan">
                                Rajasthan (
                                राजस्थान) </option>
                            <option value="514" data-state="Sikkim">
                                Sikkim (
                                सिक्किम) </option>
                            <option value="515" data-state="">
                                Tamil Nadu (
                                तमिलनाडु) </option>
                            <option value="522" data-state="Telangana">
                                Telangana (
                                तेलंगाना) </option>
                            <option value="516" data-state="Tripura">
                                Tripura (
                                त्रिपुरा) </option>
                            <option value="517" data-state="Uttar Pradesh">
                                Uttar Pradesh (
                                उत्तर प्रदेश) </option>
                            <option value="518" data-state="Uttarakhand">
                                Uttarakhand (
                                उत्तराखंड) </option>
                            <option value="519" data-state="West Bengal">
                                West Bengal (
                                पश्चिम बंगाल) </option>
                        </select>
                        
                    </div>
                </div>
                <div class="field">
                    <label>District</label>
                    <div class="control">
                        <div class="select is-fullwidth">
                            <select class="input is-info" v-model="districtid" v-on:change="fetchBlock($event)">
                                <option value="" selected="">Select District</option>
                                <option v-for="(district, index) in districtList" :key="index" :value="district.district_ID" :data-dist="district.district_name" :data-disthindi="district.district_name_hi">{{district.district_name}} ({{district.district_name_hi}})</option>
                            </select>
                        </div>
                        <p class="help is-danger" v-show="districtList.length==0" >No district found</p>
                        <!-- <input type="text" class="input is-info" v-model="district"> -->
                    </div>
                </div>
                <!-- <div class="field">
                    <label>जिला</label>
                    <div class="control">
                        <input type="text" class="input is-info" v-model="district_hi">
                    </div>
                </div> -->
                <div class="field">
                    <label>Block</label>
                    <div class="control">
                        <div class="select is-fullwidth">
                            <select v-model="blockid" class="input is-info" v-on:change="changeBlock($event)">
                                <option value="" selected="">Select Block</option>
                                <option v-for="(block, index) in blockList" :key="index" :value="block.block_id" :data-block="block.block_name" :data-blockhindi="block.block_name_hi">{{block.block_name}} ({{block.block_name_hi}})</option>
                            </select>
                        </div>
                        <p class="help is-danger" v-show="blockList.length==0" >No blocks found</p>
                        <!-- <input type="text" class="input is-info" v-model="block"> -->
                    </div>
                </div>
                <!-- <div class="field">
                    <label>खंड</label>
                    <div class="control">
                        <input type="text" class="input is-info" v-model="block_hi">
                    </div>
                </div> -->
                <div class="field">
                    <label>Pincode</label>
                    <div class="control">
                        <input type="number" v-on:keyup="validate($event)" class="input is-info" v-model="pincode" required="" minlength="6" maxlength="6">
                    </div>
                </div>
                <div class="field">
                    <label>Date of Birth</label>
                    <div class="control">
                        <v-date-picker :locale="{masks:{title:'MMM YYYY', L:'DD-MM-YYYY'}}" v-model="dob" color="blue" :max-date="new Date()" :input-props="{class:'input is-info'}" is-required />
                    </div>
                </div>
                <div class="field">
                    <label>Gender</label>
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
                    <label>Aadhaar Number</label>
                    <div class="control"><input type="number" class="input is-info" v-model="uid" minlength="12" maxlength="12" required=""></div>
                </div>
                <div class="field">
                    <label class="checkbox"><input type="checkbox" v-model="agree" required="required" aria-required="true"> I will be responsible for details entered in this form.</label>
                </div>
            </div>
        </div>
        <div v-show="agree">
            <div class="card">
                <div class="card-header">
                    <p class="card-header-title has-text-info">Convert Language </p>
                    <a href="#" class="card-header-icon" aria-label="more options">
                        <span class="icon"><i class="las la-language"></i></span>
                    </a>
                </div>
                <div class="card-content">
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
                </div>
            </div>
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
                                    <input type="file" class="file-input" id="inputFileToLoad" accept="image/*" capture="camera" v-on:change="loadImageFileAsURL()">
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
                    <div class="buttons has-addons">
                        <button class="button" v-on:click="clearData()">Clear</button>
                        <button class="button is-success is-expanded" v-bind:class="{'is-loading':submitting}" v-on:click="submitData()">Submit</button>
                    </div>
                </div>
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
                    <p>Your acknowledgement no is {{response.data.ack_no}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'AddAadhaar',
    data() {
        return {
            componentTitle:'Add Aadhaar Card',
            name: '',
            userData: '',
            imgBaseUrl: "https://drsolution.co.in/workspace/dist/img/users/",
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
            districtid:'',
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
            imgName: '',
            base64Photo: '',
            errors: [],
            submitting: false,
            response: '',
        }
    },
    mounted: function() {
        window.sessionStorage.removeItem('response');
        this.$emit("loaded", false);
        this.userData = JSON.parse(window.sessionStorage.getItem("user"));
        if (!this.userData) {
            this.$router.push({ name: 'Home' });
        }
    },
    computed: {
        setDate: function() {
            let formattedDate = ('0' + this.dob.getDate()).slice(-2) + '-' + ('0' + (this.dob.getMonth() + 1)).slice(-2) + '-' + this.dob.getFullYear();
            console.log(formattedDate);
            return formattedDate;
        },
        
    },
    methods: {
        validate: function(event){
            let el = event.target.attributes;
            console.log(el[1]);
            /*if (el.value == '') {
                return "is-danger"
            } else {
                return "is-success"
            }*/
            return event.target.value;
        },
        fetchDistrict: function(event) {
            this.state = event.target.selectedOptions[0].dataset.state;
            // console.log(event);
            this.districtList=[];
            this.blockList=[];
            if (this.stateid) {
                let stateData = JSON.stringify({ state: this.stateid });
                axios.post('https://thesupercop.com/webapis/stateAjax.php', stateData)
                .then((response)=>{
                    if (response.status == 200) {
                        // console.log(response);
                        if (response.data.status == 1) {
                            console.log(response.data.district)
                            this.districtList = response.data.district;
                            // this.stateError.district = '';
                        }else{
                            // this.stateError.district = response.data.message
                        }
                    }else{
                        // this.stateError.district = response.statusText;
                    }
                })
                .catch((error)=>{
                    console.log(error)
                })
            }else {
                // this.stateError.district = ""
            }
        },
        fetchBlock: function(event) {
            this.district = event.target.selectedOptions[0].dataset.dist;
            this.district_hi = event.target.selectedOptions[0].dataset.disthindi;
            this.blockList=[];
            if (this.districtid) {
                let districtData = JSON.stringify({ district: this.districtid });
                axios.post('https://thesupercop.com/webapis/stateAjax.php', districtData)
                .then((response)=>{
                    if (response.status == 200) {
                        // console.log(response);
                        if (response.data.status == 1) {
                            console.log(response.data.block)
                            this.blockList = response.data.block;
                        }else{
                            // console.warn(response.data.message)
                            // this.stateError.block = response.data.message
                        }
                    }else{
                        // this.stateError.block = response.statusText;
                    }
                })
                .catch((error)=>{
                    console.log(error)
                })
            }else {
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
                    alert( "File too Big, please select a file less than 200kb"); 
                } else if (file < 10) { 
                    alert( "File too small, please select a file greater than 10kb"); 
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