import { z } from "zod";

export const createDirectConversationSchema = z.object({
  receiverId: z.uuid("Receiver id is required"),
});

export const sendMessageSchema = z.object({
  conversationId: z.uuid(),
  content: z.string().trim().optional(),
  replyToId: z.uuid().optional(),
});

export const editMessageSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, "Message cannot be empty"),
});