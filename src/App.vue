<template>
    <div id="app">
        <nav class="navbar " v-bind:style="[ menu ? {'position': 'sticky', 'top': 0} : '']" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <router-link to="/" class="navbar-item">
                    <img src="https://thesupercop.com/webapis/logo.png">
                </router-link>
                <a role="button" v-show="user" v-on:click="menu = !menu" class="navbar-burger burger" aria-label="menu" aria-expanded="false">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
        </nav>
        <router-view v-on:loaded="menuStatus" v-on:userData="updateUserData" v-on:walletBal="walletBalance" />
        <div class="overlay" v-show="menu" v-on:click="menu = !menu"></div>
        <div class="navbar-menu p-0" v-bind:class="{'is-active': menu}">
            <div class="navbar-start p-3 has-background-dark">
                <router-link to="/dashboard" class="navbar-item has-background-success has-text-success-light"><i class="las la-home"></i> Dashboard </router-link>
                <div v-show="wallet.balance_amount >= wallet.MINIMUM_BALANCE">
                    <p class="menu-label" v-show="user.user_type != 'suvidha_kendra'">
                        Admin
                    </p>
                    <ul class="has-background-info-light" v-show="user.user_type != 'suvidha_kendra'">
                        <!-- <li class="has-text-centered has-background-info">Admin</li> -->
                        <li>
                            <router-link to="/vlelist" class="navbar-item has-text-info"><i class="las la-user"></i> List VLE</router-link>
                        </li>
                        <li>
                            <router-link to="/vleadd" class="navbar-item has-text-info"><i class="las la-user-plus"></i> Add VLE</router-link>
                        </li>
                    </ul>
                    <p class="menu-label">
                        Cards
                    </p>
                    <ul class="has-background-primary-light">
                        <!-- <li class="has-text-centered has-background-primary">Cards</li> -->
                        <li>
                            <router-link to="/aadharlist" class="navbar-item has-text-primary-dark"><i class="las la-address-card"></i> Aadhaar Cards </router-link>
                        </li>
                        <li>
                            <router-link to="/panlist" class="navbar-item has-text-primary-dark"><i class="las la-id-card"></i> Pan Cards</router-link>
                        </li>
                        <li>
                            <router-link to="/voterlist" class="navbar-item has-text-primary-dark"><i class="las la-portrait"></i> Voter Cards</router-link>
                        </li>
                        <li>
                            <router-link to="/drivinglist" class="navbar-item has-text-primary-dark"><i class="las la-id-card-alt"></i> Driving License</router-link>
                        </li>
                        <li>
                            <router-link to="/smartlist" class="navbar-item has-text-primary-dark"><i class="las la-id-card-alt"></i> Smart Card</router-link>
                        </li>
                    </ul>
                    <p class="menu-label" v-show="user.user_type == 'suvidha_kendra'">
                        Add Cards
                    </p>
                    <ul class="has-background-primary-light" v-show="user.user_type == 'suvidha_kendra'">
                        <li>
                            <router-link to="/scancard" class="navbar-item has-text-primary-dark"><i class="las la-qrcode"></i> Scan Aadhaar </router-link>
                        </li>
                        <li>
                            <router-link to="/aadhaaradd" class="navbar-item has-text-primary-dark"><i class="las la-address-card"></i> Add Aadhaar Card</router-link>
                        </li>
                        <li>
                            <router-link to="/panadd" class="navbar-item has-text-primary-dark"><i class="las la-id-card"></i> Add Pan Card </router-link>
                        </li>
                        <li>
                            <router-link to="/voteradd" class="navbar-item has-text-primary-dark"><i class="las la-portrait"></i> Add Voter Card </router-link>
                        </li>
                        <li>
                            <router-link to="/drivingadd" class="navbar-item has-text-primary-dark"><i class="las la-id-card-alt"></i> Add Driving License </router-link>
                        </li>
                        <!-- <li>
                            <router-link to="/smartadd" class="navbar-item has-text-primary-dark"><i class="las la-id-card-alt"></i> Add Smart Card </router-link>
                        </li> -->
                    </ul>
                </div>
                <p class="menu-label">
                    Action
                </p>
                <router-link to="/removebg" class="navbar-item has-background-info-light has-text-info-dark"><i class="las la-image "></i> Remove Background</router-link>
                <router-link to="/logout" class="navbar-item has-background-warning-light has-text-warning-dark"><i class="las la-user-slash "></i> Logout</router-link>
                <a onclick="exitApp()" class="navbar-item has-background-danger-light has-text-danger"><i class="las la-sign-out-alt"></i> Exit</a>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            menu: false,
            loader: false,
            user: '',
            wallet: '',
            baseApiUrl: 'https://thesupercop.com/webapis/v2/'
        }
    },
    mounted: function() {
        this.$router.push({ name: 'Home' });
    },
    methods: {
        menuStatus: function(e) {
            this.menu = e;
        },
        updateUserData: function(userdata) {
            this.user = userdata;
        },
        walletBalance: function(balance) {
            this.wallet = balance;
        }
    }
}
</script>
<style>
#app {
    font-family: 'Play', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}

h1,
h2,
h3,
h4 {
    font-family: 'Play', sans-serif;
}

button,
input,
form,
select,
textarea,
.button {
    font-family: 'Play', sans-serif;
}

.button {
    font-weight: bold;
}

.overlay {
    position: fixed;
    left: 0;
    top: 3rem;
    right: 0;
    bottom: 0;
    z-index: 91;
    background: rgba(0, 0, 0, 0.5);
}

.navbar {
    border-bottom: 1px solid #bbb;
    position: relative;
}

.navbar-menu {
    position: fixed;
    left: 0;
    right: 0;
    top: 3rem;
    max-height:90vh;
    z-index: 99;
    overflow: auto;
}

.navbar-start ul li {
    border-bottom: 1px solid #363636;
}

.hero .hero-body {
    padding-top: 1rem;
    padding-bottom: 1rem;
}

.wrapper {
    padding: 10px;
}

.footer.is-fixed-bottom {
    bottom: 0;
    left: 0;
    position: fixed;
    right: 0;
    z-index: 28;
}

.card-header .icon .las {
    font-size: 1.5rem;
}

.tag:not(body) {
    height: 1.125rem;
    line-height: 1rem;
}

.tabs li.is-active a {
    color: #DA5552;
    border-bottom-color: #DD6463;
}
</style>