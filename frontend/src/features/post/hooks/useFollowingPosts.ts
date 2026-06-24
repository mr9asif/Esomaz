import { useQuery } from "@tanstack/react-query";
import { getFollowingPosts } from "../api/getFollowingPost";
import type { Post } from "../types/post.types";

export const useFollowingPosts = (
  userId: string
) => {
  return useQuery<Post[]>({
    queryKey: ["following-posts", userId],
    queryFn: () =>
      getFollowingPosts(userId),
    enabled: !!userId,
  });
};