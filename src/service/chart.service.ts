import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

export const fetchkendaraan = async (jenis_kendaraan: string, jumlah_kendaraan: number) => {
    try {
        const response = await axios.get(`${API_URL}/transaksi-lokasi?lokasi_id=79&date=2024-09-27`, {
            params: {
                jenis_kendaraan: jenis_kendaraan,
                jumlah_kendaraan: jumlah_kendaraan
            },
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozfQ.NN0PDNoYh9kukDptsy9jmQg1ak1y7Ldja0l5uvXK1XA`,
            },
        });


        console.log('Data dari API:', response.data);
        if (response.data && response.data && response.data.status === 'success') {
            return response.data.data.map((item: { jenis_kendaraan: string, jumlah_kendaraan: number }) => ({
                jenis_kendaraan: item.jenis_kendaraan,
                jumlah_kendaraan: item.jumlah_kendaraan,
            }));
        } else {
            throw new Error('Data tidak valid atau gagal diambil');
        }
    } catch (error) {
        console.error('Error fetching kendaraan by location and date:', error);
        throw error;
    }
};
