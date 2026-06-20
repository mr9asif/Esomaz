import { useQuery } from "@tanstack/react-query";
import { getBookmarks } from "../api/bookmark.api";

export const useBookmarks = () => {
  return useQuery({
    queryKey: ["bookmarks"],
    queryFn: getBookmarks,
  });
};