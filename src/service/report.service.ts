import axios from 'axios';
import { getClientFromLocalStorage, getTokenFromLocalStorage } from '../helper/main';

const API_URL = import.meta.env.VITE_API_URL;
const token = getTokenFromLocalStorage();
const clientID = getClientFromLocalStorage();


export const getPetugasList = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(`${API_URL}/users-petugas`, {
      params: { client_id: clientID, page, limit },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching petugas:', error);
    throw error;
  }
};

export const getLocationList = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(`${API_URL}/lokasi-client`, {
      params: {
        client_id: clientID,
        page,
        limit,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('API Response (Location List):', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching locations:', error);
    throw error;
  }
};
