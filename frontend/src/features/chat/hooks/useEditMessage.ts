import { queryClient } from "@/lib/react_query";
import { useMutation } from "@tanstack/react-query";
import { editMessage } from "../api/chat.api";

export const useEditMessage =
  () => {
    return useMutation({
      mutationFn: editMessage,

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [
            "messages",
          ],
        });
      },
    });
  };
