<!-- components/manajemen/PetugasTable.vue -->
<template>
  <table class="table">
    <thead>
      <tr>
        <th>Nama</th>
        <th>Email</th>
        <th>Image</th>
        <th>Status</th>
        <th>Lokasi</th>
        <th>Aksi</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="petugas.length === 0">
        <td colspan="6" style="text-align: center; padding: 20px;">No petugas found</td>
      </tr>
      <tr v-for="(petugas, index) in petugas" :key="index">
        <td>{{ petugas.nama }}</td>
        <td>{{ petugas.email }}</td>
        <td>
          <img :src="petugas.image" alt="Foto Petugas" class="petugas-image" />
        </td>
        <td>
          <span :class="petugas.status === 'Active' ? 'status-active' : 'status-offline'">
            {{ petugas.status }}
          </span>
        </td>
        <td>{{ petugas.lokasi }}</td>
        <td>
          <button @click="$emit('editPetugas', petugas)" class="edit-button">Edit</button>
          <button @click="$emit('deletePetugas', index)" class="delete-button">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
const props = defineProps({
  petugas: Array,
});
const emits = defineEmits(['editPetugas', 'deletePetugas']);
</script>

<style scoped>
/* CSS specific to PetugasTable */
.table {
  width: 100%;
  border-collapse: collapse;
}

.table th, .table td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
}

.petugas-image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.status-active {
  color: green;
}

.status-offline {
  color: red;
}

.edit-button {
  background-color: blue;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.delete-button {
  background-color: red;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}
</style>
