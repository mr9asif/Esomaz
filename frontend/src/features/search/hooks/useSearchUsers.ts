import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export interface SearchUser {
  id: string;
  name: string;
  username: string;
  avatar?: string | null;
}

const searchUsers = async (query: string) => {
  const { data } = await axios.get(
    `/search?q=${query}&type=users`
  );

  return data.users;
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