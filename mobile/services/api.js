import axios from 'axios';

const api = axios.create({
  baseURL: 'https://filmes-api-0yfr.onrender.com', // sua API no Render
  timeout: 10000, // 10 segundos (evita travar)
});

export default api;
