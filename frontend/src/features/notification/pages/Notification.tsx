import { useNavigate } from "react-router-dom";

import NotificationItem from "@/features/notification/components/NotificationItem";
import { useMarkAsRead } from "@/features/notification/hooks/useMarkAsRead";
import { useNotifications } from "@/features/notification/hooks/useNotification";
import type { Notification } from "@/features/notification/types/notification.types";

const Notifications = () => {
  const navigate = useNavigate();

  const { data: notifications = [], isLoading } =
    useNotifications();

  const { mutate: markAsRead } = useMarkAsRead();

  const handleClick = (notification: Notification) => {
    if (!notification.isRead) {
      markAsRead(notification.id);
    }

    switch (notification.type) {
      case "FOLLOW":
        navigate(`/profile/${notification.sender.username}`);
        break;

      case "LIKE":
      case "COMMENT":
      case "REPLY":
        if (notification.post?.id) {
          navigate(`/post/${notification.post.id}`);
        }
        break;

      case "MESSAGE":
        navigate("/messages");
        break;
    }
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-2xl p-6">
        Loading notifications...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="border-b p-5">
        <h1 className="text-2xl font-bold">
          Notifications
        </h1>
      </div>

      {notifications.length === 0 ? (
        <div className="p-10 text-center text-gray-500">
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
  );
};

export default Notifications;