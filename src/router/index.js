import Vue from 'vue'
import VueRouter from 'vue-router'
import VCalendar from 'v-calendar'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import RemoveBG from '../print/RemoveBG.vue'
import Logout from '../components/Logout.vue'
import ScanCard from '../components/ScanCard.vue'
import AadhaarAdd from '../components/AadhaarAdd.vue'
import AadharList from '../views/AadharList.vue'
import AadharPrint from '../print/AadhaarPrint.vue'
import VleAdd from '../components/VleAdd.vue'
import PanAdd from '../components/AddPan.vue'
import VoterAdd from '../components/VoterAdd.vue'
import DrivingAdd from '../components/DrivingAdd.vue'
import SmartAdd from '../components/SmartAdd.vue'
import VleList from '../views/VleList.vue'
import PanList from '../views/PanList.vue'
import DrivingList from '../views/DrivingList.vue'
import VoterList from '../views/VoterList.vue'
import SmartList from '../views/SmartList.vue'

Vue.use(VueRouter)
Vue.use(VCalendar)

const routes = [
    // { path: '/', name: 'Home', component: Home },
    { path: '/dashboard', name: 'Dashboard', component: Dashboard },
    { path: '/removebg', name: 'RemoveBG', component: RemoveBG },
    { path: '/scancard', name: 'ScanCard', component: ScanCard },
    { path: '/aadhaaradd', name: 'AadhaarAdd', component: AadhaarAdd },
    { path: '/aadharlist', name: 'AadharList', component: AadharList },
    { path: '/aadharprint', name: 'AadharPrint', component: AadharPrint },
    { path: '/logout', name: 'Logout', component: Logout },
    { path: '/', name: 'Home', component: Home },
    { path: '/vleadd', name: 'VLEAdd', component: VleAdd },
    { path: '/panadd', name: 'PANAdd', component: PanAdd },
    { path: '/voteradd', name: 'VoterAdd', component: VoterAdd },
    { path: '/drivingadd', name: 'DrivingAdd', component: DrivingAdd },
    { path: '/smartadd', name: 'SmartAdd', component: SmartAdd },
    { path: '/vlelist', name: 'VLEList', component: VleList },
    { path: '/panlist', name: 'PANList', component: PanList },
    { path: '/drivinglist', name: 'DrivingList', component: DrivingList },
    { path: '/voterlist', name: 'VoterList', component: VoterList },
    { path: '/smartlist', name: 'SmartList', component: SmartList }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router