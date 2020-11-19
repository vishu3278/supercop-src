import Vue from 'vue'
import VueRouter from 'vue-router'
import VCalendar from 'v-calendar'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import Logout from '../components/Logout.vue'
import AddAadhar from '../components/AddAadhar.vue'
import ListAadhar from '../views/ListAadhar.vue'
import VleAdd from '../components/VleAdd.vue'
import VleList from '../views/VleList.vue'

Vue.use(VueRouter)
Vue.use(VCalendar)

const routes = [
    // { path: '/', name: 'Home', component: Home },
    { path: '/dashboard', name: 'Dashboard', component: Dashboard },
    { path: '/addaadhar', name: 'AddAadhar', component: AddAadhar },
    { path: '/listaadhar', name: 'ListAadhar', component: ListAadhar },
    { path: '/logout', name: 'Logout', component: Logout },
    { path: '/', name: 'Home', component: Home },
    { path: '/vleadd', name: 'VLEAdd', component: VleAdd },
    { path: '/vlelist', name: 'VLEList', component: VleList }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router