import axios from "@/lib/axios";
import type { Post } from "../types/post.types";

export const getPosts = async (): Promise<Post[]> => {
  const { data } = await axios.get("/post");

  return data.data;
};