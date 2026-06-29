import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

import type { SearchUser } from "../types/chat.types";

const searchUsers = async (
  query: string
): Promise<SearchUser[]> => {
  if (!query.trim()) {
    return [];
  }

  const response = await axiosInstance.get(
    `/search?q=${query}&type=users`
  );

  return response.data.data.users ?? [];
};

export const useSearchUsers = (
  query: string
) => {
  return useQuery({
    queryKey: ["search-users", query],
    queryFn: () => searchUsers(query),
    enabled: query.trim().length > 0,
  });
};