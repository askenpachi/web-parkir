<template>
    <div class="petugas-container">
        <link rel="stylesheet" href="/src/pages/css/RegisterPetugas.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />

        <div class="text">
            <h2>Manajemen Petugas</h2> 
        </div>
        <div class="toolbar">
            <input v-model="search" type="text" placeholder="Cari Petugas" class="search-bar" />
            <button @click="openAddModal" class="add-button">
                <i class="fa fa-plus"></i>
            </button>
        </div>

        <table class="table">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Nama</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Tanggal Terdaftar</th>
                    <th>Images</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="filteredPetugas.length === 0">
                    <td colspan="7" style="text-align: center; padding: 20px;">No petugas found</td>
                </tr>
                <tr v-for="(petugas, index) in filteredPetugas" :key="petugas.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ petugas.nama }}</td>
                    <td>{{ petugas.email }}</td>
                    <td>{{ petugas.password }}</td>
                    <td>{{ formatDate(petugas.tanggal_terdaftar) }}</td>
                    <td>
                        <img :src="getPetugasImageUrl(petugas.image)" alt="Petugas Image" class="petugas-photo" />
                    </td>
                    <td>
                        <button @click="editPetugas(petugas)" class="edit-button">
                            <i class="fa fa-pencil"></i>
                        </button>
                        <button @click="confirmDeleteUser(petugas.id)" class="delete-button">
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
                <h3>{{ isEditing ? 'Update Petugas' : 'Tambah Petugas' }}</h3>

                <label for="namaPetugas">Nama:</label>
                <input v-model="selectedPetugas.nama" type="text" required />

                <label for="email">Email:</label>
                <input v-model="selectedPetugas.email" type="email" required />

                <label for="password">Password:</label>
                <input v-model="selectedPetugas.password" type="password" required />

                <label for="tanggalTerdaftar">Tanggal Terdaftar:</label>
                <input v-model="selectedPetugas.tanggal_terdaftar" type="date" required />

                <label for="images">Upload Gambar:</label>
                <input type="file" @change="handleFileUpload" />

                <div class="modal-actions">
                    <button @click="savePetugas" class="save-button">{{ isEditing ? 'Update' : 'Save' }}</button>
                    <button @click="cancelEdit" class="cancel-button">Cancel</button>
                </div>
            </div>
        </div>

        <success-alert 
            :visible="alertVisible" 
            :title="alertTitle" 
            :message="alertMessage" 
            @alert-dismissed="alertVisible = false" 
        />
    </div>
    <footer class="footer">
        <p>© 2024 PT.TEKNOLOGI MULIA SEJAHTERA</p>
    </footer>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { fetchPetugas, createPetugas, updateUser, deleteUser } from '../service/user.service';
import SuccessAlert from '../components/alerts/success.vue';
import Swal from 'sweetalert2';

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
}

interface Petugas {
    id: number;
    nama: string;
    email: string;
    password: string;
    tanggal_terdaftar: string;
    image: File | null;
}

const selectedPetugas = ref<Petugas>({
    id: 0,
    nama: '',
    email: '',
    password: '',
    tanggal_terdaftar: '',
    image: null,
});

const petugasList = ref<Petugas[]>([]);
const search = ref('');
const showModal = ref(false);
const isEditing = ref(false);
const currentPage = ref(1);
const totalPages = ref(1);
const limit = 10;

const alertVisible = ref(false);
const alertTitle = ref('');
const alertMessage = ref('');

const filteredPetugas = computed(() =>
    petugasList.value.filter((petugas) =>
        petugas.nama.toLowerCase().includes(search.value.toLowerCase())
    )
);

const fetchData = async (page: number) => {
    try {
        const response = await fetchPetugas({ Page: page, limit });
        petugasList.value = response.data.map((petugas: any) => ({
            id: petugas.ID,
            nama: petugas.Name,
            email: petugas.Email,
            status: petugas.Status,
            tanggal_terdaftar: petugas.TanggalTerdaftar,
            image: petugas.Image || null,
        }));
        totalPages.value = response.totalPages;
    } catch (error) {
        console.error('Error fetching petugas:', error);
    }
};

const getPetugasImageUrl = (image: string | null): string => {
    if (image) {
        const updatedImage = image.replace(/^storage\//, 'files/');
        return `${import.meta.env.VITE_API_URL_IMAGE}/${updatedImage}`;
    }
    return '/default-image.png';
};

const openAddModal = () => {
    isEditing.value = false;
    showModal.value = true;
    selectedPetugas.value = {
        id: 0,
        nama: '',
        email: '',
        password: '',
        tanggal_terdaftar: '',
        image: null,
    };
};

const editPetugas = (petugas: Petugas) => {
    isEditing.value = true;
    showModal.value = true;
    selectedPetugas.value = { ...petugas };
};

const cancelEdit = () => {
    showModal.value = false;
};

const savePetugas = async () => {
    try {
        let formattedDate;
        if (selectedPetugas.value.tanggal_terdaftar) {
            const date = new Date(selectedPetugas.value.tanggal_terdaftar);
            date.setUTCHours(12, 0, 0, 0);
            formattedDate = date.toISOString();
        } else {
            throw new Error('Tanggal terdaftar is required');
        }

        const paramRegister = {
            email: selectedPetugas.value.email,
            password: selectedPetugas.value.password,
            name: selectedPetugas.value.nama,
            tanggal_terdaftar: formattedDate,
            image: selectedPetugas.value.image ? (selectedPetugas.value.image as File) : null,
        };

        if (isEditing.value) {
            const result = await Swal.fire({
                title: 'Konfirmasi Update',
                text: 'Apakah Anda yakin ingin memperbarui petugas ini?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Ya',
                cancelButtonText: 'Batal',
            });

            if (result.isConfirmed) {
                await updateUser(selectedPetugas.value.id, { 
                    Name: selectedPetugas.value.nama, 
                    Password: selectedPetugas.value.password, 
                    image: selectedPetugas.value.image 
                });
                alertTitle.value = 'Update Berhasil!';
                alertMessage.value = 'Petugas berhasil diperbarui!';
            } else {
                return; // Cancel the operation
            }
        } else {
            await createPetugas(paramRegister);
            alertTitle.value = 'Tambah Berhasil!';
            alertMessage.value = 'Petugas berhasil ditambahkan!';
        }

        alertVisible.value = true;
        await fetchData(currentPage.value);
        showModal.value = false;
    } catch (error) {
        console.error('Error saving petugas:', error);
    }
};

const confirmDeleteUser = (id: number) => {
    Swal.fire({
        title: 'Apakah Anda yakin?',
        text: 'Data petugas ini akan dihapus!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, hapus!',
        cancelButtonText: 'Batal',
    }).then(async (result) => {
        if (result.isConfirmed) {
            await deleteUserHandler(id);
        }
    });
};

const deleteUserHandler = async (id: number) => {
    try {
        await deleteUser(id);
        alertMessage.value = 'Petugas berhasil dihapus!';
        alertVisible.value = true;
        await fetchData(currentPage.value); 
    } catch (error) {
        console.error('Error deleting user:', error);
    }
};

const handleFileUpload = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
        selectedPetugas.value.image = target.files[0];
    }
};

const changePage = (page: number) => {
    if (page < 1 || page > totalPages.value) return;
    currentPage.value = page;
    fetchData(currentPage.value);
};

onMounted(() => {
    fetchData(currentPage.value);
});
</script>