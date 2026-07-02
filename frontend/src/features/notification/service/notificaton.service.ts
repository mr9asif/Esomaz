import api from "@/lib/axios";
import type {
    Notification,
    NotificationCountResponse,
} from "../types/notification.types";

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export const getNotifications = async (): Promise<Notification[]> => {
  const { data } = await api.get<ApiResponse<Notification[]>>(
    "/notifications"
  );

  return data.data;
};

export const getUnreadCount =
  async (): Promise<NotificationCountResponse> => {
    const { data } = await api.get<
      ApiResponse<NotificationCountResponse>
    >("/notifications/unread-count");

    return data.data;
  };

export const markAsRead = async (
  notificationId: string
): Promise<Notification> => {
  const { data } = await api.patch<ApiResponse<Notification>>(
    `/notifications/${notificationId}/read`
  );

  return data.data;
};