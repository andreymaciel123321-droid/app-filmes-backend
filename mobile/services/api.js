import axios from 'axios';

const api = axios.create({
  baseURL: 'https://app-filmes-backend.onrender.com'
});

export default api;
