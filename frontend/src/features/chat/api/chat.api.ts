import axios from "@/lib/axios";

/* ---------------- Conversation ---------------- */

export const createConversation = async (
  receiverId: string
) => {
  const { data } = await axios.post(
    "/chat/direct",
    {
      receiverId,
    }
  );

  return data.data;
};

export const getConversations = async () => {
  const { data } = await axios.get(
    "/chat/conversations"
  );

  return data.data;
};

export const getConversation = async (
  conversationId: string
) => {
  const { data } = await axios.get(
    `/chat/conversation/${conversationId}`
  );

  return data.data;
};

/* ---------------- Messages ---------------- */

export const getMessages = async (
  conversationId: string
) => {
  const { data } = await axios.get(
    `/chat/conversation/${conversationId}/messages`
  );

  return data.data;
};

interface SendMessagePayload {
  conversationId: string;
  content: string;
  replyToId?: string;
}

export const sendMessage = async (
  payload: SendMessagePayload
) => {
  const { data } = await axios.post(
    "/chat/message",
    payload
  );

  return data.data;
};

interface EditMessagePayload {
  messageId: string;
  content: string;
}

export const editMessage = async ({
  messageId,
  content,
}: EditMessagePayload) => {
  const { data } = await axios.patch(
    `/chat/message/${messageId}`,
    {
      content,
    }
  );

  return data.data;
};

export const deleteMessage = async (
  messageId: string
) => {
  const { data } = await axios.delete(
    `/chat/message/${messageId}`
  );

  return data.data;
};

export const markSeen = async (
  conversationId: string
) => {
  const { data } = await axios.patch(
    `/chat/conversation/${conversationId}/seen`
  );

  return data.data;
};