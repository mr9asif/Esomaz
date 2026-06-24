import { queryClient } from "@/lib/react_query";
import { useMutation } from "@tanstack/react-query";
import { toggleFollow } from "../api/toggleFollow";

export const useToggleFollow = () => {
  return useMutation({
    mutationFn: toggleFollow,

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