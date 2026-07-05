import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const getMe = async () => {
  console.log("Base URL:", import.meta.env.VITE_API_URL);

  const response = await api.get("/user/me");

  return response.data;
};

export default api;