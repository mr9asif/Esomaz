import { NotificationType } from "../../generated/prisma/index.js";

export interface CreateNotificationInput {
  receiverId: string;
  senderId: string;
  type: NotificationType;
  postId?: string;
  commentId?: string;
  messageId?: string;
}