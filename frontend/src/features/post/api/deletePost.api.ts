import axios from "@/lib/axios";

export const deletePost = async (
  postId: string
) => {
  const { data } = await axios.delete(
    `/post/${postId}`
  );

  return data;
};