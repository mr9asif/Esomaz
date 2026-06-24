import { useQuery } from "@tanstack/react-query";
import { getTrendingPosts } from "../api/getTrendingPosts";
import type { Post } from "../types/post.types";

export const useTrendingPosts = () => {
  return useQuery<Post[]>({
    queryKey: ["trending-posts"],
    queryFn: getTrendingPosts,
  });
};