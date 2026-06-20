import { queryClient } from "@/lib/react_query";
import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { createBookmark } from "../api/bookmark.api";

export const useToggleBookmark = () => {
  return useMutation({
    mutationFn: createBookmark,

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });

      queryClient.invalidateQueries({
        queryKey: ["bookmarks"],
      });

      if (data) {
        toast.success("Post saved");
      } else {
        toast.success("Bookmark removed");
      }
    },
  });
};