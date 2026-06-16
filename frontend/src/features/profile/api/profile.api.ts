import api from "@/lib/axios";

export const updateProfile = async (payload: {
  name?: string;
  bio?: string;
  location?: string;
  website?: string;
}) => {
  const { data } = await api.patch(
    "/user/profile",
    payload
  );

  return data;
};

export const updateAvatar = async (
  formData: FormData
) => {
  const { data } = await api.patch(
    "/user/avatar",
    formData
  );

  return data;
};

export const updateCover = async (
  formData: FormData
) => {
  const { data } = await api.patch(
    "/user/coverPhoto",
    formData
  );

  return data;
};