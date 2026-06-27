import { useParams } from "react-router-dom";

import { useMessages } from "../hooks/useMessage";

import { queryClient } from "@/lib/react_query";
import { useSocket } from "@/socket/useSocket";
import { useEffect } from "react";
import type { Message } from "../types/chat.types";
import MessageBubble from "./MessageBubble";




const MessageList = () => {
  const { conversationId } = useParams();

  const { data, isLoading } =
    useMessages(conversationId!);
    const { socket } = useSocket();

    useEffect(() => {
  const handleReceive = (message: Message) => {
    if (message.conversationId !== conversationId) return;

    queryClient.setQueryData<Message[]>(
      ["messages", conversationId],
      (old = []) => [...old, message]
    );
  };

  socket.on("chat:receive", handleReceive);

  return () => {
    socket.off("chat:receive", handleReceive);
  };
}, [conversationId, socket]);
    

  if (isLoading) {
    return (
      <div className="p-5">

        Loading...

      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-5 space-y-3">

      {data?.map((message:Message) => (
        <MessageBubble
          key={message.id}
          message={message}
        />
      ))}

    </div>
  );
};

export default MessageList;