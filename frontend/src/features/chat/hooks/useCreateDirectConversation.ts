import { useMutation } from "@tanstack/react-query";

import { createDirectConversation } from "../service/chat.service";

export const useCreateDirectConversation =
  () => {
    return useMutation({
      mutationFn: createDirectConversation,
    });
  };