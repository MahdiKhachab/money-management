// api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/ZahraaAPI/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add JWT token to every request if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // token saved after login
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export default api;
