import api from "@/lib/axios";

export const getProfile = async (
  username: string
) => {
  const { data } = await api.get(
    `/user/${username}`
  );

  return data;
};