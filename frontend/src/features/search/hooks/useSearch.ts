import { useQuery } from "@tanstack/react-query";
import { search } from "../search.api";

export const useSearch = (
  q: string,
  type: string
) => {
  return useQuery({
    queryKey: ["search", q, type],
    queryFn: () => search(q, type),
    enabled: !!q,
  });
};