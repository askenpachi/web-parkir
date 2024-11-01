import axios from 'axios';
import { getClientFromLocalStorage, getTokenFromLocalStorage } from '../helper/main';

const API_URL = import.meta.env.VITE_API_URL;
const token = getTokenFromLocalStorage();
const cliendID = getClientFromLocalStorage();

interface Pagination {
    page: number;
    limit: number;
}

interface LokasiCreateDTO {
    userId: number;
    clientId: number;
    alamatLokasi: string;
    linkMaps: string
    fotoLokasi: File;
    statusFoto: string;
}

interface LokasiUpdateDTO {
    userId: number;
    alamatLokasi: string;
    linkMaps: string
    fotoLokasi: File;
    statusFoto: string;
}

export const getLokasi = async (paramPagination: Pagination) => {
    try {
        const data = await axios.get(`${API_URL}/lokasi`, {
            params: {
                page: paramPagination.page,
                limit: paramPagination.limit,
                client_id: cliendID,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const createLocation = async (locationData: LokasiCreateDTO) => {
    const formData = new FormData();
    formData.append('user_id', String(locationData.userId));
    formData.append('client_id', String(locationData.clientId));
    formData.append('alamat_lokasi', locationData.alamatLokasi);
    formData.append('link_maps', locationData.linkMaps);
    formData.append('status_foto', locationData.statusFoto);
    formData.append('foto_lokasi', locationData.fotoLokasi);

    try {
        await axios.post(`${API_URL}/lokasi`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error('Error creating location:', error);
        throw error;
    }
};

export const updateLocation = async (locationId: number, locationData: LokasiUpdateDTO) => {
    const formData = new FormData();
    formData.append('user_id', String(locationData.userId));
    formData.append('alamat_lokasi', locationData.alamatLokasi);
    formData.append('link_maps', locationData.linkMaps);
    formData.append('status_foto', locationData.statusFoto);
    if (locationData.fotoLokasi) {
        formData.append('foto_lokasi', locationData.fotoLokasi);
    }

    try {
        await axios.put(`${API_URL}/lokasi/${locationId}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error('Error updating location:', error);
        throw error;
    }
};

export const deleteLocation = async (locationId: number) => {
    try {
        await axios.delete(`${API_URL}/lokasi/${locationId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error('Error deleting location:', error);
        throw error;
    }
};

export const getUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}/users-petugas-lokasi?client_id=${cliendID}`, {
            params: { client_id: cliendID },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
