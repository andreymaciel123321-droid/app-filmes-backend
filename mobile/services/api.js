import axios from "axios";

const api = axios.create({
  baseURL: "https://backend.onrender.com", // sua URL do backend
});

export default api;
