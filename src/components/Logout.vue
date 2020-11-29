<template>
    <div>
        <p>{{name}}</p>
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
    mounted: function() {
        window.sessionStorage.removeItem('user');
        window.sessionStorage.removeItem('password');
        this.$store.dispatch('resetStore');
        this.$router.push({ name: 'Home' });
    },
    methods: {
        list: function() {


        }
    }
}
</script>