<template>
  <div class="client-container">
    <link rel="stylesheet" href="/src/pages/css/client.css" />

    <div class="text">
      <h2>Client</h2>
    </div>
    <div class="toolbar">
      <input v-model="searchQuery" type="text" placeholder="Cari Client" class="search-bar" />
      <button @click="showAddModal" class="add-button">
        Tambahkan Client<i class="fa fa-plus"></i>
      </button>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th>No</th>
          <th>User</th>
          <th>Client</th>
          <th>Kontak</th>
          <th>Tanggal Bergabung</th>
          <th>Tanggal Masa Berlaku Aplikasi</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="filteredClients.length === 0">
          <td colspan="6" style="text-align: center; padding: 20px;">No client found</td>
        </tr>
        <tr v-for="(client, index) in filteredClients" :key="client.id">
          <td>{{ index + 1 }}</td>
          <td>{{ client.Name }}</td>
          <td>{{ client.client }}</td>
          <td>{{ client.kontak_telepon_client }}</td>
          <td>{{ formatDate(client.tanggal_bergabung) }}</td>
          <td>{{ formatDate(client.tanggal_masa_berlaku_aplikasi) }}</td>
          <td>
            <button @click="showEditModal(client)" class="edit-button">
              <font-awesome-icon icon="edit" />
            </button>
            <button @click="confirmDelete(client.id)" class="delete-button">
              <font-awesome-icon icon="trash" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="isModalOpen" class="modal-overlay">
      <div class="modal">
        <h3>{{ modalMode === 'edit' ? 'Update Client' : 'Tambah Client' }}</h3>
        <form @submit.prevent="submitForm">
        <label v-if="modalMode !== 'edit'" for="UserID">Pilih Admin:</label>
        <select v-if="modalMode !== 'edit'" v-model="form.user_id" required>
              <option :value="null" disabled selected>Pilih Admin</option>
              <option v-for="user in users" :key="user.ID" :value="user.ID">
                {{ user.Name }}
              </option>
            </select>
        <label for="nama">Nama:</label>
        <input v-model="form.client" type="text" required />

        <label for="kontak">Kontak:</label>
        <input v-model="form.kontak_telepon_client" type="text" required />

        <label for="tanggalBergabung">Tanggal Bergabung:</label>
        <input v-model="form.tanggal_bergabung" type="date" required />

        <label for="tanggalMasaBerlaku">Tanggal Masa Berlaku:</label>
        <input v-model="form.tanggal_masa_berlaku_aplikasi" type="date" required />

        <div class="modal-actions">
          <button @click="submitForm" class="save-button">{{ modalMode === 'edit' ? 'Update' : 'Save' }}</button>
          <button @click="closeModal" class="cancel-button">Cancel</button>
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
import { ref, computed, onMounted } from 'vue';
import Swal from 'sweetalert2';
import { fetchClients, createClient, deleteClient, updateClient, fetchAdmins} from '../service/client.service';
import { getClientFromLocalStorage } from '../helper/main';
import { useCustomToast } from '../composables/useCustomToast';

interface Client {
  id: number;
  user_id: number;
  Name: string;
  client: string;
  client_id: number;
  kontak_telepon_client: string;
  tanggal_bergabung: string;
  tanggal_masa_berlaku_aplikasi: string;
}
interface ClientForm {
  id?: number;
  user_id: number | null;
  Name: string;
  client: string;
  client_id: number;
  kontak_telepon_client: string;
  tanggal_bergabung: string;
  tanggal_masa_berlaku_aplikasi: string;
}

interface User {
  ID: number;
  Name: string;
}

const form = ref<ClientForm>({
  user_id: null,
  client: '',
  Name: '',
  client_id: 0,
  kontak_telepon_client: '',
  tanggal_bergabung: '',
  tanggal_masa_berlaku_aplikasi: '',
});

const searchQuery = ref<string>('');
const clients = ref<ClientForm[]>([]);
const users = ref<User[]>([]);
const isModalOpen = ref<boolean>(false);
const modalMode = ref<'add' | 'edit'>('add');
const toast = useCustomToast();
const cliendID = getClientFromLocalStorage();

