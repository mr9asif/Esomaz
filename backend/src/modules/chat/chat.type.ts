export interface CreateDirectConversationPayload {
  currentUserId: string;
  receiverId: string;
}

export interface GetConversationPayload {
  conversationId: string;
  userId: string;
}

export interface GetUserConversationsPayload {
  userId: string;
}

export interface SendMessagePayload {
  conversationId: string;
  senderId: string;
  content?: string;
  replyToId?: string;
}

export interface EditMessagePayload {
  messageId: string;
  userId: string;
  content: string;
}

export interface DeleteMessagePayload {
  messageId: string;
  userId: string;
}

export interface MarkMessageSeenPayload {
  conversationId: string;
  userId: string;
}

export interface UploadedAttachment {
  url: string;
  type: "IMAGE" | "VIDEO";
  fileName: string;
  fileSize: bigint;
  mimeType: string;
  duration?: number;
}