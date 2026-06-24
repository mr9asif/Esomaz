import axios from "@/lib/axios";
import type { Post } from "../types/post.types";

export const getPostById = async (
  postId: string
): Promise<Post> => {
  const { data } = await axios.get(
    `/search/${postId}`
  );

  return data.data;
};