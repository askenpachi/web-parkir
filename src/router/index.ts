import { createRouter, createWebHistory } from 'vue-router';
import LupaPw from '../pages/LupaPw.vue';
import LupaEmail from '../pages/LupaEmail.vue';
import Login from '../pages/Login.vue';
import DashboardAdmin from '../pages/DashboardAdmin.vue';
import Dashboard from '../pages/super-admin/Dashboard.vue';
import Client from '../pages/Client.vue';
import ManajemenPetugas from '../pages/ManajemenPetugas.vue';
import biaya from '../pages/Biaya.vue';
import home from '../components/home.vue';
import error from '../components/alerts/error.vue';
import success from '../components/alerts/success.vue'; 
import ManajemenAdmin from '../pages/ManajemenAdmin.vue';
import lokasi from '../pages/Lokasi.vue';
import DownloadReport from '../pages/DownloadReport.vue';
import grafik from '../components/grafik.vue';
import Report from '../pages/Report.vue';


const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login, 
  },
  {
    path: '/lupaemail',
    name: 'lupaemail',
    component: LupaEmail,
  },
  {
    path: '/lupapw',
    name: 'lupapw',
    component: LupaPw,
  },
  {
    path: '/error',
    name: 'error',
    component: error,
  },
  {
    path: '/succes',
    name: 'succes',
    component: success,
  },
  {
    path: '/Dashboard',
    name: 'Dashboard',
    component: Dashboard,
    children: [
      {
        path: 'DownloadReport', 
        name: 'DownloadReport',
        component: DownloadReport,
      },
      {
        path: 'home', 
        name: 'home',
        component: home,
      },
      {
        path: 'ManajemenAdmin', 
        name: 'ManajemenAdmin',
        component: ManajemenAdmin,
      },
      {
        path: 'Client', 
        name: 'Client',
        component: Client,
      },
    ],
  },
  {
    path: '/dashboardadmin',
    name: 'dashboard',
    component: DashboardAdmin,
    children: [
      {
        path: 'biaya', 
        name: 'biaya',
        component: biaya,
      },
      {
        path: 'grafik', 
        name: 'grafik',
        component: grafik,
      },
      {
        path: 'DownloadReport', 
        name: 'Report',
        component: Report,
      },
      {
        path: 'ManajemenPetugas', 
        name: 'ManajemenPetugas',
        component: ManajemenPetugas,
      },
      {
        path: 'lokasi', 
        name: 'lokasi',
        component: lokasi,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
