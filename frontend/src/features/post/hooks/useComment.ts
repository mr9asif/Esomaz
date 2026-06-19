import { useQuery } from "@tanstack/react-query";
import { getComments } from "../components/comment/api/comment.api";

export const useComments = (
  postId: string
) => {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: () => getComments(postId),
    enabled: !!postId,
  });
};