import type { Server } from "socket.io";
import type { AuthenticatedSocket } from "../../socket/types.js";

import {
  registerSeenEvent,
  registerSendEvent,
  registerTypingEvent,
} from "./events/index.event.js";

export const registerChatEvents = (
  io: Server,
  socket: AuthenticatedSocket
) => {
  /**
   * Join Conversation
   */
  socket.on("chat:join", (conversationId: string) => {
    socket.join(conversationId);

    console.log(
      `${socket.user?.username} joined ${conversationId}`
    );
  });

  /**
   * Leave Conversation
   */
  socket.on("chat:leave", (conversationId: string) => {
    socket.leave(conversationId);

    console.log(
      `${socket.user?.username} left ${conversationId}`
    );
  });

  registerSendEvent(io, socket);
  registerSeenEvent(io, socket);
  registerTypingEvent(io, socket);
};