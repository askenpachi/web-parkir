<!-- src/pages/super-admin/Dashboard.vue -->
<template>
  <div class="dashboard-container">
    <link rel="stylesheet" href="/src/pages/css/DashboardAdmin.css" />
    <Sidebar :isSidebarVisible="isSidebarVisible" />
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
import Sidebar from "../../components/sidebar/Sidebar.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const isSidebarVisible = ref(true);

const toggleSidebar = () => {
  isSidebarVisible.value = !isSidebarVisible.value;
};
</script>

<style scoped>
/* CSS khusus untuk halaman Dashboard bisa dimasukkan di sini */
</style>
