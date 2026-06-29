import { useMutation } from "@tanstack/react-query";
import { deleteMessage } from "../api/chat.api";

export const useDeleteMessage = () => {
  return useMutation({
    mutationFn: deleteMessage,
  });
};