import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;