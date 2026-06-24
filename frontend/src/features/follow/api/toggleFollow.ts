import axios from "@/lib/axios";

export const toggleFollow = async (
  userId: string
) => {
  const { data } = await axios.post(
    `/follows/${userId}`
  );

  return data.data;
};