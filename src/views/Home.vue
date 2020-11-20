<template>
    <div>
        <section class="hero is-primary is-bold ">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title has-text-weight-normal">{{msg}} <small class="is-size-5 has-text-weight-light">Scanner App</small></h1>
                </div>
            </div>
        </section>
        <div class="notification is-light is-danger" v-if="errors && errors.length">
            <ul>
                <li v-for="(error, index) of errors" v-bind:key="index">
                    {{index}} - {{error}}
                </li>
            </ul>
        </div>
        <section class="box">
            <div class="field">
                <p class="control has-icons-left has-icons-right">
                    <input class="input" v-model="userID" type="text" placeholder="User ID">
                    <span class="icon is-small is-left">
                        <i class="las la-user"></i>
                    </span>
                    <!-- <span class="icon is-small is-right">
                    <i class="las la-check"></i>
                </span> -->
                </p>
                <!-- <p class="help">Use VLE user id only</p> -->
            </div>
            <div class="field">
                <p class="control has-icons-left">
                    <input class="input" type="password" v-model="password" placeholder="Password">
                    <span class="icon is-small is-left">
                        <i class="las la-lock"></i>
                    </span>
                </p>
                <!-- <p class="help">{{password}}</p> -->
            </div>
            <button type="button" v-on:click="login()" v-bind:class="{'is-loading':submitting}" class="button is-link is-fullwidth is-uppercase">Login</button>
        </section>
        <!-- <footer class="footer has-background-grey-lighter">
            <div class="content has-text-centered">
                <p>
                    copyright &copy; SuperCop by <a href="https://wowitsolutions.com">WOW IT Solutions</a>.
                </p>
            </div>
        </footer> -->
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'Login',
    data() {
        return {
            msg: 'Login to ',
            userID: '',
            password: '',
            user: {},
            submitting: false,
            errors: []
        }
    },
    mounted: function() {
        this.$emit("loaded", false);
        if (window.sessionStorage.getItem('user') && window.sessionStorage.getItem('password')) {
            let userData = JSON.parse(window.sessionStorage.getItem('user'));
            this.userID = userData.userUniqueID;
            this.password = window.sessionStorage.getItem('password');
            this.login();
        }
    },
    methods: {
        login: function() {
            let postData = JSON.stringify({ "_action": "bG9naW4=", "userUniqueID": this.userID, "password": this.password });
            this.submitting = true;

            // this.postdata = postData;
            axios.post('https://thesupercop.com/webapis/v2/login.php', postData)
                .then(response => {
                    if (response.data.status == 1) {
                        this.user = response.data;
                        this.errors = [];
                        window.sessionStorage.setItem('user', JSON.stringify(this.user.data));
                        window.sessionStorage.setItem('password', this.password);
                        // this.$router.push({ name: 'About', params: { user: this.user.data } });
                        
                        this.$store.dispatch('updateUser', this.user.data);
                        this.$router.push({ name: 'Dashboard' });
                    } else {
                        this.errors.push(response.data.message);
                    }
                })
                .catch(error => {
                    this.errors.push(error);
                })
                .then(()=>{
                    this.submitting = false;
                })
        }
    }
}
</script>