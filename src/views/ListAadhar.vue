<template>
    <div>
        <div class="card">
            <div class="card-header has-background-info-light">
                <p class="card-header-title has-text-info-dark">{{name}}</p>
                <span class="card-header-icon" v-on:click="addAadhaar">
                    <span class="icon has-text-info"><i class="las la-plus-circle"></i></span>
                </span>
            </div>
        </div>
        <div class="table-container content is-small">
            <table class="table is-narrow is-fullwidth">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>VLE</th>
                        <th>Info</th>
                        <th>Act</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>name<br>9876543210<br>email@afasfasf.in</td>
                        <td>Delhi<br>South Delhi<br>Kalkaji</td>
                        <td><button class="button is-warning is-small">
                                <span class="icon is-small">
                                    <i class="las la-toggle-off"></i>
                                </span>
                            </button></td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>name<br>9876543210<br>sahidgujjar0786@gmail.com</td>
                        <td>Uttar Pradesh<br>South Delhi<br>Thana Bhawan</td>
                        <td><button class="button is-warning is-small">
                                <span class="icon is-small">
                                    <i class="las la-toggle-off"></i>
                                </span>
                            </button></td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Soraj Singh<br>9876543210<br>guruvachainsani2008@gmail.com</td>
                        <td>Uttar Pradesh<br>Muzaffarnagar<br>Thana Bhawan</td>
                        <td><button class="button is-warning is-small">
                                <span class="icon is-small">
                                    <i class="las la-toggle-off"></i>
                                </span>
                            </button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
// import axios from 'axios'
export default {
    name: 'Aadhaar list',
    data() {
        return {
            name: 'Aadhaar List',
        }
    },
    mounted: function() {
        this.$emit("loaded", false);
    },
    methods: {
        list: function() {

            /*axios.post('https://thesupercop.com/webapis/login.php', postData)
                .then(response => {
                    if (response.data.status == 1) {
                        this.user = response.data;
                        this.errors = [];
                        this.$router.push({ name: 'About', params: { user: this.user } });
                    } else {
                        this.errors.push(response.data.message);
                    }
                })
                .catch(error => {
                    this.errors.push(error);
                })*/
        },
        addAadhaar: function() {
            this.$router.push({name: 'AddAadhar'});
        }
    }
}
</script>