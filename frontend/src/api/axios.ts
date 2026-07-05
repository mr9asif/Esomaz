import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const getMe = async () => {
  console.log("🔥 getMe called");

  const { data } = await api.get("/user/me");

  console.log("🔥 response", data);

  return data;
};

api.interceptors.request.use((config) => {
  console.log("🚀 Base URL:", config.baseURL);
  console.log("🚀 URL:", config.url);
  console.log("🚀 Full URL:", `${config.baseURL ?? ""}${config.url ?? ""}`);
  return config;
});

export default api;