import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../api/getPost";
import type { Post } from "../types/post.types";

export const usePosts = () => {
  return useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: getPosts,
  });
};