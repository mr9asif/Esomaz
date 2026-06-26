import { useMutation } from "@tanstack/react-query";
import { markSeen } from "../api/chat.api";

export const useSeenMessage =
  () => {
    return useMutation({
      mutationFn: markSeen,
    });
  };