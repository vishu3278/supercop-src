<template>
    <div id="app">
        <nav class="navbar " role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <router-link to="/" class="navbar-item">
                    <img src="./assets/logo.png">
                </router-link>
                <a role="button" v-on:click="menu = !menu" class="navbar-burger burger" aria-label="menu" aria-expanded="false">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            <div class="navbar-menu " v-bind:class="{'is-active': menu}">
                <div class="navbar-start">
                    <router-link to="/dashboard" class="navbar-item has-background-link has-text-link-light"><i class="las la-home"></i> Dashboard </router-link>
                    <ul class="has-background-info-light" v-show="user.user_type != 'suvidha_kendra'">
                        <li class="has-text-centered has-background-info">Admin</li>
                        <li>
                            <router-link to="/vlelist" class="navbar-item has-text-info"><i class="las la-user"></i> List VLE</router-link>
                        </li>
                        <li>
                            <router-link to="/vleadd" class="navbar-item has-text-info"><i class="las la-user-plus"></i> Add VLE</router-link>
                        </li>
                    </ul>
                    <ul class="has-background-primary-light">
                        <li class="has-text-centered has-background-primary">Cards</li>
                        <li>
                            <router-link to="/about" class="navbar-item has-text-primary"><i class="las la-qrcode"></i> Scan Aadhaar</router-link>
                        </li>
                        <li>
                            <router-link to="/addaadhar" class="navbar-item has-text-primary"><i class="las la-edit"></i> Add Aadhaar </router-link>
                        </li>
                        <li>
                            <router-link to="/listaadhar" class="navbar-item has-text-primary"><i class="las la-list"></i> List Aadhaar </router-link>
                        </li>
                    </ul>
                    <ul class="has-background-primary-light">
                        <li>
                            <router-link to="/about" class="navbar-item has-text-primary"><i class="las la-id-card"></i> Pan Cards</router-link>
                        </li>
                        <li>
                            <router-link to="/addaadhar" class="navbar-item has-text-primary"><i class="las la-id-card"></i> Add Pan Card </router-link>
                        </li>
                    </ul>
                    <ul class="has-background-primary-light">
                        <li>
                            <router-link to="/about" class="navbar-item has-text-primary"><i class="las la-portrait"></i> Voter Cards</router-link>
                        </li>
                        <li>
                            <router-link to="/addaadhar" class="navbar-item has-text-primary"><i class="las la-portrait"></i> Add Voter Card </router-link>
                        </li>
                    </ul>
                    <ul class="has-background-primary-light">
                        <li>
                            <router-link to="/about" class="navbar-item has-text-primary"><i class="las la-id-card-alt"></i> Driving License</router-link>
                        </li>
                        <li>
                            <router-link to="/addaadhar" class="navbar-item has-text-primary"><i class="las la-id-card-alt"></i> Add Driving License </router-link>
                        </li>
                    </ul>
                    <router-link to="/logout" class="navbar-item has-background-info-light has-text-info"><i class="las la-user-slash "></i> Logout</router-link>
                    <a onclick="exitApp()" class="navbar-item has-background-danger-light has-text-danger"><i class="las la-sign-out-alt"></i> Exit</a>
                </div>
            </div>
        </nav>
        <!-- <progress class="progress is-small is-warning" v-show="loader" max="100">100%</progress> -->
        <router-view v-on:loaded="menuStatus" v-on:userData="updateUserData" />
    </div>
</template>
<script>
export default {
    data() {
        return {
            menu: false,
            loader: false,
            user: '',
            baseApiUrl: 'https://thesupercop.com/webapis/v2/'
        }
    },
    methods: {
        menuStatus: function(e) {
            this.menu = e;
        },
        updateUserData: function(userdata) {
            this.user = userdata;
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
.button { font-weight:bold; }
.navbar {border-bottom:1px solid #bbb; box-shadow:0px 0px 0px 8px rgba(228, 228, 228, 0.8); position:relative;}
.navbar-menu { position: absolute; left:0; right:0; padding-top:0;box-shadow:0px 0px 0px 8px rgba(228, 228, 228, 0.8);}
.hero .hero-body {
    padding-top: 1rem;
    padding-bottom: 1rem;
}
.wrapper { padding:10px;}
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
</style>