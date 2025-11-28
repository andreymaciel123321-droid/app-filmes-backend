import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// === CONFIGURAÇÃO DO AXIOS ===
const api = axios.create({
  baseURL: 'https://app-filmes-backend.onrender.com',
  timeout: 10000,
});

// === INTERCEPTOR DE ENVIO DO TOKEN ===
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('@token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// === INTERCEPTOR DE RESPOSTA (TRATAR ERROS DO TOKEN) ===
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Se o token expirou ou é inválido
    if (error.response && error.response.status === 401) {
      // Apaga o token inválido
      await AsyncStorage.removeItem('@token');
    }

    return Promise.reject(error);
  }
);

export default api;
    
