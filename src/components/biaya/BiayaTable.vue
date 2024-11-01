<!-- components/manajemen/BiayaTable.vue -->
<template>
    <table class="table">
      <thead>
        <tr>
          <th>Lokasi</th>
          <th>Harga/jam</th>
          <th>Kategori Kendaraan</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="filteredBiaya.length === 0">
          <td colspan="6" style="text-align: center; padding: 20px;">No biaya found</td>
        </tr>
        <tr v-for="(biaya, index) in filteredBiaya" :key="index">
          <td>{{ biaya.lokasi_id }}</td>
          <td>{{ biaya.harga_per_jam }}</td>
          <td>{{ biaya.kategori_kendaraan }}</td>
          <td>
            <span :class="biaya.status === 'Active' ? 'status-active' : 'status-inactive'">
              {{ biaya.status }}
            </span>
          </td>
          <td>
            <button @click="$emit('editBiaya', biaya)" class="edit-button">Edit</button>
            <button @click="$emit('deleteBiaya', biaya.id)" class="delete-button">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </template>
  
  <script setup lang="ts">
  const props = defineProps({
    filteredBiaya: Array,
  });
  const emits = defineEmits(['editBiaya', 'deleteBiaya']);
  </script>
  
  <style scoped>
  .table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .table th, .table td {
    border: 1px solid #ccc;
    padding: 10px;
    text-align: left;
  }
  
  .status-active {
    color: green;
  }
  
  .status-inactive {
    color: red;
  }
  
  .edit-button, .delete-button {
    background-color: rgb(0, 255, 98);
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    padding: 8px 16px;
    margin-right: 5px;
  }
  
  .delete-button {
    background-color: red;
  }
  </style>
  