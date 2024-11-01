<!-- components/manajemen/SearchBarBiaya.vue -->
<template>
    <div class="toolbar">
      <input 
        :value="search" 
        @input="$emit('update:search', $event.target.value)" 
        type="text" 
        placeholder="Search" 
        class="search-bar" 
      />
      <button @click="$emit('openAddModal')" class="add-button">+</button>
    </div>
  </template>
  
  <script setup lang="ts">
  const props = defineProps({
    search: String,
  });
  
  const emits = defineEmits(['openAddModal', 'update:search']);
  </script>
  
  <style scoped>
  .toolbar {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  
  .search-bar {
    padding: 8px;
    width: 300px;
    border-radius: 5px;
    border: 3px solid #000000;
    background-color: #ffffff;
  }
  
  .add-button {
    background-color: rgb(0, 255, 98);
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    padding: 8px 16px;
  }
  </style>
  