import type { Server } from "socket.io";
import type { AuthenticatedSocket } from "../../../socket/types.js";

export const registerTypingEvent = (
  io: Server,
  socket: AuthenticatedSocket
) => {
  /**
   * User started typing
   */
  socket.on(
    "chat:typing",
    (conversationId: string) => {
      console.log(
        `${socket.user?.username} is typing...`
      );

      socket
        .to(conversationId)
        .emit("chat:typing", {
          conversationId,
          userId: socket.user!.id,
          username: socket.user!.username,
        });
    }
  );

  /**
   * User stopped typing
   */
  socket.on(
    "chat:stopTyping",
    (conversationId: string) => {
      socket
        .to(conversationId)
        .emit("chat:stopTyping", {
          conversationId,
          userId: socket.user!.id,
        });
    }
  );
};