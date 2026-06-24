import axios from "@/lib/axios";

export const search = async (
  q: string,
  type: string
) => {
  const { data } = await axios.get(
    `/search?q=${q}&type=${type}`
  );

  return data.data;
};