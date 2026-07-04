import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePost } from "../api/updatePost.api";

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      postId,
      content,
    }: {
      postId: string;
      content: string;
    }) => updatePost(postId, content),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });
};