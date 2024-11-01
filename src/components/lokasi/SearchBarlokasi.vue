<template>
  <div class="toolbar">
    <input :value="search" @input="updateSearch" type="text" placeholder="Cari Lokasi" class="search-bar" />
    <button @click="openModal" class="add-button">+</button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

// Define props
const props = defineProps({
  search: String, // Search value passed from parent
});

// Define emits
const emits = defineEmits(['update:search', 'openModal']);

// Emit event when the input value changes
const updateSearch = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emits('update:search', target.value);
};

// Emit openModal event when the button is clicked
const openModal = () => {
  emits('openModal');
};
</script>

<style scoped>
  .search-bar {
    padding: 8px;
    width: 300px;
    border-radius: 5px;
    border: 3px solid #000000;
    background-color: #ffffff;
  }
  .toolbar {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
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
