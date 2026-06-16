import { useMutation } from "@tanstack/react-query";
import { updateAvatar } from "../api/profile.api";

export const useUpdateAvatar = () => {
  return useMutation({
    mutationFn: updateAvatar,
  });
};