import { useQuery } from "@tanstack/react-query";
import { getMessages } from "../api/chat.api";

export const useMessages = (
  conversationId: string
) => {
  return useQuery({
    queryKey: [
      "messages",
      conversationId,
    ],

    queryFn: () =>
      getMessages(
        conversationId
      ),

    enabled: !!conversationId,
  });
};