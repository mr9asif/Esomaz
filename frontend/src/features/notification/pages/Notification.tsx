import { useNavigate } from "react-router-dom";

import NotificationItem from "@/features/notification/components/NotificationItem";
import NotificationSkeleton from "@/features/notification/components/NotificationSkeleton";

import { useMarkAsRead } from "@/features/notification/hooks/useMarkAsRead";
import { useNotifications } from "@/features/notification/hooks/useNotification";

import type { Notification } from "@/features/notification/types/notification.types";

import MainLayout from "@/layouts/MainLayout";

const Notifications = () => {
  const navigate = useNavigate();

  const {
    data: notifications = [],
    isLoading,
  } = useNotifications();

  const { mutate: markAsRead } = useMarkAsRead();

  const handleClick = (
    notification: Notification
  ) => {
    // Mark as read if unread
    if (!notification.isRead) {
      markAsRead(notification.id);
    }

    // Navigate
    switch (notification.type) {
      case "FOLLOW":
        navigate(
          `/profile/${notification.sender.username}`
        );
        break;

      case "LIKE":
      case "COMMENT":
      case "REPLY":
        if (notification.post?.id) {
          navigate(
            `/post/${notification.post.id}`
          );
        }
        break;

      case "MESSAGE":
        navigate("/messages");
        break;

      default:
        break;
    }
  };

  return (
    <MainLayout>
      <div className="mx-auto max-w-2xl pb-20">
        {isLoading ? (
          <NotificationSkeleton />
        ) : notifications.length === 0 ? (
          <div className="py-16 text-center text-gray-500">
            No notifications yet.
          </div>
        ) : (
          notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onClick={handleClick}
            />
          ))
        )}
      </div>
    </MainLayout>
  );
};

export default Notifications;