import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../api/getPost";
import { getPostById } from "../api/getPostById";
import type { Post } from "../types/post.types";

export const usePosts = () => {
 try {
   return useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: getPosts,
  });
 } catch (error) {
  console.log(error)
 }
};

export const usePost = (postId: string) => {
  return useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPostById(postId),
    enabled: !!postId,
  });
};