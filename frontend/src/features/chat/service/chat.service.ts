import axiosInstance from "@/lib/axios";

export const createDirectConversation = async (
  receiverId: string
) => {
  const { data } = await axiosInstance.post(
    "/chat/direct",
    {
      receiverId,
    }
  );

  return data.data;
};