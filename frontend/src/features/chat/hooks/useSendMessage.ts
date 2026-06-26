import { queryClient } from "@/lib/react_query";
import { useMutation } from "@tanstack/react-query";
import { sendMessage } from "../api/chat.api";

export const useSendMessage =
  () => {
    return useMutation({
      mutationFn: sendMessage,

      onSuccess: (
        data,
        variables
      ) => {
        queryClient.invalidateQueries({
          queryKey: [
            "messages",
            variables.conversationId,
          ],
        });

        queryClient.invalidateQueries({
          queryKey: [
            "conversations",
          ],
        });
      },
    });
  };