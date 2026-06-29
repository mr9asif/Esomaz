import type { Response } from "express";
import type { AuthRequest } from "../../middleware/protect.js";
import { getIO } from "../../socket/index.js";
import { chatService } from "./chat.service.js";

/**
 * Create or get direct conversation
 */
export const createDirectConversation = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const conversation =
      await chatService.createDirectConversation({
        currentUserId: req.user!.id,
        receiverId: req.body.receiverId,
      });

    return res.status(200).json({
      success: true,
      message: "Conversation fetched successfully.",
      data: conversation,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong",
    });
  }
};

/**
 * Get logged in user's conversations
 */
export const getUserConversations = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const conversations =
      await chatService.getUserConversations({
        userId: req.user!.id,
      });

    return res.status(200).json({
      success: true,
      data: conversations,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong",
    });
  }
};

/**
 * Get conversation by id
 */
export const getConversation = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const conversation =
      await chatService.getConversation({
        conversationId: req.params.id as string,
        userId: req.user!.id,
      });

    return res.status(200).json({
      success: true,
      data: conversation,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong",
    });
  }
};

/**
 * Get Messages
 */
export const getMessages = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const messages =
      await chatService.getMessages(
        req.params.id as string,
        req.user!.id
      );

    return res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong",
    });
  }
};

/**
 * Send Message
 */
export const sendMessage = async (
  req: AuthRequest,
  res: Response
) => {
  try {
   const message =
  await chatService.sendMessage({
    conversationId: req.body.conversationId,
    senderId: req.user!.id,
    content: req.body.content,
    replyToId: req.body.replyToId,

    
  });

    return res.status(201).json({
      success: true,
      message: "Message sent successfully.",
      data: message,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong",
    });
  }
};

/**
 * Edit Message
 */
export const editMessage = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const message =
      await chatService.editMessage({
        messageId: req.params.id as string,
        userId: req.user!.id,
        content: req.body.content,
      });

    // Broadcast to everyone in the conversation
    getIO()
      .to(message.conversationId)
      .emit("chat:edited", message);

    return res.status(200).json({
      success: true,
      message: "Message updated successfully.",
      data: message,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong",
    });
  }
};

/**
 * Delete Message
 */
export const deleteMessage = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const message =
      await chatService.deleteMessage({
        messageId: req.params.id as string,
        userId: req.user!.id,
      });

    // Realtime update
    getIO()
      .to(message.conversationId)
      .emit("chat:deleted", message);

    return res.status(200).json({
      success: true,
      message: "Message deleted successfully.",
      data: message,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong",
    });
  }
};
