import axios from 'axios';
import { getClientFromLocalStorage, getTokenFromLocalStorage } from '../helper/main';

const apiUrl = import.meta.env.VITE_API_URL

interface RegisterDTO {
    email: string;
    password: string;
    name: string;
    tanggal_terdaftar: string;
    image: File | null;
}

interface UserUpdateDTO {
    Name: string;
    Password: string;
    image: File | null;
}

interface Pagination {
    Page: number;
    limit: number;
}

export const createAdmin = async(paramRegister: RegisterDTO) => {
    const formattedDate = new Date(paramRegister.tanggal_terdaftar).toISOString();
    const token = getTokenFromLocalStorage();
    const formData = new FormData();
    formData.append('email', paramRegister.email);
    formData.append('password', paramRegister.password);
    formData.append('name', paramRegister.name);
    formData.append('tanggal_terdaftar', formattedDate);
    
    if (paramRegister.image) {
      formData.append('image', paramRegister.image);
    }
  
    try {
      const response = await axios.post(`${apiUrl}/register-admin`, formData, {
        headers: {
            Authorization: `Bearer ${token}`, 
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.data.meta.code === 200 || response.data.meta.code === 201) {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
  
      return response.data;
    } catch (error: any) {
      alert(`Registrasi Admin gagal: ${error.response?.data?.meta?.message || 'Unknown error'}`);
      throw error.response?.data || error;
    }
}


export const updateUser = async (id: number, data: UserUpdateDTO) => {
    const formData = new FormData();
    formData.append('password', data.Password);
    formData.append('name', data.Name);
    if (data.image) {
        formData.append('image', data.image);
    }
    const token = getTokenFromLocalStorage();
    try {
        const response = await axios.put(`${apiUrl}/user/${id}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating admin:', error);
        throw error;
    }
};

export const deleteUser = async (id: number) => {
    const token = getTokenFromLocalStorage();
    try {
        const response = await axios.delete(`${apiUrl}/user/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting admin:', error);
        throw error;
    }
};

export const findDataUserAdmin = async (pagination: Pagination) => {
    const token = getTokenFromLocalStorage();
    try {
        const response = await axios.get(`${apiUrl}/users-admin?page=${pagination.Page}&limit=${pagination.limit}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Terjadi kesalahan', error);
        throw error;
    }
};

export const createPetugas = async (paramRegister: RegisterDTO) => {
    const token = getTokenFromLocalStorage();
    const clientID = getClientFromLocalStorage();
    if (!clientID) {
        alert("Client ID is missing.");
        return;
    }
    const formData = new FormData();
    formData.append('client_id', clientID);
    formData.append('email', paramRegister.email);
    formData.append('password', paramRegister.password);
    formData.append('name', paramRegister.name);
    formData.append('status', 'active');
    formData.append('tanggal_terdaftar', paramRegister.tanggal_terdaftar);

    if (paramRegister.image) {
        formData.append('image', paramRegister.image);
    }

    try {
        const response = await axios.post(`${apiUrl}/register-petugas`, formData, {
            headers: {
                Authorization: `Bearer ${token}`, 
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log("Petugas created:", response.data);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            console.error('Error creating petugas:', error.response.data);
            alert(`Error: ${error.response.data.message || 'Gagal membuat petugas.'}`);
        } else {
            console.error('Error creating petugas:', error);
        }
        throw error;
    }
};

export const fetchPetugas = async (pagination: Pagination) => {
    const token = getTokenFromLocalStorage();
    const clientID = getClientFromLocalStorage();
    if (!clientID) {
        console.error("Client ID is missing");
        alert("Client ID is missing.");
        return;
    }

    try {
        const response = await axios.get(`${apiUrl}/users-petugas?client_id=${clientID}&page=${pagination.Page}&limit=${pagination.limit}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching petugas:', error);
        throw error;
    }
};