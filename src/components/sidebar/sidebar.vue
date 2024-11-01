<!-- src/components/sidebar/Sidebar.vue -->
<template>
  <div class="sidebar" :class="{ 'sidebar-hidden': !isSidebarVisible }">
    <div class="logo">
      <img src="/src/assets/P2 1.png" alt="" />
    </div>
    <nav>
      <ul>
        <li>
          <router-link to="/Dashboard/home" active-class="active-link">
            <font-awesome-icon :icon="['fas', 'tachometer-alt']" />
            <span>Dashboard</span>
          </router-link>
        </li>
        <li>
          <router-link to="/Dashboard/DownloadReport" active-class="active-link">
            <font-awesome-icon :icon="['fas', 'tachometer-alt']" />
            <span>Download Report</span>
          </router-link>
        </li>
        <li>
          <router-link to="/Dashboard/Client" active-class="active-link">
            <font-awesome-icon :icon="['fas', 'users-cog']" />
            <span>Client</span>
          </router-link>
        </li>
        <li>
          <router-link to="/Dashboard/ManajemenAdmin" active-class="active-link">
            <font-awesome-icon :icon="['fas', 'users-cog']" />
            <span>Manajemen Admin</span>
          </router-link>
        </li>
        <li>
          <router-link to="/" active-class="active-link">
            <font-awesome-icon :icon="['fas', 'sign-out-alt']" />
            <span>Logout</span>
          </router-link>
        </li>
      </ul>
    </nav>
    <Footer />
  </div>
</template>

<script setup>
import Footer from "../footer/Footer.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { ref } from 'vue';

const isSidebarVisible = ref(true);
</script>

<style scoped>
/* Masukkan CSS yang terkait dengan sidebar di sini */
</style>
