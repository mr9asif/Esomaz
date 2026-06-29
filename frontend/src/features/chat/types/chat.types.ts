export interface ChatUser {
  id: string;
  name: string;
  username: string;
  avatar: string | null;
  isVerified: boolean;
}

export interface ConversationParticipant {
  id: string;
  conversationId: string;
  userId: string;
  joinedAt: string;
  lastReadAt: string | null;
  user: ChatUser;
}

export interface UploadedAttachment {
  id: string;
  url: string;
  type: "IMAGE" | "VIDEO" | "FILE" | "AUDIO";
  fileName?: string;
  fileSize?: number;
  mimeType?: string;
  duration?: number;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string | null;
  type: "TEXT" | "SYSTEM";
  replyToId: string | null;
  seenAt: string | null;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;

  sender: ChatUser;

  attachments: UploadedAttachment[];

  replyTo: Message | null;
}

export interface Conversation {
  id: string;
  type: "DIRECT" | "GROUP";
  name: string | null;
  image: string | null;

  createdAt: string;
  updatedAt: string;

  participants: ConversationParticipant[];

  messages: Message[];
}