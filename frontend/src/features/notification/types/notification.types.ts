export type NotificationType =
  | "FOLLOW"
  | "LIKE"
  | "COMMENT"
  | "REPLY"
  | "MESSAGE";

export interface NotificationSender {
  id: string;
  name: string;
  username: string;
  avatar: string | null;
  isVerified: boolean;
}

export interface NotificationPost {
  id: string;
  content: string | null;
}

export interface NotificationComment {
  id: string;
  content: string;
}

export interface NotificationMessage {
  id: string;
  content: string | null;
}

export interface Notification {
  id: string;

  type: NotificationType;

  isRead: boolean;

  createdAt: string;

  sender: NotificationSender;

  post?: NotificationPost | null;

  comment?: NotificationComment | null;

  message?: NotificationMessage | null;
}

export interface NotificationCountResponse {
  count: number;
}