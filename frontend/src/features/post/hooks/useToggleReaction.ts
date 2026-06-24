import { queryClient } from "@/lib/react_query";
import { useMutation } from "@tanstack/react-query";
import { toggleReaction } from "../api/toggleReaction";

export const useToggleReaction = () => {
  return useMutation({
    mutationFn: toggleReaction,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });

      queryClient.invalidateQueries({
        queryKey: ["post"],
      });
    },
  });
};