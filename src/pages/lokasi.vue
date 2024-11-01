<template>
  <div class="lokasi-container">
    <link rel="stylesheet" href="/src/pages/css/Lokasi.css" />
    <div class="text">
      <h2>Data Lokasi</h2>
    </div>

    <div class="toolbar">
      <input type="text" v-model="searchQuery" class="search-bar" placeholder="Cari lokasi..." />
      <button class="add-button" @click="showAddModal">Tambah Data</button>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th>User</th>
          <th>Alamat Lokasi</th>
          <th>Link Maps</th>
          <th>Foto Lokasi</th>
          <th>Status Foto</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(location, index) in filteredLocations" :key="index">
          <td>{{ location.username }}</td>
          <td>{{ location.alamat_lokasi }}</td>
          <td>
            <a :href="location.link_maps" target="_blank" rel="noopener noreferrer">Lihat di Maps</a>
          </td>
          <td>
            <img :src="getlokasiImageUrl(location.foto_lokasi)" alt="Foto Lokasi" class="lokasi-photo" />
          </td>
          <td>{{ location.status_foto }}</td>
          <td>
            <button @click="showEditModal(location)" class="edit-button">
              <font-awesome-icon icon="edit" />
            </button>
            <button @click="confirmDelete(location.id)" class="delete-button">
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

    <div class="modal-overlay" v-if="isModalOpen">
      <div class="modal">
        <button class="close-button" @click="closeModal">X</button>
        <h3>{{ modalMode === 'add' ? 'Tambah Data Lokasi' : 'Edit Data Lokasi' }}</h3>
        <form @submit.prevent="submitForm">
          <label for="UserID">User</label>
          <select v-model="form.user_id" class="user-select">
            <option v-for="user in users" :key="user.ID" :value="user.ID">{{ user.Name }}</option>
          </select>
          <label for="alamat_lokasi">Alamat Lokasi</label>
          <input type="text" v-model="form.alamat_lokasi" placeholder="Masukkan Alamat Lokasi" />
          <label for="link_maps">Link Google Maps</label>
          <input type="text" v-model="form.link_maps" placeholder="Masukkan URL Google Maps" />
          <label for="images">Foto Lokasi</label>
          <input type="file" @change="handleFileUpload" />
          <label for="status">Status Foto</label>
          <select v-model="form.status_foto">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <input type="hidden" v-model="form.id" />
          <div class="modal-actions">
            <button type="submit" class="save-button">Simpan</button>
            <button type="button" class="cancel-button" @click="closeModal">Batal</button>
          </div>
        </form>
      </div>
    </div>

    <div v-if="alertVisible" class="alert show" @click="alertVisible = false">
      {{ alertMessage }}
    </div>
  </div>
  <footer class="footer">
    <p>© 2024 PT.TEKNOLOGI MULIA SEJAHTERA.</p>
  </footer>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { createLocation, getUsers, getLokasi, updateLocation, deleteLocation } from '../service/location.service';
import { useCustomToast } from '../composables/useCustomToast';
import { getClientFromLocalStorage } from '../helper/main';
import Swal from 'sweetalert2';

interface Location {
  id: number;
  user_id: number;
  username: string;
  alamat_lokasi: string;
  link_maps: string;
  foto_lokasi: string | null;
  status_foto: 'active' | 'inactive';
}

interface LocationForm {
  id?: number;
  user_id: number | null;
  alamat_lokasi: string;
  link_maps: string;
  foto_lokasi: File | null;
  status_foto: 'active' | 'inactive';
  image?: File;
}

interface User {
  ID: number;
  Name: string;
}

const form = ref<LocationForm>({
  user_id: null,
  alamat_lokasi: '',
  link_maps: '',
  foto_lokasi: null,
  status_foto: 'active',
});

const searchQuery = ref<string>('');
const locations = ref<Location[]>([]);
const users = ref<User[]>([]);
const isModalOpen = ref<boolean>(false);
const modalMode = ref<'add' | 'edit'>('add');
const currentPage = ref<number>(1);
const totalPages = ref<number>(1);
const alertVisible = ref<boolean>(false);
const alertMessage = ref<string>('');

const toast = useCustomToast();
const cliendID = getClientFromLocalStorage();

const changePage = (page: number) => {
  currentPage.value = page;
  loadLocations();
};

