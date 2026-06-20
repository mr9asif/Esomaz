import axios from "@/lib/axios";

export const createBookmark = async (
  postId: string
) => {
  const { data } = await axios.post(
    `/bookmarks/${postId}`
  );

  return data.data;
};

export const getBookmarks = async () => {
  const { data } = await axios.get(
    "/bookmarks"
  );

  return data.data;
};