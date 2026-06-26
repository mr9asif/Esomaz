import { useQuery } from "@tanstack/react-query";
import { getConversation } from "../api/chat.api";

export const useConversation = (
  conversationId: string
) => {
  return useQuery({
    queryKey: [
      "conversation",
      conversationId,
    ],

    queryFn: () =>
      getConversation(
        conversationId
      ),

    enabled: !!conversationId,
  });
};