import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deletePost } from "../api/deletePost.api";


export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) => deletePost(postId),

    onSuccess: (data) => {
      console.log("Delete Success:", data);

      toast.success("Post deleted successfully.");

      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },

    onError: (error) => {
      console.error("Delete Error:", error);

      toast.error("Failed to delete post.");
    },
  });
};