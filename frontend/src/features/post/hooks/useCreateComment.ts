import { queryClient } from "@/lib/react_query";
import { useMutation } from "@tanstack/react-query";
import { createComment } from "../components/comment/api/comment.api";

export const useCreateComment = () => {
  return useMutation({
    mutationFn: createComment,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.postId],
      });
    },
  });
};