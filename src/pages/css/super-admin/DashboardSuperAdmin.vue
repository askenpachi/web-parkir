<template>
  <div class="dashboard-container">
    <link rel="stylesheet" href="/src/pages/css/DashboardAdmin.css"></link>
    <div class="sidebar" :class="{ 'sidebar-hidden': !isSidebarVisible }">
      <div class="logo">
        <img src="/src/assets/P2 1.png" alt="" srcset="" />
      </div>
      <nav>
        <ul>
          <li>
            <router-link to="/DashboardSuperAdmin/home" active-class="active-link">
              <font-awesome-icon :icon="['fas', 'tachometer-alt']" />
              <span>Dashboard</span>
            </router-link>
          </li>
          <li>
            <router-link to="/DashboardSuperAdmin/Client" active-class="active-link">
              <font-awesome-icon :icon="['fas', 'users-cog']" />
              <span>Client</span>
            </router-link>
          </li>
          <li>
            <router-link to="/DashboardSuperAdmin/ManajemenAdmin" active-class="active-link">
              <font-awesome-icon :icon="['fas', 'users-cog']" />
              <span>Manajemen Admin</span>
            </router-link>
          </li>
          <li>
            <router-link to="/DashboardSuperAdmin/ManajemenPetugas" active-class="active-link">
              <font-awesome-icon :icon="['fas', 'users-cog']" />
              <span>Manajemen Petugas</span>
            </router-link>
          </li>
          <li>
            <router-link to="/DashboardSuperAdmin/lokasi" active-class="active-link">
              <font-awesome-icon :icon="['fas', 'map-marker-alt']" />
              <span>Lokasi</span>
            </router-link>
          </li>
          <li>
            <router-link to="/DashboardSuperAdmin/biaya" active-class="active-link">
              <font-awesome-icon :icon="['fas', 'dollar-sign']" />
              <span>Biaya</span>
            </router-link>
          </li>
          <li>
            <router-link to="#" active-class="active-link">
              <font-awesome-icon :icon="['fas', 'sign-out-alt']" />
              <span>Logout</span>
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
    <div class="main-content">
      <button class="toggle-button" @click="toggleSidebar">
        <font-awesome-icon :icon="['fas', isSidebarVisible ? 'times' : 'bars']" />
      </button>
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const isSidebarVisible = ref(true);

const toggleSidebar = () => {
  isSidebarVisible.value = !isSidebarVisible.value;
};

const logout = () => {
  localStorage.removeItem('superadmin');
  window.location.href = '/'; 
};
</script>
