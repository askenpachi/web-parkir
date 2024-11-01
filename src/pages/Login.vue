<template>
  <SuccessAlert 
    :visible="showSuccessAlert" 
    :title="'Success Login'" 
    :message="successMessage" 
    @alert-dismissed="showSuccessAlert = false" 
  />
  
  <ErrorAlert 
    :visible="showErrorAlert" 
    :title="'Email Tidak Ditemukan!!'" 
    :message="errorMessage" 
    @alert-dismissed="showErrorAlert = false" 
  />
  <link rel="stylesheet" href="/src/pages/css/login.css"></link>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Poppins:wght@400;500&display=swap" rel="stylesheet">

  <div class="login-container">
    <div class="login-logo">
    </div>
    
    <div class="login-form">
      <img src="../assets/P2 1.png" alt="Logo Parkir" />
      <div class="sign-in-section">
        <h2>Sign In</h2>
        <input type="email" v-model="email" placeholder="Email" />
        
        <div class="password-field">
          <input
            :type="passwordVisible ? 'text' : 'password'"
            v-model="password"
            placeholder="Password"
          />
          <span @click="togglePasswordVisibility" class="eye-icon">
            <font-awesome-icon :icon="passwordVisible ? 'eye-slash' : 'eye'" />
          </span>
        </div>
        
        <a @click.prevent="goToForgotPassword" class="forgot-password" href="#">Forgot Password?</a>
        <button @click="signIn">Sign In</button>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AuthService from '../service/auth.service';
import SuccessAlert from '../components/alerts/success.vue';
import ErrorAlert from '../components/alerts/error.vue';

const email = ref('');
const password = ref('');
const passwordVisible = ref(false);
const errorMessage = ref(''); 
const successMessage = ref('');
const showSuccessAlert = ref(false);
const showErrorAlert = ref(false);
const router = useRouter();

const signIn = async () => {
  try {
    const response = await AuthService.login({ email: email.value, password: password.value });
    if (response.meta.code === 200 || response.meta.code === 201) {
      successMessage.value = 'Login successful';
      showSuccessAlert.value = true; 
      
      setTimeout(() => {
        const role = response.data.role;
        if (role === "superadmin") {
          router.push('/Dashboard');
        } else {
          if (role === "admin") {
            router.push('/Dashboard');
          }
          errorMessage.value = 'Role tidak dikenali.';
          showErrorAlert.value = true;
        }
      }, 3000); 
    }
  } catch (err) {
    const error = err as { response?: { data?: { message?: string } } };
    errorMessage.value = error.response?.data?.message || 'Terjadi kesalahan!.';
    showErrorAlert.value = true;
  }
};

const goToForgotPassword = () => {
  router.push('/lupapw');
};

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};
</script>
