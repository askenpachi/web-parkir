<!-- components/manajemen/ModalPetugas.vue -->
<template>
    <div class="modal-overlay">
      <div class="modal">
        <h3>{{ isEditing ? 'Update Petugas' : 'Tambah Petugas' }}</h3>
  
        <label for="nama">Nama:</label>
        <input v-model="localPetugas.nama" type="text" required />
  
        <label for="email">Email:</label>
        <input v-model="localPetugas.email" type="email" required />
  
        <label for="image">Foto:</label>
        <input @change="fileChange" type="file" />
  
        <label for="status">Status:</label>
        <select v-model="localPetugas.status">
          <option value="Active">Active</option>
          <option value="Offline">Offline</option>
        </select>
  
        <label for="lokasi">Lokasi:</label>
        <select v-model="localPetugas.lokasi" required>
          <option v-for="city in cities" :value="city" :key="city">{{ city }}</option>
        </select>
  
        <div class="modal-actions">
          <button @click="save" class="save-button">{{ isEditing ? 'Update' : 'Save' }}</button>
          <button @click="cancel" class="cancel-button">Cancel</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  const props = defineProps({
    petugas: Object,
    cities: Array,
    isEditing: Boolean,
  });
  const emits = defineEmits(['save', 'cancel', 'fileChange']);
  
  const localPetugas = ref({ nama: '', email: '', image: '', status: 'Active', lokasi: '' });
  
  watch(() => props.petugas, (newVal) => {
    if (newVal) {
      localPetugas.value = { ...newVal };
    }
  });
  
  const save = () => emits('save', localPetugas.value);
  const cancel = () => emits('cancel');
  const fileChange = (e: Event) => emits('fileChange', e);
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    width: 400px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .modal-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  
  .save-button, .cancel-button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .save-button {
    background-color: green;
    color: white;
  }
  
  .cancel-button {
    background-color: red;
    color: white;
  }
  </style>
  