<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref('');
const router = useRouter();

const resetPassword = () => {
  console.log('Password reset link sent to:', email.value);
};
</script>

<template>
    <link rel="stylesheet" href="/src/pages/css/LupaEmail.css"></link>
  <div class="forgot-password-container">
    <div class="img">
      <img src="../assets/Forgot Password Page (2).png" alt="Background" />
    </div>
    <div class="forgot-password-box">
      <h2>Forgot Password</h2>
      <p>Please Input your email</p>
      <input type="email" v-model="email" placeholder="Email" />
      <button @click="resetPassword">Reset Password</button>
    </div>
  </div>
</template>