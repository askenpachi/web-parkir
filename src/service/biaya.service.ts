import axios from 'axios';
import { getClientFromLocalStorage, getTokenFromLocalStorage } from '../helper/main';

const API_URL = import.meta.env.VITE_API_URL;
const token = getTokenFromLocalStorage();
const cliendID = getClientFromLocalStorage();

interface Pagination {
    page: number;
    limit: number;
}

export interface HargaParkirCreateDTO {
    lokasiId: number;
    harga: number;
    statusHarga: string;
    kategoriKendaraan: string
}

interface HargaParkirUpdateDTO {
    id: number;
    harga: number;
    kategoriKendaraan: string
}

export const getLokasi = async (pagination: Pagination) => {
    try {
        const data = await axios.get(`${API_URL}/lokasi-client`, {
            params: {
                page: pagination.page,
                limit: pagination.limit,
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

export const getHargaParkir = async (pagination: Pagination, lokasiId: number) => {
    try {
        const data = await axios.get(`${API_URL}/harga-parkir`, {
            params: {
                page: pagination.page,
                limit: pagination.limit,
                lokasi_id: lokasiId
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

export const createHargaParkir = async (data: HargaParkirCreateDTO) => {
    console.log("data", data)
  try {
    const response = await axios.post(`${API_URL}/harga-parkir`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateHargaParkir = async (id: number, data: HargaParkirUpdateDTO) => {
    try {
        const response = await axios.put(`${API_URL}/harga-parkir/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const deleteHargaParkir = async (id: number) => {
    try {
        const response = await axios.delete(`${API_URL}/harga-parkir/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};