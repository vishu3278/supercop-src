<template>
    <div class="is-clearfix">
        <div class="card">
            <div class="card-header has-background-success-light">
                <!-- <span class="card-header-icon">
                    <span class="icon has-text-info"><i class="las la-list-ol"></i></span>
                </span> -->
                <p class="card-header-title has-text-success">{{name}}</p>
                <span class="card-header-icon has-text-success" v-on:click="addVle">
                    <span class="icon "><i class="las la-plus-circle"></i></span>
                </span>
            </div>
        </div>
        <div class="wrapper">
            <progress v-show="submitting" class="progress is-small is-primary" max="100">15%</progress>
            <div class="notification is-light is-danger" v-if="errors && errors.length">
                <ul>
                    <li v-for="(error, index) of errors" v-bind:key="index">
                        {{index}} - {{error}}
                    </li>
                </ul>
            </div>
        </div>
        <div class="table-container content is-small">
            <table class="table is-narrow is-fullwidth">
                <thead>
                    <tr>
                        <th>Img</th>
                        <th>VLE</th>
                        <th>Info</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- <tr>
                        <td>1</td>
                        <td>name<br>9876543210<br>email@afasfasf.in</td>
                        <td>Delhi<br>South Delhi<br>Kalkaji</td>
                        <td><button class="button is-warning is-small">
                                <span class="icon is-small">
                                    <i class="las la-toggle-off"></i>
                                </span>
                            </button></td>
                    </tr> -->
                    <tr v-for="vle in vlelist" :key="vle.id">
                        <td>
                            <figure class="image is-32x32 m-0">
                                <img v-bind:src="getImgPath + vle.photo">
                            </figure>
                        </td>
                        <td>{{vle.f_name}}<br>{{vle.phone}}<br>{{vle.email}}</td>
                        <td>{{vle.state_ID}}<br>{{vle.district_ID}}<br>{{vle.block_ID}}</td>
                        <td><button class="button is-warning is-small">
                                <span class="icon is-small">
                                    <i class="las la-toggle-off"></i>
                                </span>
                            </button></td>
                    </tr>
                    <!-- <tr>
                        <td>2</td>
                        <td>Soraj Singh<br>9876543210<br>guruvachainsani2008@gmail.com</td>
                        <td>Uttar Pradesh<br>Muzaffarnagar<br>Thana Bhawan</td>
                        <td><button class="button is-warning is-small">
                                <span class="icon is-small">
                                    <i class="las la-toggle-off"></i>
                                </span>
                            </button></td>
                    </tr> -->
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'VLEList',
    data() {
        return {
            name: 'VLE List',
            userData: '',
            submitting: false,
            errors: [],
            vlelist: []
        }
    },
    mounted: function() {
        this.$emit("loaded", false);
        /*let sessionUser = JSON.parse(window.sessionStorage.getItem('user'));
        this.userUniqueID = sessionUser.userUniqueID;*/
        this.userData = this.$store.getters.getUsers;
        let postData = JSON.stringify({ "_action": "dmxlLWxpc3Q=", "userUniqueID": this.userData.userUniqueID });
        this.submitting = true;
        axios.post('https://thesupercop.com/webapis/v2/vle-list.php', postData)
            .then(response => {
                if (response.data.status == 1) {
                    this.vlelist = response.data.data;
                    this.errors = [];
                    // this.$router.push({ name: 'About', params: { user: this.user } });
                } else {
                    this.errors.push(response.data.message);
                }
            })
            .catch(error => {
                this.errors.push(error);
            })
            .then(() => {
                this.submitting = false;
            })
    },
    computed: {
        getImgPath: function() {
            return this.$store.getters.getImgPath;
        }
    },
    methods: {
        list: function() {
            let postData = JSON.stringify({ "_action": "dmxlLWxpc3Q=", "userUniqueID": this.userData.userUniqueID });
            this.submitting = true;
            axios.post('https://thesupercop.com/webapis/v2/vle-list.php', postData)
                .then(response => {
                    if (response.data.status == 1) {
                        this.vlelist = response.data.data;
                        this.errors = [];
                        // this.$router.push({ name: 'About', params: { user: this.user } });
                    } else {
                        this.errors.push(response.data.message);
                    }
                })
                .catch(error => {
                    this.errors.push(error);
                })
                .then(() => {
                    this.submitting = false;
                })
        },
        addVle: function() {
            this.$router.push({ name: 'VLEAdd' });
        }
    }
}
</script>