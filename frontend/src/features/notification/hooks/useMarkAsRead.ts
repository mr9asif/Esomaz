import { queryClient } from "@/lib/react_query";
import { useMutation } from "@tanstack/react-query";

import { markAsRead } from "../service/notificaton.service";
import type { Notification } from "../types/notification.types";

export const useMarkAsRead = () => {
  return useMutation({
    mutationFn: markAsRead,

    onSuccess: (_, notificationId) => {
      queryClient.setQueryData<Notification[]>(
        ["notifications"],
        (old = []) =>
          old.map((notification) =>
            notification.id === notificationId
              ? {
                  ...notification,
                  isRead: true,
                }
              : notification
          )
      );

      queryClient.invalidateQueries({
        queryKey: ["notification-count"],
      });
    },
  });
};