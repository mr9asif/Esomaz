import api from "@/api/axios";
import type {
    LoginPayload,
    RegisterPayload,
} from "../types/auth.types";

export const loginUser = async (
  payload: LoginPayload
) => {
  const { data } = await api.post(
    "/auth/login",
    payload
  );

  return data;
};

export const registerUser = async (
  payload: RegisterPayload
) => {
  const { data } = await api.post(
    "/auth/register",
    payload
  );

  return data;
};

export const getMe = async () => {
  const { data } = await api.get(
    "/user/me"
  );

  return data;
};

export const logoutUser = async () => {
  const { data } = await api.post(
    "/auth/logout"
  );

  return data;
};