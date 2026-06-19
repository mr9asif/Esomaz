import axios from "@/lib/axios";
import type { Comment } from "../../../types/post.types";

export const getComments = async (
  postId: string
): Promise<Comment[]> => {
  const { data } = await axios.get(
    `/comments/${postId}`
  );

  return data.data;
};

export const createComment = async ({
  postId,
  content,
}: {
  postId: string;
  content: string;
}) => {
  const { data } = await axios.post(
    "/comments",
    {
      postId,
      content,
    }
  );

  return data.data;
};