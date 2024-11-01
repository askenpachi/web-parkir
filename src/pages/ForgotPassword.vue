<template>
  <div class="forgot-password-container">
    <link rel="stylesheet" href="/src/pages/css/ForgotPassword.css"></link>
    <div class="forgot-password-card">
      <h1>Forgot Password</h1>
      <p>Input your new password</p>
      <form @submit.prevent="resetPassword">
        <input
          type="password"
          v-model="newPassword"
          placeholder="New Password"
          required
        />
        <input
          type="password"
          v-model="confirmPassword"
          placeholder="Confirm Password"
          required
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newPassword: '',
      confirmPassword: ''
    };
  },
  methods: {
    resetPassword() {
      if (this.newPassword === this.confirmPassword) {
        // Implement your password reset logic here
        alert('Password has been reset successfully!');
      } else {
        alert('Passwords do not match!');
      }
    }
  }
};
</script>
