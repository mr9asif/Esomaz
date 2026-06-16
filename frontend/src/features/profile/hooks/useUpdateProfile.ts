import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "../api/profile.api";

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: updateProfile,
  });
};