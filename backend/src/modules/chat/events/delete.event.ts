import type { Server } from "socket.io";
import type { AuthenticatedSocket } from "../../../socket/types.js";
import { chatService } from "../chat.service.js";

export const registerDeleteEvent = (
  io: Server,
  socket: AuthenticatedSocket
) => {
  socket.on(
    "chat:delete",
    async (payload) => {
      try {
        const message =
          await chatService.deleteMessage({
            messageId: payload.messageId,
            userId: socket.user!.id,
          });

        io.to(message.conversationId).emit(
          "chat:deleted",
          message
        );
      } catch (error) {
        socket.emit("chat:error", {
          message:
            error instanceof Error
              ? error.message
              : "Failed to delete message",
        });
      }
    }
  );
};