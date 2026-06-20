import axios from "@/lib/axios";

interface ReplyPayload {
  parentId: string;
  content: string;
}

export  const createReply = async ({
  parentId,
  content,
}: ReplyPayload) => {

  const { data } = await axios.post(
    "/comments/reply",
    {
      parentId,
      content,
    }
  );

  return data.data;
};