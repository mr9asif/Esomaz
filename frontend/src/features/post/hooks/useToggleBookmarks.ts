import { queryClient } from "@/lib/react_query";
import { useMutation } from "@tanstack/react-query";
import { toggleBookmark } from "../api/toggleBookmark";

export const useToggleBookmark = () => {
  return useMutation({
    mutationFn: toggleBookmark,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });

      queryClient.invalidateQueries({
        queryKey: ["bookmarks"],
      });
    },
  });
};