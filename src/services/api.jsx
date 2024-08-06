import axios from "axios";

// Use import.meta.env for Vite-specific environment variables
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5005"; // Vite style

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
