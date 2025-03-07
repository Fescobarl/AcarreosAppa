// src/services/api/apiClient.ts
import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://acarreosappaapi.onrender.com/api/v1", // URL de tu API Express
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para añadir token JWT
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar errores globales
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirigir a login si no está autenticado
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default apiClient;
