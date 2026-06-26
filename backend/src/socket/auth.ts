import { verifyToken } from "../util/jwt.js";
import type { AuthenticatedSocket } from "./types.js";

const parseCookies = (cookieHeader: string) => {
  return cookieHeader.split(";").reduce<Record<string, string>>(
    (acc, cookie) => {
      const [key, ...value] = cookie.trim().split("=");

      if (!key) return acc;

      acc[key] = decodeURIComponent(value.join("="));

      return acc;
    },
    {}
  );
};

export const socketAuth = (
  socket: AuthenticatedSocket,
  next: (err?: Error) => void
) => {
  try {
    const cookieHeader = socket.handshake.headers.cookie;

    if (!cookieHeader) {
      return next(new Error("Unauthorized"));
    }

    const cookies = parseCookies(cookieHeader);

    const token = cookies.token;

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