import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  console.log("BaseURL:", config.baseURL);
  console.log("URL:", config.url);
  console.log("FULL:", new URL(config.url!, config.baseURL).toString());
  return config;
});

export default api;