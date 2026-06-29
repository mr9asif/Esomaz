import type { Server } from "socket.io";
import type { AuthenticatedSocket } from "../../../socket/types.js";
import { chatService } from "../chat.service.js";

export const registerEditEvent = (
  io: Server,
  socket: AuthenticatedSocket
) => {
  socket.on(
    "chat:edit",
    async (payload) => {
      try {
        const message =
          await chatService.editMessage({
            messageId: payload.messageId,
            userId: socket.user!.id,
            content: payload.content,
          });

        io.to(message.conversationId).emit(
          "chat:edited",
          message
        );
      } catch (error) {
        socket.emit("chat:error", {
          message:
            error instanceof Error
              ? error.message
              : "Failed to edit message",
        });
      }
    }
  );
};