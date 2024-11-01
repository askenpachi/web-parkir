<!-- components/manajemen/ModalBiaya.vue -->
<template>
    <div class="modal-overlay">
      <div class="modal">
        <h3>{{ isEditing ? 'Update Biaya' : 'Tambah Biaya' }}</h3>
  
        <label for="lokasi_id">Lokasi:</label>
        <select v-model="selectedBiaya.lokasi_id" required>
          <option v-for="lokasi in lokasiList" :value="lokasi" :key="lokasi">{{ lokasi }}</option>
        </select>
  
        <label for="harga_per_jam">Harga/jam:</label>
        <input v-model="selectedBiaya.harga_per_jam" type="text" required />
  
        <label for="kategori_kendaraan">Kategori Kendaraan:</label>
        <select v-model="selectedBiaya.kategori_kendaraan" required>
          <option v-for="kategori in kategoriList" :value="kategori" :key="kategori">{{ kategori }}</option>
        </select>
  
        <label for="status">Status:</label>
        <select v-model="selectedBiaya.status">
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
  
        <div class="modal-actions">
          <button @click="saveBiaya" class="save-button">{{ isEditing ? 'Update' : 'Save' }}</button>
          <button @click="cancelEdit" class="cancel-button">Cancel</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  const props = defineProps({
    selectedBiaya: Object,
    lokasiList: Array,
    kategoriList: Array,
    isEditing: Boolean,
  });
  const emits = defineEmits(['saveBiaya', 'cancelEdit']);
  
  const saveBiaya = () => emits('saveBiaya', { ...props.selectedBiaya });
  const cancelEdit = () => emits('cancelEdit');
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
  
  .modal label {
    margin-top: 10px;
    display: block;
  }
  
  .modal input,
  .modal select {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .modal-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  
  .save-button {
    background-color: green;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
  }
  
  .cancel-button {
    background-color: red;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
  }
  </style>
  