import axios from "@/lib/axios";

export const toggleReaction = async (
  postId: string
) => {

  const { data } = await axios.post(
    `reactions/${postId}`
  );

  return data.data;

};