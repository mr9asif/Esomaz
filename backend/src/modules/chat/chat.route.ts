import { Router } from "express";

import protect from "../../middleware/protect.js";

import { upload } from "../../middleware/upload.js";
import {
  createDirectConversation,
  deleteMessage,
  editMessage,
  getConversation,
  getMessages,
  getUserConversations,

  sendMessage,
} from "./chat.controller.js";
import { uploadAttachments } from "./upload.controller.js";

const router = Router();

/**
 * Conversation
 */

// Create or Get Direct Conversation
router.post(
  "/direct",
  protect,
  createDirectConversation
);

// Logged in user conversations
router.get(
  "/conversations",
  protect,
  getUserConversations
);

// Get Conversation
router.get(
  "/conversation/:id",
  protect,
  getConversation
);

/**
 * Messages
 */

/**
 * Upload Chat Attachments
 */
router.post(
  "/upload",
  protect,
  upload.array("files", 10),
  uploadAttachments
);

// Get Messages
router.get(
  "/conversation/:id/messages",
  protect,
  getMessages
);



// Send Message
router.post(
  "/message",
  protect,
  sendMessage
);

// Edit Message
router.patch(
  "/message/:id",
  protect,
  editMessage
);

// Delete Message
router.delete(
  "/message/:id",
  protect,
  deleteMessage
);

// // Seen
// router.patch(
//   "/conversation/:id/seen",
//   protect,
//   markSeen
// );

export default router;