import { useQuery } from "@tanstack/react-query";
import { getConversations } from "../api/chat.api";

export const useConversations = () => {
  return useQuery({
    queryKey: ["conversations"],
    queryFn: getConversations,
  });
};