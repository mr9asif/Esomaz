import { AppError } from "../../util/AppError.js";
import { chatRepository } from "./chat.repository.js";
import type {
  CreateDirectConversationPayload,
  DeleteMessagePayload,
  EditMessagePayload,
  GetConversationPayload,
  GetUserConversationsPayload,
  MarkMessageSeenPayload,
  SendMessagePayload,
} from "./chat.type.js";

export class ChatService {
  /**
   * Create or return existing direct conversation
   */
  async createDirectConversation(
    payload: CreateDirectConversationPayload
  ) {
    const { currentUserId, receiverId } = payload;

    if (currentUserId === receiverId) {
      throw new Error("You can't message yourself.");
    }

    const existing =
      await chatRepository.findDirectConversation(
        currentUserId,
        receiverId
      );

    if (existing) {
      return existing;
    }

   return chatRepository.createDirectConversation(
  currentUserId,
  receiverId
);
  }

  /**
   * Get user's conversations
   */
  async getUserConversations(
    payload: GetUserConversationsPayload
  ) {
    return chatRepository.getUserConversations(
      payload.userId
    );
  }

  /**
   * Get conversation
   */
  async getConversation(
    payload: GetConversationPayload
  ) {
    const participant =
      await chatRepository.isParticipant(
        payload.conversationId,
        payload.userId
      );

    if (!participant) {
      throw new AppError(
    "Unauthorized",
    401
)
    }

    const conversation =
      await chatRepository.getConversationById(
        payload.conversationId
      );

    if (!conversation) {
      throw new Error("Conversation not found");
    }

    return conversation;
  }

  /**
   * Send Message
   */
  async sendMessage(
    payload: SendMessagePayload
  ) {
    const participant =
      await chatRepository.isParticipant(
        payload.conversationId,
        payload.senderId
      );

    if (!participant) {
     throw new AppError(
    "Unauthorized",
    401
)
    }

    if (
      !payload.content &&
      !payload.replyToId
    ) {
      throw new Error(
        "Message cannot be empty."
      );
    }

    if (payload.replyToId) {
      const reply =
        await chatRepository.getMessage(
          payload.replyToId
        );

      if (!reply) {
        throw new Error(
          "Reply message not found."
        );
      }
    }

    const message =
  await chatRepository.createMessage(payload);

  console.log("Repository methods:", Object.getOwnPropertyNames(Object.getPrototypeOf(chatRepository)));
console.log("touchConversation:", typeof chatRepository.touchConversation);

console.log("hello:", typeof chatRepository.hello);
console.log("hello call:", chatRepository.hello?.());
await chatRepository.touchConversation(
  payload.conversationId
);

return message;
  }

  /**
   * Messages
   */
  async getMessages(
    conversationId: string,
    userId: string
  ) {
    const participant =
      await chatRepository.isParticipant(
        conversationId,
        userId
      );

    if (!participant) {
    throw new AppError(
    "Unauthorized",
    401
)
    }

    return chatRepository.getMessages(
      conversationId
    );
  }

  /**
   * Edit Message
   */
 async editMessage(
  payload: EditMessagePayload
) {
  const existingMessage =
    await chatRepository.getMessage(
      payload.messageId
    );

  if (!existingMessage) {
    throw new Error("Message not found.");
  }

  if (existingMessage.senderId !== payload.userId) {
    throw new Error("Unauthorized");
  }

  if (existingMessage.deletedAt) {
    throw new Error("Message already deleted.");
  }

  const updatedMessage =
    await chatRepository.editMessage(
      payload.messageId,
      payload.content
    );

  await chatRepository.touchConversation(
    updatedMessage.conversationId
  );

  return updatedMessage;
}

  /**
   * Delete Message
   */
  async deleteMessage(
    payload: DeleteMessagePayload
  ) {
    const message =
      await chatRepository.getMessage(
        payload.messageId
      );

    if (!message) {
      throw new Error(
        "Message not found."
      );
    }

    if (
      message.senderId !== payload.userId
    ) {
      throw new Error("Unauthorized");
    }

    return chatRepository.deleteMessage(
      payload.messageId
    );
  }

  /**
   * Seen
   */
  async markSeen(
    payload: MarkMessageSeenPayload
  ) {
    const participant =
      await chatRepository.isParticipant(
        payload.conversationId,
        payload.userId
      );

    if (!participant) {
   throw new AppError(
    "Unauthorized",
    401
)
    }

    const result =
  await chatRepository.markConversationSeen(
    payload.conversationId,
    payload.userId
  );

console.log("Seen Result:", result);

return result;
  }
}

export const chatService =
  new ChatService();