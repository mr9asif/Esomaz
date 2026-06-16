import { useMutation } from "@tanstack/react-query";
import { updateCover } from "../api/profile.api";

export const useUpdateCoverPhoto = () => {
  return useMutation({
    mutationFn: updateCover,
  });
};