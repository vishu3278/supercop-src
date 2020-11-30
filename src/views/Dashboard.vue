<template>
    <div>
        <div v-show="userData">
            <div class="box m-0 is-radiusless has-background-dark has-text-white">
                <div class="media">
                    <figure class="media-left">
                        <p class="image is-64x64">
                            <img src="https://thesupercop.com/assets/images/dummy_user.png" v-if="!userData.photo" alt="">
                            <img v-else v-bind:src="getImgPath + userData.photo" style="width:64px;height:64px; object-fit:contain;" alt="">
                        </p>
                    </figure>
                    <div class="media-content">
                        <p class="title is-size-5"> <strong class="has-text-white">{{userData.username}}</strong></p>
                        <p class="subtitle"><span class="tag is-medium ">{{userData.userUniqueID}}</span></p>
                    </div>
                </div>
                <p class="is-size-4 has-text-info-light"><i class="las la-rupee-sign"></i><strong class="has-text-warning-light">{{wallet.balance_amount}}</strong> <small class=" is-size-6">in your Wallet (Min <i class="las la-rupee-sign"></i>{{wallet.MINIMUM_BALANCE}})</small></p>
            </div>
            <progress v-show="progress" class="progress is-small is-info is-radiusless" max="100">20%</progress>
            <div id="dashmenu" class="grid" style="margin-top:1px;" v-if="wallet.balance_amount >= wallet.MINIMUM_BALANCE">
                <div class="buttons">
                    <router-link to="/scancard" class="button is-text is-fullwidth">Scan Card</router-link>
                    <router-link to="/removebg" class="button is-text is-fullwidth">Remove Background</router-link>
                    <!-- <a href="#!" class="button is-text is-fullwidth" onclick="scanQR()">Scan Card</a> -->
                    <!-- <a href="#!" class="button is-text is-inverted is-outlined is-fullwidth" v-on:click="showData()">Show Sample Data</a> -->
                </div>
                <div class="buttons">
                    <router-link to="/aadharadd" class="button is-text is-fullwidth">Add Aadhaar Card</router-link>
                    <router-link to="/aadharlist" class="button is-text is-fullwidth">Aadhaar Cards</router-link>
                </div>
                <div class="buttons">
                    <router-link to="/panadd" class="button is-text is-fullwidth">Add Pan Card</router-link>
                    <router-link to="/panlist" class="button is-text is-fullwidth">Pan Cards</router-link>
                </div>
                <div class="buttons">
                    <router-link to="/voteradd" class="button is-text is-fullwidth">Add Voter Card</router-link>
                    <router-link to="/voterlist" class="button is-text is-fullwidth">Voter Cards</router-link>
                </div>
                <div class="buttons">
                    <router-link to="/drivingadd" class="button is-text is-fullwidth">Add Driving License</router-link>
                    <router-link to="/drivinglist" class="button is-text is-fullwidth">Driving License</router-link>
                </div>
                <div class="buttons">
                    <router-link to="/smartadd" class="button is-text is-fullwidth">Add Smart Card</router-link>
                    <router-link to="/smartlist" class="button is-text is-fullwidth">Smart Cards</router-link>
                </div>
            </div>
            <article class="message is-warning is-radiusless mb-3" v-else>
                <div class="message-body">
                    Your Wallet Balance <strong class="has-text-danger is-size-4"><i class="las la-rupee-sign"></i>{{wallet.balance_amount}}</strong> is lower than the required amount <strong><i class="las la-rupee-sign"></i>{{wallet.MINIMUM_BALANCE}}</strong>.<br> Please recharge to proceed further.
                </div>
            </article>
        </div>
        <div class="wrapper">
            <div class="panel ">
                <p class="panel-heading">Help</p>
                <a class="panel-block" href="tel:+91 9876543210"><span class="panel-icon">
                        <i class="las la-phone" aria-hidden="true"></i>
                    </span> +91 9876543210</a>
                <a class="panel-block" href="mailto:info@thesupercop.com"><span class="panel-icon">
                        <i class="las la-envelope" aria-hidden="true"></i>
                    </span> info@thesupercop.com</a>
            </div>
        </div>
        <div class="box" v-show="!userData">
            <router-link to="/" class="button is-fullwidth is-warning">Login Again</router-link>
        </div>
        <p class="has-text-centered has-text-weight-light mt-4">copyright &copy; 2020</p>
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
            // imgBaseUrl: "https://thesupercop.com/workspace/dist/img/users/",
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
            progress: false
        }
    },
    mounted: function() {
        // window.sessionStorage.setItem('user', JSON.stringify(this.$route.params.user));
        this.progress = true;
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

        let postData = JSON.stringify({ "_action": "ZXdhbGxldA==", "userUniqueID": this.userData.userUniqueID });
        axios.post('https://thesupercop.com/webapis/v2/ewallet.php', postData)
            .then((response) => {
                if (response.data.status == 1) {
                    this.wallet = response.data.data;
                    this.$store.dispatch('updateWallet', this.wallet);
                    this.$emit('walletBal', this.wallet)
                } else {
                    this.errors.push(response.data.message)
                }
            })
            .catch((error) => {
                this.errors.push(error);
            })
            .then(() => {
                this.progress = false;
            })

    },
    computed: {
        // ...mapGetters(['getUser']),
        getImgPath: function() {
            return this.$store.getters.getImgPath;
        },
    },
    methods: {

    }
}
</script>
<style>
.grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1px;
}

#dashmenu .buttons {
    margin: 0;
    padding: 5px 0;
}

#dashmenu .buttons:nth-child(1) {
    /*background-color: rgba(50, 50, 50, 0.1);*/
    background-color: #DA5552;
}

#dashmenu .buttons:nth-child(2) {
    /*background-color: rgba(50, 50, 50, 0.15);*/
    background-color: #DD6463;
}

#dashmenu .buttons:nth-child(3) {
    /*background-color: rgba(50, 50, 50, 0.2);*/
    background-color: #DF7373;
}

#dashmenu .buttons:nth-child(4) {
    /*background-color: rgba(50, 50, 50, 0.25);*/
    background-color: #E07C7C;
}

#dashmenu .buttons:nth-child(5) {
    /*background-color: rgba(50, 50, 50, 0.3);*/
    background-color: #E18584;
}

#dashmenu .buttons:nth-child(6) {
    /*background-color: rgba(50, 50, 50, 0.35);*/
    background-color: #E28E8D;
}

#dashmenu .buttons .button {
    margin: 0;
    border-radius: 0;
    padding-top: 0.75em;
    padding-bottom: 0.75em;
    height: auto;
}

#dashmenu .button.is-text {
    text-decoration: none;
    color: #fff;
}
</style>