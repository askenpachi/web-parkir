<template>
  <div class="alert-container">
    <b-alert
      v-if="visible"
      variant="danger"
      dismissible
      @dismissed="handleDismiss"
      class="error-alert"
    >
      <div class="alert-header">
        <button class="close-button" @click="handleDismiss" aria-label="Close alert">
          <font-awesome-icon :icon="['fas', 'times']" />
        </button>
      </div>
      <div class="alert-content">
        <font-awesome-icon class="exclamation-icon" :icon="['fas', 'exclamation-circle']" />
        <div class="alert-text">
          <h4 class="alert-heading">{{ title }}</h4>
          <p>{{ message }}</p>
        </div>
      </div>
    </b-alert>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: 'Error!',
    },
    message: {
      type: String,
      default: 'Email not found', 
    },
  },
  watch: {
    visible(newVal) {
      if (newVal) {
        this.startDismissTimer(); 
      }
    },
  },
  methods: {
    startDismissTimer() {
      setTimeout(() => {
        this.handleDismiss();
      }, 2000);
    },
    handleDismiss() {
      this.$emit('alert-dismissed'); 
    },
  },
};
</script>

<style scoped>
.alert-container {
  position: fixed;
  top: 20px; 
  left: 50%; 
  transform: translateX(-50%);
  z-index: 1000; 
  width: 80%;
  max-width: 250px; 
  box-sizing: border-box;
}

.error-alert {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; 
  padding: 5px; 
  border-radius: 15px; 
  border: 1px solid #d32f2f; 
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  background: linear-gradient(135deg, #ffebee, #ffcdd2);
  color: #b71c1c; 
  animation: fadeIn 0.5s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.alert-header {
  width: 100%;
  display: flex;
  justify-content: flex-end; 
}

.close-button {
  background: transparent; 
  border: none; 
  cursor: pointer;
  color: #000000; 
  font-size: 24px;
  padding: 0; 
  margin-left: 10px; 
}

.alert-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.exclamation-icon {
  color: #b71c1c;
  font-size: 40px; 
  margin-bottom: 10px; 
}

.alert-text {
  text-align: center;
}

.alert-heading {
  font-size: 22px; 
  margin: 0 0 5px; 
  font-weight: bold;
}

.alert-content p {
  margin: 0;
  font-size: 16px; 
}
</style>
    