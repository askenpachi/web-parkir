<!-- src/components/sidebar/Sidebar.vue -->
<template>
  <div class="sidebar" :class="{ 'sidebar-hidden': !isSidebarVisible }">
    <div class="logo">
      <img src="/src/assets/P2 1.png" alt="Logo" />
    </div>
    <button class="toggle-btn" @click="toggleSidebar">
      <font-awesome-icon :icon="['fas', isSidebarVisible ? 'angle-left' : 'angle-right']" />
    </button>
    <nav>
      <ul>
        <li>
          <router-link to="/Dashboard/home" active-class="active-link">
            <font-awesome-icon :icon="['fas', 'tachometer-alt']" />
            <span v-if="isSidebarVisible">Dashboard</span>
          </router-link>
        </li>
        <li>
          <router-link to="/Dashboard/DownloadReport" active-class="active-link">
            <font-awesome-icon :icon="['fas', 'tachometer-alt']" />
            <span v-if="isSidebarVisible">Download Report</span>
          </router-link>
        </li>
        <li>
          <router-link to="/Dashboard/Client" active-class="active-link">
            <font-awesome-icon :icon="['fas', 'users-cog']" />
            <span v-if="isSidebarVisible">Client</span>
          </router-link>
        </li>
        <li>
          <router-link to="/Dashboard/ManajemenAdmin" active-class="active-link">
            <font-awesome-icon :icon="['fas', 'users-cog']" />
            <span v-if="isSidebarVisible">Manajemen Admin</span>
          </router-link>
        </li>
        <li>
          <router-link to="/" active-class="active-link">
            <font-awesome-icon :icon="['fas', 'sign-out-alt']" />
            <span v-if="isSidebarVisible">Logout</span>
          </router-link>
        </li>
      </ul>
    </nav>
    <Footer v-if="isSidebarVisible" />
  </div>
</template>

<script setup>
// import Footer from "../footer/Footer.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { ref } from 'vue';

const isSidebarVisible = ref(true);

const toggleSidebar = () => {
  isSidebarVisible.value = !isSidebarVisible.value;
};
</script>

<style scoped>
.sidebar {
  width: 240px;
  transition: width 0.3s ease;
  background-color: #333;
  color: #fff;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.sidebar-hidden {
  width: 80px;
}

.logo img {
  width: 80%;
  margin: 20px 0;
  transition: transform 0.3s;
}

.toggle-btn {
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 1.5rem;
  position: absolute;
  top: 20px;
  right: -15px;
  background-color: #444;
  border-radius: 50%;
  padding: 5px;
  transition: transform 0.3s;
}

nav ul {
  list-style: none;
  padding: 0;
  width: 100%;
}

nav ul li {
  width: 100%;
  margin: 10px 0;
}

nav ul li a {
  display: flex;
  align-items: center;
  padding: 10px;
  color: #fff;
  text-decoration: none;
  transition: background-color 0.3s;
}

nav ul li a:hover {
  background-color: #555;
}

nav ul li a span {
  margin-left: 10px;
}

.active-link {
  background-color: #555;
}

.sidebar-hidden .logo img,
.sidebar-hidden nav ul li a span {
  transform: scale(0.8);
}

.sidebar-hidden nav ul li a span {
  display: none;
}
</style>
