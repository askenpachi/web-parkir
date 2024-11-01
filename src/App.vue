<template>
<router-view />
  <div id="app">
    <div class="app-container">
    </div>
  </div>
</template>

<script setup>
import dashboardadmin from './pages/DashboardAdmin.vue'; 
import Dashboard from './pages/super-admin/Dashboard.vue';
</script>

<style scoped>
.app-container {
  display: flex;
}

.main-content {
  flex: 1;
  padding: 20px;
}
</style>