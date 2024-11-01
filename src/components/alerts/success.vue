<template>
    <div class="alert-container">
      <b-alert
        v-if="visible"
        variant="success"
        dismissible
        @dismissed="handleDismiss"
        class="success-alert"
      >
        <div class="alert-content">
          <div class="icon-container">
            <font-awesome-icon class="check-icon" :icon="['fas', 'check-circle']" />
          </div>
          <div class="alert-text">
            <h4 class="alert-heading">{{ title }}</h4>
            <p>{{ message }}</p>
          </div>
        </div>
        <b-progress
          variant="success"
          :max="dismissSecs"
          :value="dismissCountDown"
          height="4px"
        ></b-progress>
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
        default: 'Success!',
      },
      message: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        dismissSecs: 3,
        dismissCountDown: 0,
      };
    },
    watch: {
      visible(newValue) {
        if (newValue) {
          this.startCountDown();
        }
      },
    },
    methods: {
      startCountDown() {
        this.dismissCountDown = this.dismissSecs;
        const interval = setInterval(() => {
          if (this.dismissCountDown > 0) {
            this.dismissCountDown--;
          } else {
            clearInterval(interval);
            this.$emit('alert-dismissed'); 
          }
        }, 1000);
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
    transition: transform 0.3s ease-in-out; 
  }
  
  .success-alert {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; 
    padding: 20px;
    border-radius: 15px; 
    border: 1px solid #00796b;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3); 
    background: linear-gradient(135deg, #e0f7fa, #b2ebf2); 
    color: #004d40; 
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
  
  .alert-content {
    display: flex;
    flex-direction: column; 
    align-items: center; 
  }
  
  .icon-container {
    margin-bottom: 10px; 
  }
  
  .check-icon {
    color: #00796b;
    font-size: 40px; 
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
  