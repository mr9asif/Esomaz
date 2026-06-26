import type { Server } from "socket.io";
import type { AuthenticatedSocket } from "../../socket/types.js";
import { chatService } from "./chat.service.js";

export const registerChatEvents = (
  io: Server,
  socket: AuthenticatedSocket
) => {

  /**
   * Join Conversation
   */
  socket.on(
    "chat:join",
    (conversationId: string) => {

      socket.join(conversationId);

      console.log(
        `${socket.user?.username} joined ${conversationId}`
      );

    }
  );

  /**
   * Leave Conversation
   */
  socket.on(
    "chat:leave",
    (conversationId: string) => {

      socket.leave(conversationId);

      console.log(
        `${socket.user?.username} left ${conversationId}`
      );

    }
  );

  /**
 * Send Message
 */
socket.on(
  "chat:send",
  async (payload) => {
    try {
      const message =
        await chatService.sendMessage({
          conversationId:
            payload.conversationId,

          senderId:
            socket.user!.id,

          content:
            payload.content,

          replyToId:
            payload.replyToId,
        });

      io.to(payload.conversationId).emit(
        "chat:receive",
        message
      );
    } catch (error) {
      socket.emit(
        "chat:error",
        {
          message:
            error instanceof Error
              ? error.message
              : "Failed to send message",
        }
      );
    }
  }
);

};