import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../profile/profile.api";

export const useProfile = (
  username: string
) => {
  return useQuery({
    queryKey: ["profile", username],
    queryFn: () =>
      getProfile(username),
  });
};