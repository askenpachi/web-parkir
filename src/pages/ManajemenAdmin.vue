<template>
    <div class="admin-container">
        <link rel="stylesheet" href="/src/pages/css/RegisterAdmin.css" />
        <div class="text">
            <h2>Manajemen Admin</h2>
        </div>
        <div class="toolbar">
            <input v-model="search" type="text" placeholder="Cari Admin" class="search-bar" />
            <button @click="openAddModal" class="add-button"> Tambahkan Admin <i class="fa fa-plus"></i></button>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Tanggal Terdaftar</th>
                    <th>Images</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="filteredAdmins.length === 0">
                    <td colspan="7" style="text-align: center; padding: 20px;">No admin found</td>
                </tr>
                <tr v-for="(admin, index) in filteredAdmins" :key="admin.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ admin.nama }}</td>
                    <td>{{ admin.email }}</td>
                    <td>{{ admin.status }}</td> 
                    <td>{{ formatDate(admin.tanggal_terdaftar) }}</td>
                    <td>
                        <img :src="getAdminImageUrl(admin.image)" alt="Admin Image" class="admin-photo" />
                    </td>
                    <td>
                        <button @click="editAdmin(admin)" class="edit-button">
                            <font-awesome-icon icon="edit" />
                        </button>
                        <button @click="confirmDeleteAdmin(admin.id)" class="delete-button">
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
                <h3>{{ isEditing ? 'Update Admin' : 'Tambah Admin' }}</h3>
                <label for="namaAdmin">Nama:</label>
                <input v-model="selectedAdmin.nama" type="text" required />
                <label v-if="!isEditing" for="email">Email:</label>
                <input v-if="!isEditing" v-model="selectedAdmin.email" type="email" required />
                <label for="password">Password:</label>
                <input v-model="selectedAdmin.password" type="password" required />
                <label v-if="!isEditing" for="tanggalTerdaftar">Tanggal Terdaftar:</label>
                <input v-if="!isEditing" v-model="selectedAdmin.tanggal_terdaftar" type="date" required />
                <label for="images">Upload Gambar:</label>
                <input type="file" @change="handleFileUpload" />
                <div class="modal-actions">
                    <button @click="saveAdmin" class="save-button">{{ isEditing ? 'Update' : 'Save' }}</button>
                    <button @click="cancelEdit" class="cancel-button">Cancel</button>
                </div>
            </div>
        </div>
    </div>
    <footer class="footer">
      <p>© 2024 PT.TEKNOLOGI MULIA SEJAHTERA</p>
    </footer>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { findDataUserAdmin, createAdmin, updateUser, deleteUser } from '../service/user.service';
// import SuccessAlert from '../components/alerts/success.vue';
import Swal from 'sweetalert2';

    // DATA IMPLEMENTATION
    interface Admin {
        id: number;
        nama: string;
        email: string;
        status: string;
        password: string;
        tanggal_terdaftar: string;
        image: File | null;
    };

    const selectedAdmin = ref<Admin>({
        id: 0,
        nama: '',
        email: '',
        status: 'active',
        password: '',
        tanggal_terdaftar: '',
        image: null,
    });

    const adminList = ref<Admin[]>([]);
    const search = ref('');
    const showModal = ref(false);
    const isEditing = ref(false);
    const currentPage = ref(1);
    const totalPages = ref(1);
    const limit = 10;

    const alertVisible = ref(false);
    const alertTitle = ref('');
    const alertMessage = ref('');

    // FUNCTION IMPLEMENTATION
    const filteredAdmins = computed(() =>
        adminList.value.filter((admin) => admin.nama.toLowerCase().includes(search.value.toLowerCase()))
    );

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    const changePage = (page: number) => {
        if (page < 1 || page > totalPages.value)
        return;
        currentPage.value = page;
        fetchData(currentPage.value);
    };

    const getAdminImageUrl = (image: string | null): string => {
        if (image) {
            const updatedImage = image.replace(/^storage\//, 'files/');
            return `${import.meta.env.VITE_API_URL_IMAGE}/${updatedImage}`;
        }
        return '/default-image.png';
    };

    const handleFileUpload = (event: Event) => {
        const target = event.target as HTMLInputElement;
        if (target.files && target.files.length > 0) {
            const file = target.files[0];
            selectedAdmin.value.image = file;
        }
    };

    const openAddModal = () => {
        isEditing.value = false;
        showModal.value = true;
        selectedAdmin.value = {
            id: 0,
            nama: '',
            email: '',
            password: '',
            status: 'true',
            tanggal_terdaftar: '',
            image: null,
        };
        };

    const editAdmin = (admin: Admin) => {
        isEditing.value = true;
        showModal.value = true;
        selectedAdmin.value = { ...admin };
    };

    const cancelEdit = () => {
        showModal.value = false;
    };


    // API CONSUME
    const fetchData = async (page: number) => {
        try {
            const response = await findDataUserAdmin({
                Page: page,
                limit,
            });
            adminList.value = response.data.map((admin: any) => ({
                id: admin.ID,
                nama: admin.Name,
                email: admin.Email,
                status: admin.Status,
                password: '',
                tanggal_terdaftar: admin.TanggalTerdaftar,
                image: admin.Image || null,
            }));
            totalPages.value = response.totalPages;
        } catch (error) {
            console.error('Error fetching admin:', error);
        }
    };

    const saveAdmin = async () => {
        try {
            const formattedDate = new Date(selectedAdmin.value.tanggal_terdaftar).toISOString().split('T')[0];

            const paramRegister = {
                email: selectedAdmin.value.email,
                password: selectedAdmin.value.password,
                name: selectedAdmin.value.nama,
                tanggal_terdaftar: formattedDate,
                image: selectedAdmin.value.image ? (selectedAdmin.value.image as File) : null,
            };

            // const paramUpdate = {
            //     Password: selectedAdmin.value.password,
            //     Name: selectedAdmin.value.nama,
            //     image: selectedAdmin.value.image ? (selectedAdmin.value.image as File) : null,
            // };

            if (isEditing.value) {
                const result = await Swal.fire({
                    title: 'Konfirmasi Update',
                    text: 'Apakah Anda yakin ingin memperbarui Admin ini?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Ya',
                    cancelButtonText: 'Batal',
                });

                if(result.isConfirmed){
                    await updateUser(selectedAdmin.value.id, {
                        Password: selectedAdmin.value.password,
                        Name: selectedAdmin.value.nama,
                        image: selectedAdmin.value.image
                    });
                    alertTitle.value = 'Update Berhasil!';
                    alertMessage.value = 'Admin berhasil diperbarui!';
                } else {
                    return;
                }
            } else {
                await createAdmin(paramRegister);
                alertTitle.value = 'Tambah Berhasil!';
                alertMessage.value = 'Admin berhasil ditambahkan!';
            }

            alertVisible.value = true;
            await fetchData(currentPage.value);
            showModal.value = false;
        } catch (error) {
        console.error('Error saving admin:', error);
        }
    };

    const confirmDeleteAdmin = (id: number) => {
        Swal.fire({
            title: 'Apakah Anda yakin?',
            text: 'Data Admin ini akan dihapus!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal',
        }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteAdminHandler(id);
            }
        });
    };

    const deleteAdminHandler = async (id: number) => {
        try {
            await deleteUser(id);
            alertMessage.value = 'Admin berhasil dihapus!';
            alertVisible.value = true;
            await fetchData(currentPage.value); 
        } catch (error) {
            console.error('Error deleting admin:', error);
        }
    };
    
    onMounted(() => {
        fetchData(1);
    });
</script>