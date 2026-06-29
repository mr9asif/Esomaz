import { useMutation } from "@tanstack/react-query";
import { uploadAttachments } from "../api/chat.api";

export const useUploadAttachments = () => {
  return useMutation({
    mutationFn: uploadAttachments,
  });
};