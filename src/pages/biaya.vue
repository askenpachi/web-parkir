<template>
  <div class="biaya-container">
    <link rel="stylesheet" href="/src/pages/css/biaya.css">

    <div class="text">
      <h2>Biaya</h2>
    </div>
    <div class="toolbar">
      <input v-model="search" type="text" placeholder="Cari Biaya" class="search-bar" />
      <label for="lokasi_id">Lokasi: </label>
      <select v-model="selectedLokasi" required class="select-lokasi">
        <option v-for="lokasi in lokasi" :value="lokasi" :key="lokasi.id" :selected="lokasi.id === selectedLokasi.id">
          {{ lokasi.alamat_lokasi }}
        </option>
      </select>
      <button @click="openAddModal" class="add-button">Tambahkan Biaya<i class="fa fa-plus"></i></button>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th>No</th>
          <th>Harga/Jam</th>
          <th>Kategori Kendaraan</th>
          <th>Status</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="filteredBiaya.length === 0">
          <td colspan="6" style="text-align: center; padding: 20px;">No client found</td>
        </tr>
        <tr v-for="(biayaList, index) in filteredBiaya" :key="biayaList.id">
          <td>{{ index + 1 }}</td>
          <td>{{ biayaList.harga }}</td>
          <td>{{ biayaList.kategori_kendaraan }}</td>
          <td>{{ biayaList.status_harga }}</td>
          <td>
            <button @click="editBiaya(biayaList)" class="edit-button">
              <font-awesome-icon icon="edit" />
            </button>
            <button @click="confirmDelete(biayaList.id)" class="delete-button">
              <font-awesome-icon icon="trash" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="pagination">
      <button :disabled="currentPage === 1" @click="changePage(currentPage - 1)">Previous</button>
      <button v-for="page in totalPages" :key="page" @click="changePage(page)">{{ page }}</button>
      <button :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)">Next</button>
    </div>

    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <h3>{{ isEditing ? 'Update Biaya' : 'Tambah Biaya' }}</h3>

        <form @submit.prevent="submitForm">
          <label for="lokasi_id">Lokasi: </label>
          <select v-model="form.lokasi_id" required>
            <option value="" disabled>Pilih Lokasi</option>
            <option v-for="lokasi in lokasi" :value="lokasi.id" :key="lokasi.id">{{ lokasi.alamat_lokasi }}</option>
          </select>

          <label for="harga">Harga/Jam:</label>
          <input v-model="form.harga" type="number" required />

          <label for="kategori_kendaraan">Kategori Kendaraan:</label>
          <input v-model="form.kategori_kendaraan" type="text" required />

          <label for="status">Status:</label>
          <select v-model="form.status_harga">
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <div class="modal-actions">
            <button type="submit" class="save-button">{{ isEditing ? 'Update' : 'Save' }}</button>
            <button type="button" class="cancel-button" @click="closeModal">Batal</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <footer class="footer">
      <p>© 2024 PT.TEKNOLOGI MULIA SEJAHTERA</p>
  </footer>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import Swal from 'sweetalert2';
import { getLokasi, getHargaParkir, createHargaParkir, updateHargaParkir, deleteHargaParkir } from '../service/biaya.service.ts'
import { useCustomToast } from '../composables/useCustomToast.ts';

interface Lokasi {
  id: number;
  alamat_lokasi: string;
}

interface Biaya {
  id: number;
  lokasi_id: number;
  harga: number;
  kategori_kendaraan: string;
  status_harga: string;
}

const lokasi = ref<Lokasi[]>([]);
const biayaList = ref<Biaya[]>([]);
const search = ref('');
const showModal = ref(false);
const isEditing = ref(false);
const selectedLokasiId = ref<number>(0);
const currentPage = ref(1);
const totalPages = ref(1);

const toast = useCustomToast();

const filteredBiaya = computed(() =>
  biayaList.value.filter(biaya =>
    biaya.kategori_kendaraan.toLowerCase().includes(search.value.toLowerCase())
  )
);

const selectedLokasi = ref<Lokasi>({ 
  id: 0,
  alamat_lokasi: '',
});

const changePage = (page: number) => {
  currentPage.value = page;
  loadHargaParkir();
};

watch(selectedLokasiId, async (newValue) => {
  if (newValue !== 0) {
    await loadHargaParkir();
  }
}, { immediate: true });

watch(selectedLokasi, (newValue) => {
  if (newValue) {
    selectedLokasiId.value = newValue.id;
  }
}, { immediate: true });

const form = ref<Biaya>({
  id: 0,
  lokasi_id: 0,
  harga: 0,
  kategori_kendaraan: '',
  status_harga: '',
})

const openAddModal = () => {
  form.value = {
    id: 0,
    lokasi_id: 0,
    harga: 0,
    kategori_kendaraan: '',
    status_harga: '',
  };
  isEditing.value = false;
  showModal.value = true;
};


const editBiaya = (biaya: Biaya) => {
  form.value = { ...biaya };
  isEditing.value = true;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const loadLokasi = async () => {
  try {
    const response = await getLokasi({ page: 1, limit: 100 });
    if (response.data) {
      lokasi.value = response.data.data;
      if (lokasi.value.length > 0) {
        selectedLokasi.value = lokasi.value[0];
      }
    }
  } catch (error) {
    toast.error('Gagal memuat data petugas!');
    console.error('Gagal memuat pengguna:', error);
  }
};

const loadHargaParkir = async () => {
  try {
    const response = await getHargaParkir({ page: 1, limit: 100 }, selectedLokasiId.value);
    if (response.data) {
      biayaList.value = response?.data?.data || [];
      
    }
  } catch (error) {
    toast.error('Gagal memuat data petugas!');
    console.error('Gagal memuat pengguna:', error);
  }
};

const submitForm = async () => {
  if (isEditing.value) {
    const result = await Swal.fire({
      title: 'Konfirmasi Update',
      text: 'Apakah Anda yakin ingin mengupdate data ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, update!',
      cancelButtonText: 'Batal'
    });

    if (result.isConfirmed) {
      // Proceed with updating the data
      await updateHargaParkir(form.value.id, {
        id: form.value.id,
        harga: form.value.harga,
        kategori_kendaraan: form.value.kategori_kendaraan,
        status_harga: form.value.status_harga,
      });
      toast.success('Data berhasil diupdate');
      closeModal();
      loadHargaParkir();
    }
  } else {
    // Handle adding new data
    await createHargaParkir(form.value);
    toast.success('Data berhasil ditambahkan');
    closeModal();
    loadHargaParkir();
  }
};

const confirmDelete = async (id: number) => {
  const result = await Swal.fire({
    title: 'Konfirmasi Hapus',
    text: 'Apakah Anda yakin ingin menghapus data ini?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Ya, hapus!',
    cancelButtonText: 'Batal'
  });

  if (result.isConfirmed) {
    await deleteHargaParkir(id);
    toast.success('Data berhasil dihapus');
    loadHargaParkir();
  }
};


onMounted(() => {
  loadLokasi()
});
</script>

<style scoped>
.manajemen-biaya-container {
  margin: 20px;
}

.text h2 {
  font-size: 28px;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  color: #333;
}
</style>