const filteredClients = computed((): Client[] => {
  return client.value.filter(client =>
    client.client.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const client = computed((): Client[] => {
  return clients.value.map(client => {
    const user = users.value.find(u => u.ID === client.user_id);
    return {
      ...client,
      Name: user ? user.Name : 'Tidak ditemukan',
    };
  });
});
const loadClientsData = async () => {
  try {
    const response = await fetchClients({ page: 1, limit: 10 });
    clients.value = response.data.map((client: any) => ({
      ...client,
      Name: users.value.find((user: any) => user.ID === client.user_id)?.Name || 'Tidak ditemukan',
    }))
  } catch (error) {
    toast.error('Gagal memuat data client!');
    console.error('Error loading clients:', error);
  }
};

const loadClientOptions = async () => {
  try {
    const response = await fetchAdmins();
    if (response.data) {
      users.value = response.data;
    }
  } catch (error) {
    toast.error('Gagal memuat data admin!');
    console.error('Gagal memuat admin:', error);
  }
};

const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

const showAddModal = () => {
  if (users.value.length === 0) {
    toast.error('tidak ada admins  yang terdaftar!. Please load users first.');
    return;
  }
  modalMode.value = 'add';
  isModalOpen.value = true;
  form.value = {
    user_id: users.value.length > 0 ? users.value[0].ID : null,
    client: '',
    client_id: 0,
    kontak_telepon_client: '',
    tanggal_bergabung: '',
    tanggal_masa_berlaku_aplikasi: '',
  };
};


const showEditModal = (clientData: Client) => {
  modalMode.value = 'edit';
  isModalOpen.value = true;
  form.value = {
    id: clientData.id,
    user_id: clientData.user_id,
    client: clientData.client,
    client_id: clientData.client_id,
    kontak_telepon_client: clientData.kontak_telepon_client,
    tanggal_bergabung: clientData.tanggal_bergabung,
    tanggal_masa_berlaku_aplikasi: clientData.tanggal_masa_berlaku_aplikasi,
   };
};

const submitForm = async () => {
    try {
      const formattedJoinDate = new Date(form.value.tanggal_bergabung).toISOString().split('T')[0];
      const formattedExpiryDate = new Date(form.value.tanggal_masa_berlaku_aplikasi).toISOString().split('T')[0];
        
        if (!form.value.user_id) {
            toast.error('Silakan pilih admin sebelum menyimpan data!');
            return;
        }

        const clientDataCreate = {
            UserID: form.value.user_id,
            client: form.value.client,
            client_id: cliendID,
            kontak_telepon_client: form.value.kontak_telepon_client,
            tanggal_bergabung: formattedJoinDate,
            tanggal_masa_berlaku_aplikasi: formattedExpiryDate,
        };

        const clientDataUpdate = {
            client: form.value.client,
            kontak_telepon_client: form.value.kontak_telepon_client,
            tanggal_bergabung: formattedJoinDate,
            tanggal_masa_berlaku_aplikasi: formattedExpiryDate,
        };

        if (modalMode.value === 'edit') {
            const result = await Swal.fire({
                title: 'Konfirmasi',
                text: 'Apakah Anda yakin ingin memperbarui data client ini?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Ya, Lanjutkan',
                cancelButtonText: 'Batal',
            });

            if (result.isConfirmed) {
                await updateClient(form.value.id!,clientDataUpdate);
                Swal.fire('Diperbarui!', 'Klien berhasil diperbarui.', 'success');
                loadClientsData();
            }
        } else {
            await createClient(clientDataCreate);
            toast.success('Client berhasil ditambahkan!');
            loadClientsData();
        }

        closeModal();
    } catch (error) {
        toast.error('Gagal menyimpan data client!');
        console.error('Gagal menyimpan client:', error);
    }
};



const confirmDelete = async (clientId: number) => {
  try {
    const result = await Swal.fire({
      title: 'Konfirmasi',
      text: 'Apakah Anda yakin ingin menghapus client ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, hapus',
      cancelButtonText: 'Batal',
    });

    if (result.isConfirmed) {
      await deleteClient(clientId);
      toast.success('Client berhasil dihapus!');
      loadClientsData();
    }
  } catch (error) {
    toast.error('Gagal menghapus client!');
    console.error('Gagal menghapus client:', error);
  }
};

const closeModal = () => {
  isModalOpen.value = false;
};

onMounted(() => {
  loadClientsData();
  loadClientOptions();
});
</script>