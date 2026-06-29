import type { Server } from "socket.io";
import type { AuthenticatedSocket } from "../../../socket/types.js";
import { chatService } from "../chat.service.js";

export const registerSendEvent = (
  io: Server,
  socket: AuthenticatedSocket
) => {
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
            attachments:
              payload.attachments ?? []
          });

        io.to(
          payload.conversationId
        ).emit(
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