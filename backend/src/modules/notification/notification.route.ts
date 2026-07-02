import { Router } from "express";
import protect from "../../middleware/protect.js";
import notificationController from "./notification.controller.js";

const router = Router();

router.get("/", protect, notificationController.getNotifications);

router.get(
  "/unread-count",
  protect,
  notificationController.getUnreadCount
);

// router.patch(
//   "/read-all",
//   protect,
//   notificationController.markAllAsRead
// );

router.patch(
  "/:id/read",
  protect,
  notificationController.markAsRead
);

// router.delete(
//   "/:id",
//   protect,
//   notificationController.deleteNotification
// );

export default router;