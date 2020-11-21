<template>
    <div class="is-clearfix">
        <div class="card">
            <div class="card-header has-background-info-light">
                <!-- <span class="card-header-icon">
                    <span class="icon has-text-info"><i class="las la-list-ol"></i></span>
                </span> -->
                <p class="card-header-title has-text-info-dark">{{name}}</p>
                <span class="card-header-icon has-text-info-dark" v-on:click="addSmart">
                    <span class="icon "><i class="las la-plus-circle"></i></span>
                </span>
            </div>
        </div>
        <div class="notification is-light is-danger m-0" v-if="errors && errors.length">
            <p v-for="(error, index) of errors" v-bind:key="index">
                {{index}} - {{error}}
            </p>
        </div>
        <progress v-show="submitting" class="progress is-small is-info" max="100">15%</progress>
        <div class="level is-mobile px-1">
            <div class="level-left"><label class="level-item">Search</label></div>
            <div class="level-right">
                <div class="field has-addons">
                    <div class="control"><input type="text" class="input is-small" placeholder="Search"></div>
                    <div class="control"><button type="button" class="button is-small is-info"><i class="las la-search"></i></button></div>
                    <div class="control"><button type="button" class="button is-small is-ghost"><i class="las la-undo-alt"></i></button></div>
                </div>
            </div>
        </div>
        <div class="table-container content is-small">
            <table class="table is-narrow is-fullwidth">
                <thead>
                    <tr class="has-background-info ">
                        <th>Info</th>
                        <th>Name<br>Gender</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Ack- ACK300441605776484<br>
                            VLE- Gaurav saini<br>
                            <span class="tag">8QE741955043</span></td>
                        <td>Name<br>Female</td>
                        <td>State<br>District<br>Block</td>
                        <td>
                            <!-- <span class="tag is-success is-light">Active</span><br> -->
                            <button class="button is-warning is-small">
                                <span class="icon ">
                                    <i class="las la-toggle-off"></i>
                                </span>
                            </button>
                            <button class="button is-primary is-small">
                                <span class="icon ">
                                    <i class="las la-print"></i>
                                </span>
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>Ack- ACK300441605776484<br>
                            VLE- Amit kumar<br>
                            <span class="tag">8QE741955043</span></td>
                        <td>Shyam Lal<br>Male</td>
                        <td>State<br>District<br>Block</td>
                        <td>
                            <!-- <span class="tag is-success is-light">Active</span><br> -->
                            <button class="button is-warning is-small">
                                <span class="icon ">
                                    <i class="las la-toggle-off"></i>
                                </span>
                            </button>
                            <button class="button is-primary is-small">
                                <span class="icon ">
                                    <i class="las la-print"></i>
                                </span>
                            </button>
                        </td>
                    </tr>
                    <!-- <tr v-for="vle in vlelist" :key="vle.id">
                        <td>
                            <figure class="image is-32x32 m-0">
                                <img src="https://thesupercop.com/assets/images/dummy_user.png" v-if="!vle.photo" v-bind:alt="vle.f_name">
                                <img v-bind:src="getImgPath + vle.photo" v-bind:alt="vle.f_name">
                            </figure>
                        </td>
                        <td>{{vle.f_name}}<br>{{vle.phone}}<br>{{vle.email}}</td>
                        <td>{{vle.state_ID}}<br>{{vle.district_ID}}<br>{{vle.block_ID}}</td>
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
// import axios from 'axios'
export default {
    name: 'SmartList',
    data() {
        return {
            name: 'Smart List',
            userData: '',
            submitting: false,
            errors: [],
            vlelist: []
        }
    },
    mounted: function() {
        this.$emit("loaded", false);
        this.userData = this.$store.getters.getUsers;
        // let postData = JSON.stringify({ "_action": "dmxlLWxpc3Q=", "userUniqueID": this.userData.userUniqueID });
        this.submitting = true;
        /*axios.post('https://thesupercop.com/webapis/v2/vle-list.php', postData)
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
            })*/

    },
    computed: {
        getImgPath: function() {
            return this.$store.getters.getImgPath;
        }
    },
    methods: {
        addSmart: function() {
            this.$router.push({ name: 'SmartAdd' });
        }
    }
}
</script>