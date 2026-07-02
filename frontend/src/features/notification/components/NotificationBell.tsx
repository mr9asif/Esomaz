import { useQueryClient } from "@tanstack/react-query";
import { Bell } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useSocket } from "@/socket/useSocket";
import { useUnreadCount } from "../hooks/useUnreadCount";
import type { Notification } from "../types/notification.types";

const NotificationBell = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { socket } = useSocket();

  const { data } = useUnreadCount();

  useEffect(() => {
    if (!socket) return;

    const handleNotification = (
      notification: Notification
    ) => {
      // Update notification list
      queryClient.setQueryData(
        ["notifications"],
        (old: Notification[] = []) => {
          return [notification, ...old];
        }
      );

      // Update unread badge
      queryClient.setQueryData(
        ["notification-count"],
        (old: { count: number } | undefined) => ({
          count: (old?.count ?? 0) + 1,
        })
      );
    };

    socket.on(
      "notification:new",
      handleNotification
    );

    return () => {
      socket.off(
        "notification:new",
        handleNotification
      );
    };
  }, [socket, queryClient]);

  return (
    <button
      onClick={() =>
        navigate("/notifications")
      }
      className="relative"
    >
      <Bell className="h-6 w-6" />

      {(data?.count ?? 0) > 0 && (
        <span className="absolute -right-2 -top-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
          {data?.count}
        </span>
      )}
    </button>
  );
};

export default NotificationBell;