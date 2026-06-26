import { queryClient } from "@/lib/react_query";
import { useMutation } from "@tanstack/react-query";
import { deleteMessage } from "../api/chat.api";

export const useDeleteMessage =
  () => {
    return useMutation({
      mutationFn:
        deleteMessage,

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [
            "messages",
          ],
        });
      },
    });
  };