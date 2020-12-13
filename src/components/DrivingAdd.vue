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
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Driving Licence No. *</label>
                        <div class="control">
                            <input v-model="dlno" class="input" type="text" placeholder="Driving Licence No." required="">
                        </div>
                        <p class="help is-danger" v-show="!dlno">Please fill this field</p>
                    </div>
                    <div class="field">
                        <label class="label">Upload signature* </label>
                        <div class="file has-name is-warning is-fullwidth">
                            <label class="file-label">
                                <input type="file" class="file-input" id="inputFileToLoad" accept="image/png" capture="camera" v-on:change="loadImageFileAsURL()">
                                <span class="file-cta">
                                    <span class="file-icon">
                                        <i class="las la-upload"></i>
                                    </span>
                                    <span class="file-label">
                                        Upload a file…
                                    </span>
                                </span>
                                <span class="file-name">
                                    {{imgName}}
                                </span>
                            </label>
                        </div>
                        <p class="help has-text-info">You need to upload transparent png for best results</p>
                        <p><router-link to="/removebg">Remove Background</router-link></p>
                    </div>
                    <div class="field">
                        <div class="image">
                            <img id="imgPreview">
                        </div>
                        <p class="help " v-bind:class="imgsize.class">{{imgsize.msg}}</p>
                    </div>
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
                        <!-- <label class="label">Upload Signature</label>
                        <ImagePreview v-on:imageData="signature = $event"></ImagePreview> -->
                        <!-- <label class="label">Upload ID Proof</label>
                        <image-preview v-on:imageData="idproof = $event"></image-preview> -->
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
            imgName: '',
            imgsize: { class: '', msg: ''},
            submitting: false,
            response: '',
        }
    },
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
        loadImageFileAsURL: function() {
            let filesSelected = document.querySelector("#inputFileToLoad").files;
            this.imgName = filesSelected[0].name;
            if (filesSelected.length > 0) {
                let fsize = filesSelected[0].size;
                let file = Math.round((fsize / 1024));
                // The size of the file. 
                if (file >= 200) {
                    this.imgsize.class = 'is-danger';
                    this.imgsize.msg = "File too Big "+file+"kb, please select a file less than 200kb";
                    document.querySelector("#imgPreview").src = '';
                } else if (file < 2) {
                    this.imgsize.class = 'is-danger';
                    this.imgsize.msg = "File too small "+file+"kb, please select a file greater than 2kb";
                    document.querySelector("#imgPreview").src = '';
                } else {
                    // this.imgsize = file + 'kb';
                    this.imgsize.class = 'is-success';
                    this.imgsize.msg = file+'kb';
                    let fileReader = new FileReader();
                    fileReader.onloadend = function() {
                        document.querySelector("#imgPreview").src = fileReader.result;
                    };
                    fileReader.readAsDataURL(filesSelected[0]);
                }
            }
        },
        clearData: function() {
            Object.assign(this.$data, this.$options.data());
            // window.sessionStorage.removeItem("QRCODE");
            this.userData = JSON.parse(window.sessionStorage.getItem("user"));
            this.response = JSON.parse(window.sessionStorage.getItem("response"));
        },
        submitForm: function() {
            let postImg = document.querySelector("#imgPreview").src;
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