import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://lumoslearn-backend.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient; 