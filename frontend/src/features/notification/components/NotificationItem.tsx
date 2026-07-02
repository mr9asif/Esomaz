import {
    CheckCircle,
    Heart,
    MessageCircle,
    UserPlus,
} from "lucide-react";

import { formatTime } from "@/features/post/utils/format.time";
import type { Notification } from "../types/notification.types";

interface Props {
  notification: Notification;
  onClick: (notification: Notification) => void;
}

const NotificationItem = ({
  notification,
  onClick,
}: Props) => {
  const renderIcon = () => {
    switch (notification.type) {
      case "FOLLOW":
        return (
          <UserPlus
            size={18}
            className="text-blue-500"
          />
        );

      case "LIKE":
        return (
          <Heart
            size={18}
            className="fill-red-500 text-red-500"
          />
        );

      case "COMMENT":
      case "REPLY":
        return (
          <MessageCircle
            size={18}
            className="text-green-500"
          />
        );

      case "MESSAGE":
        return (
          <MessageCircle
            size={18}
            className="text-sky-500"
          />
        );

      default:
        return (
          <CheckCircle
            size={18}
            className="text-gray-500"
          />
        );
    }
  };

  const renderText = () => {
    switch (notification.type) {
      case "FOLLOW":
        return "started following you.";

      case "LIKE":
        return "liked your post.";

      case "COMMENT":
        return "commented on your post.";

      case "REPLY":
        return "replied to your comment.";

      case "MESSAGE":
        return "sent you a message.";

      default:
        return "";
    }
  };

  return (
    <button
      onClick={() => onClick(notification)}
      className={`flex w-full items-start gap-4 border-b border-gray-200 p-4 text-left transition hover:bg-gray-50 ${
        !notification.isRead ? "bg-blue-50" : "bg-white"
      }`}
    >
      {/* Notification Type Icon */}
      <div className="mt-1">
        {renderIcon()}
      </div>

      {/* User Avatar */}
      <img
        src={notification.sender.avatar || "/avatar.png"}
        alt={notification.sender.name}
        className="h-11 w-11 rounded-full object-cover"
      />

      {/* Notification Content */}
      <div className="flex-1">
        <p className="text-sm text-gray-900">
          <span className="font-semibold">
            {notification.sender.name}
          </span>{" "}
          {renderText()}
        </p>

        <p className="mt-1 text-xs text-gray-500">
          {formatTime(notification.createdAt)}
        </p>
      </div>

      {/* Unread Indicator */}
      {!notification.isRead && (
        <div className="mt-2 h-2.5 w-2.5 rounded-full bg-blue-500" />
      )}
    </button>
  );
};

export default NotificationItem;