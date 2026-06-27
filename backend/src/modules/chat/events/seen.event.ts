import type { Server } from "socket.io";
import type { AuthenticatedSocket } from "../../../socket/types.js";

import { chatService } from "../chat.service.js";

export const registerSeenEvent = (
  io: Server,
  socket: AuthenticatedSocket
) => {
  socket.on(
    "chat:seen",
    async (
      conversationId: string
    ) => {
      try {
        await chatService.markSeen({
          conversationId,
          userId: socket.user!.id,
        });

        io.to(conversationId).emit(
          "chat:seen",
          {
            conversationId,
            userId: socket.user!.id,
          }
        );
      } catch (error) {
        socket.emit("chat:error", {
          message:
            error instanceof Error
              ? error.message
              : "Failed to mark seen",
        });
      }
    }
  );
};