import axios from "@/lib/axios";
import type { Post } from "../types/post.types";

export const createBookmark = async (
  postId: string
) => {
  const { data } = await axios.post(
    `/bookmarks/${postId}`
  );

  return data.data;
};

export const getBookmarks = async (): Promise<Post[]> => {
  interface BookmarkResponse {
  post: Post;
}
  const { data } = await axios.get(
    "/bookmarks/me"
  );

  return data.data.map(
    (bookmark: BookmarkResponse) => bookmark.post
  );
};