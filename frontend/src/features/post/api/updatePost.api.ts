import axios from "@/lib/axios";

export const updatePost = async (
  postId: string,
  content: string
) => {
  const { data } = await axios.patch(
    `/post/${postId}`,
    {
      content,
    }
  );

  return data.data;
};