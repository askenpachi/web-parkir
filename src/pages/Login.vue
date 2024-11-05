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
    <!-- Logo Section -->
    <div class="logo-section">
      <img src="../assets/P2 1.png" alt="Logo Parkir" class="logo-image" />
    </div>

    <!-- Login Form Section -->
    <div class="login-form">
      <div class="sign-in-section">
        <h2>Admin Log In</h2>
        <p>Silahkan Login Untuk Akses Dashboard Admin</p>
        <input type="email" v-model="email" placeholder="Username" />
        
        <div class="password-field">
          <input
            :type="passwordVisible ? 'text' : 'password'"
            v-model="password"
            placeholder="Password"
          />
          
        </div>
        
       
        <button @click="signIn">Log In</button>
        <!-- <a @click.prevent="goToForgotPassword" class="forgot-password" href="#">Forgot Password?</a> -->
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
       
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import Swal from 'sweetalert2';
  import AuthService from '../service/auth.service';
  
  const email = ref('');
  const password = ref('');
  const passwordVisible = ref(false);
  const errorMessage = ref('');
  const router = useRouter();  
  const signIn = async () => {
    try {
      const response = await AuthService.login({ email: email.value, password: password.value });
      if (response.meta.code === 200 || response.meta.code === 201) {
        Swal.fire({
          title: 'Berhasil Login',
          text: 'Anda berhasil login!',
          icon: 'success',
          confirmButtonText: 'Lanjutkan'
        }).then(() => {
          const role = response.data.role;
          if (role === "superadmin" || role === "") {
            router.push('/Dashboard');
          } else {
            Swal.fire({
              title: 'Role tidak dikenali',
              text: 'Peran Anda tidak dikenali dalam sistem.',
              icon: 'error'
            });
          }
        });
      }
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      errorMessage.value = error.response?.data?.message || 'Terjadi kesalahan!';
      Swal.fire({
        title: 'Error',
        text: errorMessage.value,
        icon: 'error'
      });
    }
  };
  
  const goToForgotPassword = () => {
    router.push('/lupapw');
  };
  
  const togglePasswordVisibility = () => {
    passwordVisible.value = !passwordVisible.value;
  };
  </script>
  