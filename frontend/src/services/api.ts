import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASEURL,
  headers: {
    'Content-Type': 'application/json',
  }
});

export default api;