import api from "@/api/axios";

import type {
  LoginPayload,
  RegisterPayload,
} from "../types/auth.types";

export const loginUser = async (
  payload: LoginPayload
) => {
  const { data } = await api.post(
    "v1/auth/login",
    payload
  );

  return data;
};

export const registerUser = async (
  payload: RegisterPayload
) => {
  const { data } = await api.post(
    "v1/auth/register",
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
export const logout = async () => {
  const { data } = await api.post(
    "v1/auth/logout"
  );

  return data;
};