const closeModal = () => {
  isModalOpen.value = false;
};

const locationsWithUsername = computed((): Location[] => {
  return locations.value.map(location => ({
    ...location,
    username: location.username,
  }));
});

const filteredLocations = computed((): Location[] => {
  return locationsWithUsername.value.filter(location =>
    location.alamat_lokasi.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    location.username.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    const file = target.files[0];
    form.value.image = file;
  }
};

const getlokasiImageUrl = (image: string | null): string => {
  if (image) {
    const updatedImage = image.replace(/^storage\//, 'files/');
    return `${import.meta.env.VITE_API_URL_IMAGE}/${updatedImage}`;
  }
  return '/default-image.png';
};

const loadUsers = async () => {
  try {
    const response = await getUsers();
    if (response.data) {
      users.value = response.data;
    }
  } catch (error) {
    toast.error('Gagal memuat data petugas!');
    console.error('Gagal memuat pengguna:', error);
  }
};

const loadLocations = async () => {
  try {
    const response = await getLokasi({ page: currentPage.value, limit: 10 });
    locations.value = response?.data?.data?.lokasi || [];

    const dataLength = response?.data?.data?.total_count;
    totalPages.value = Math.ceil(dataLength / 10);
  } catch (error) {
    toast.error('Gagal memuat data lokasi!');
    console.error('Gagal memuat lokasi:', error);
  }
};

const showAddModal = () => {
  modalMode.value = 'add';
  isModalOpen.value = true;
  form.value = {
    user_id: users.value.length > 0 ? users.value[0].ID : null,
    alamat_lokasi: '',
    link_maps: '',
    foto_lokasi: null,
    status_foto: 'active',
  };
};

const showEditModal = (locationData: Location) => {
  modalMode.value = 'edit';
  isModalOpen.value = true;
  form.value = {
    id: locationData.id,
    user_id: locationData.user_id,
    alamat_lokasi: locationData.alamat_lokasi,
    link_maps: locationData.link_maps,
    foto_lokasi: null,
    status_foto: locationData.status_foto,
  };
};

const submitForm = async () => {
  try {
    if (!form.value.user_id) {
      toast.error('Silakan pilih user sebelum menyimpan data!');
      return; 
    }

    const locationDataCreate = {
      userId: form.value.user_id,
      clientId: cliendID,
      alamatLokasi: form.value.alamat_lokasi,
      linkMaps: form.value.link_maps,
      fotoLokasi: form.value.image,
      statusFoto: form.value.status_foto,
    };

    const locationDataUpdate = {
      userId: form.value.user_id,
      alamatLokasi: form.value.alamat_lokasi,
      linkMaps: form.value.link_maps,
      fotoLokasi: form.value.image,
      statusFoto: form.value.status_foto,
    };
    
    if (modalMode.value === 'edit') {
      const result = await Swal.fire({
        title: 'Konfirmasi',
        text: 'Apakah Anda yakin ingin memperbarui data lokasi ini?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Ya, Lanjutkan',
        cancelButtonText: 'Batal',
      });

      if (!result.isConfirmed) {
        return;
      }
    }

    if (modalMode.value === 'add') {
      await createLocation(locationDataCreate);
      toast.success('Data lokasi berhasil ditambahkan!');
    } else {
      await updateLocation(form.value.id!, locationDataUpdate);
      toast.success('Data lokasi berhasil diperbarui!');
    }

    closeModal();
    loadLocations();
  } catch (error) {
    toast.error('Gagal menyimpan asa data lokasi!');
    console.error('Gagal menyimpan lokasi:', error);
    toast.error('Gagal menyimpan lokasi!');
  }
};


const confirmDelete = async (locationId: number) => {
  try {
    const result = await Swal.fire({
      title: 'Konfirmasi',
      text: 'Apakah Anda yakin ingin menghapus lokasi ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, hapus',
      cancelButtonText: 'Batal',
    });

    if (!result.isConfirmed) {
      return;
    }

    await deleteLocation(locationId);
    toast.success('Data lokasi berhasil dihapus!');
    loadLocations();
  } catch (error) {
    console.error('Gagal menghapus lokasi:', error);
    toast.error('Gagal menghapus lokasi!');
  }
};

onMounted(() => {
  loadUsers();
  loadLocations();
});
</script>
