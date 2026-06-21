import axios from "@/lib/axios";

export const toggleBookmark = async (postId: string) => {
  const { data } = await axios.post(
    "/api/bookmarks/toggle",
    {
      postId,
    }
  );

  return data.data;
};