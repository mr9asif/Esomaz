import type { Request, Response } from "express";
import notificationService from "./notification.service.js";

class NotificationController {
  // Get latest notifications
  async getNotifications(req: Request, res: Response) {
    const notifications = await notificationService.getNotifications(req.user.id);
    console.log("controller notification", notifications)

    return res.status(200).json({
      success: true,
      data: notifications,
    });
  }

  // Get unread notification count
  async getUnreadCount(req: Request, res: Response) {
    const unreadCount = await notificationService.getUnreadCount(req.user.id);

    return res.status(200).json({
      success: true,
      data: unreadCount,
    });
  }

  // Mark notification as read
  async markAsRead(
    req: Request<{ id: string }>,
    res: Response
  ) {
    const notification = await notificationService.markAsRead(
      req.params.id,
      req.user.id
    );

    return res.status(200).json({
      success: true,
      message: "Notification marked as read.",
      data: notification,
    });
  }
}

export default new NotificationController();