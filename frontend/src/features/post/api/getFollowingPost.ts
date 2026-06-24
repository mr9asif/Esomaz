import axios from "@/lib/axios";
import type { Post } from "../types/post.types";

export const getFollowingPosts =
  async (
    userId: string
  ): Promise<Post[]> => {
    const { data } = await axios.get(
      `/follows/following/${userId}`
    );

    return data.data;
  };