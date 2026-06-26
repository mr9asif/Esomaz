import type { ReactNode } from "react";
import { useEffect } from "react";

import { socket } from "./socket";
import { SocketContext } from "./socketContext";

import { useAuth } from "@/provider/UseAuth";

interface Props {
  children: ReactNode;
}

export const SocketProvider = ({
  children,
}: Props) => {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    socket.connect();

    socket.on("connect", () => {
      console.log("🟢 Socket Connected", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("🔴 Socket Disconnected");
    });

    socket.on("connect_error", (error) => {
      console.error(error.message);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("connect_error");

      socket.disconnect();
    };
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};