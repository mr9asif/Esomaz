import { useSocket } from "@/socket/useSocket";
import { useEffect, useState } from "react";

export const useOnlineUsers = () => {
  const { socket } = useSocket();

  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handleOnlineUsers = (userIds: string[]) => {
      console.log("🟢 Current online users:", userIds);

      setOnlineUsers(new Set(userIds));
    };

    const handleUserOnline = (userId: string) => {
      console.log("🟢 User came online:", userId);

      setOnlineUsers((prev) => {
        const next = new Set(prev);
        next.add(userId);
        return next;
      });
    };

    const handleUserOffline = (userId: string) => {
      console.log("🔴 User went offline:", userId);

      setOnlineUsers((prev) => {
        const next = new Set(prev);
        next.delete(userId);
        return next;
      });
    };

    socket.on("users:online", handleOnlineUsers);
    socket.on("user:online", handleUserOnline);
    socket.on("user:offline", handleUserOffline);

    // IMPORTANT:
    // If socket was already connected before this hook mounted,
    // request the current online users.
    if (socket.connected) {
      socket.emit("users:online:request");
    }

    return () => {
      socket.off("users:online", handleOnlineUsers);
      socket.off("user:online", handleUserOnline);
      socket.off("user:offline", handleUserOffline);
    };
  }, [socket]);

  return onlineUsers;
};
