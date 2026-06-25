import { verifyToken } from "../util/jwt.js";
import type { AuthenticatedSocket } from "./types.js";

export const socketAuth = (
  socket: AuthenticatedSocket,
  next: (err?: Error) => void
) => {
  try {
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new Error("Unauthorized"));
    }

    const decoded = verifyToken(token);

    socket.user = {
      id: decoded.id,
      username: decoded.username,
      email: decoded.email,
    };

    next();
  } catch {
    next(new Error("Invalid token"));
  }
};