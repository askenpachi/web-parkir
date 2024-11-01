<template>
    <div class="modal-overlay">
      <div class="modal">
        <h3>{{ isEditing ? 'Update Lokasi' : 'Tambah Lokasi' }}</h3>
        
        <label for="id">ID:</label>
        <input v-model="localLocation.id" type="number" :disabled="isEditing" />
  
        <label for="alamat">Alamat:</label>
        <input v-model="localLocation.alamat" type="text" />
  
        <label for="linkMaps">Link Google Maps:</label>
        <input v-model="localLocation.linkMaps" type="text" />
        
        <label for="foto">Foto Lokasi:</label>
        <input @change="fileChange" type="file" />
        
        <label for="kontak">Kontak:</label>
        <input v-model="localLocation.kontak" type="text" />

        <label for="date">Date:</label>
        <input v-model="localLocation.date" type="date" />
  
  
        <div class="modal-actions">
          <button @click="save" class="save-button">{{ isEditing ? 'Update' : 'Save' }}</button>
          <button @click="cancel" class="cancel-button">Cancel</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits, ref, watch } from 'vue';
  
  const props = defineProps({
    selectedLocation: Object,
    isEditing: Boolean,
  });
  
  const emits = defineEmits(['save', 'cancel', 'fileChange']);
  
  const localLocation = ref({ id: 0, alamat: '', linkMaps: '', foto: '', date: '' ,kontak: ''  });
  
  watch(props.selectedLocation, (newLocation) => {
    if (newLocation) {
      localLocation.value = { ...newLocation };
    }
  });
  
  const save = () => {
    emits('save', localLocation.value);
  };
  
  const cancel = () => {
    emits('cancel');
  };
  
  const fileChange = (event: Event) => {
    emits('fileChange', event);
  };
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
  padding: 30px;
  border-radius: 10px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.3s ease;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  padding: 8px 16px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal h3 {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
}

.modal label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
}

.modal input[type="text"],
.modal input[type="number"],
.modal input[type="date"],
.modal input[type="file"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 2px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.save-button {
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.cancel-button {
  background-color: #dc3545;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.save-button:hover {
  background-color: #218838;
}

.cancel-button:hover {
  background-color: #c82333;
}

  </style>
  