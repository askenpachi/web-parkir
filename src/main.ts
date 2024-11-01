import { createApp } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { 
    faTachometerAlt, faMapMarkerAlt, faUsersCog, faDollarSign, 
    faSignOutAlt, faCheckCircle, faExclamationCircle, faEye, 
    faEyeSlash, faUsers, faUser, faHome, faEnvelope, faBell, 
    faSearch, faPlus, faTrash, faEdit, faCalendarAlt, faChartBar 
} from '@fortawesome/free-solid-svg-icons';
import App from './App.vue';
import router from './router';
import ToastPlugin from 'vue-toast-notification';

library.add(
    faTachometerAlt, faMapMarkerAlt, faUsersCog, faDollarSign, 
    faSignOutAlt, faCheckCircle, faExclamationCircle, faEye, 
    faEyeSlash, faUsers, faUser, faHome, faEnvelope, faBell, 
    faSearch, faPlus, faTrash, faEdit, faCalendarAlt, faChartBar
);

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(ToastPlugin);
app.use(VueSweetalert2);
app.use(router);
app.mount('#app');
a