import { queryClient } from "@/lib/react_query";
import { useMutation } from "@tanstack/react-query";
import { createConversation } from "../api/chat.api";

export const useCreateConversation =
  () => {
    return useMutation({
      mutationFn:
        createConversation,

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [
            "conversations",
          ],
        });
      },
    });
  };