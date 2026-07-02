import { prisma } from "../../config/prisma.js";
import { socketStore } from "../../socket/socketStore.js";
import type { CreateNotificationInput } from "./notification.types.js";

class NotificationService {
  // Get latest notifications
  async getNotifications(userId: string) {
      console.log("Searching receiver:", userId);
    return prisma.notification.findMany({
      where: {
        receiverId: userId,
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            username: true,
            avatar: true,
            isVerified: true,
          },
        },

        post: {
          select: {
            id: true,
            content: true,
          },
        },

        comment: {
          select: {
            id: true,
            content: true,
          },
        },

        message: {
          select: {
            id: true,
            content: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },

      take: 30,
    });
  }

  // Get unread notification count
  async getUnreadCount(userId: string) {
    const count = await prisma.notification.count({
      where: {
        receiverId: userId,
        isRead: false,
      },
    });

    return { count };
  }

  // Mark notification as read
  async markAsRead(notificationId: string, userId: string) {
    const notification = await prisma.notification.findFirst({
      where: {
        id: notificationId,
        receiverId: userId,
      },
    });

    if (!notification) {
      throw new Error("Notification not found.");
    }

    return prisma.notification.update({
      where: {
        id: notificationId,
      },
      data: {
        isRead: true,
      },
    });
  }

  // Create notification
  async createNotification(input: CreateNotificationInput) {
    if (input.receiverId === input.senderId) {
      return null;
    }

    const notification = await prisma.notification.create({
      data: {
        receiverId: input.receiverId,
        senderId: input.senderId,
        type: input.type,

        ...(input.postId && { postId: input.postId }),
        ...(input.commentId && { commentId: input.commentId }),
        ...(input.messageId && { messageId: input.messageId }),
      },

      include: {
        sender: {
          select: {
            id: true,
            name: true,
            username: true,
            avatar: true,
            isVerified: true,
          },
        },

        post: {
          select: {
            id: true,
            content: true,
          },
        },

        comment: {
          select: {
            id: true,
            content: true,
          },
        },

        message: {
          select: {
            id: true,
            content: true,
          },
        },
      },
    });
console.log(notification)
    // Send realtime notification if receiver is online
    const socket = socketStore.getUser(input.receiverId);

    if (socket) {
      socket.emit("notification:new", notification);
    }

    return notification;
  }

  // Clear all read notifications
  async clearReadNotifications(userId: string) {
    await prisma.notification.deleteMany({
      where: {
        receiverId: userId,
        isRead: true,
      },
    });

    return {
      message: "Read notifications cleared.",
    };
  }
}

export default new NotificationService();