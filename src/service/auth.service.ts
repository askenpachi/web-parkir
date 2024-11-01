import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

interface LoginDTO {
  email: string;
  password: string;
}

const AuthService = {
  async login(LoginDTO: LoginDTO) {
    try {
      const response = await axios.post(`${apiUrl}/login`, LoginDTO);
      if (response.data.meta.code === 200 || response.data.meta.code === 201) {
        localStorage.setItem('user', JSON.stringify(response.data.data));
      }
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  },
};

export default AuthService;





