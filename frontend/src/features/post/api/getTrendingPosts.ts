import axios from "@/lib/axios";
import type { Post } from "../types/post.types";

export const getTrendingPosts =
  async (): Promise<Post[]> => {
    const { data } = await axios.get(
      "/post/trending"
    );

    return data.data;
  };