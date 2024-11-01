import axios from 'axios';
import { getClientFromLocalStorage, getTokenFromLocalStorage, formatDateToDDMMYY } from '../helper/main';

const API_URL = import.meta.env.VITE_API_URL; 
const token = getTokenFromLocalStorage(); 
const cliendID = getClientFromLocalStorage(); 

interface clientDataCreateDTO {
    UserID: number;
    clientid: number;
    client: string;
    kontak_telepon_client: string;
    tanggal_bergabung: string;
    tanggal_masa_berlaku_aplikasi: string;
}

interface clientDataUpdateDTO {
    client: string;
    kontak_telepon_client: string;
    tanggal_bergabung: string;
    tanggal_masa_berlaku_aplikasi: string;
}

export const fetchClients = async (pagination: { page: number; limit: number }) => {
    try {
        const response = await axios.get(`${API_URL}/clients`, {
            params: {
                page: pagination.page,
                limit: pagination.limit,
                client_id: cliendID,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data; 
    } catch (error) {
        console.error('Error fetching clients:', error);
        throw error; 
    }
};

export const createClient = async (clientDataCreate: clientDataCreateDTO) => {
    try {
        const formattedJoinDate = new Date(clientDataCreate.tanggal_bergabung).toISOString();
        const formattedExpiryDate = new Date(clientDataCreate.tanggal_masa_berlaku_aplikasi).toISOString();

        const response = await axios.post(`${API_URL}/client`, {
            user_id: clientDataCreate.UserID,
            clientid: clientDataCreate.clientid,
            client: clientDataCreate.client,
            kontak_telepon_client: clientDataCreate.kontak_telepon_client,
            tanggal_bergabung: formattedJoinDate,
            tanggal_masa_berlaku_aplikasi: formattedExpiryDate,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data; 
    } catch (error) {
        console.error('Error creating client:', error);
        throw error; 
    }
};

export const updateClient = async (clientId: number, clientDataUpdate: clientDataUpdateDTO) => {
    const data = {
        id: clientId,
        client: clientDataUpdate.client,
        kontak_telepon_client: clientDataUpdate.kontak_telepon_client,
        tanggal_bergabung: new Date(clientDataUpdate.tanggal_bergabung).toISOString(),
        tanggal_masa_berlaku_aplikasi: new Date(clientDataUpdate.tanggal_masa_berlaku_aplikasi).toISOString(),
    };

    try {
        const response = await axios.put(`${API_URL}/client/${clientId}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data; 
    } catch (error) {
        console.error('Error updating client:', error);
        throw error; 
    }
};

export const deleteClient = async (clientId: number) => {
    try {
        await axios.delete(`${API_URL}/client/${clientId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error('Error deleting client:', error);
        throw error; 
    }
};

export const fetchClient = async (clientId: number) => {
    try {
        const response = await axios.get(`${API_URL}/client/${clientId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching client:', error);
        throw error;
    }
};

export const fetchAdmins = async () => {
    try {
        const response = await axios.get(`${API_URL}/users-admin?page=1&limit=100`, {
            params: { client_id: cliendID },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching admins:', error);
        throw error;
    }
};
