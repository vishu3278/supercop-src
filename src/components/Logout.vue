<template>
    <div>
        
        <p></p>{{name}}
        
    </div>
</template>
<script>
// import axios from 'axios'
export default {
    name: 'Logout',
    data() {
        return {
            name: 'Logout',
        }
    },
    mounted: function () {
        window.sessionStorage.removeItem('user');
        window.sessionStorage.removeItem('password');
        this.$router.push({ name: 'Home' });
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
        }
    }
}
</script>