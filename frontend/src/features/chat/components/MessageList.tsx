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
  if (!conversationId) return;

  if (!data?.length) return;

  socket.emit(
    "chat:seen",
    conversationId
  );
}, [conversationId, data, socket]);

useEffect(() => {
  const handleSeen = ({
    conversationId: updatedConversationId,
  }: {
    conversationId: string;
  }) => {
    if (
      updatedConversationId !==
      conversationId
    ) {
      return;
    }

    queryClient.invalidateQueries({
      queryKey: [
        "messages",
        conversationId,
      ],
    });
  };

  socket.on(
    "chat:seen",
    handleSeen
  );

  return () => {
    socket.off(
      "chat:seen",
      handleSeen
    );
  };
}, [conversationId, socket]);

 useEffect(() => {
  const handleReceive = (message: Message) => {
    console.log("📩 Received socket message:", message);

    if (message.conversationId !== conversationId) {
      console.log("❌ Wrong conversation");
      return;
    }

    queryClient.setQueryData<Message[]>(
      ["messages", conversationId],
      (old = []) => {
        console.log("Old Cache:", old);

        return [...old, message];
      }
    );
  };

  socket.on("chat:receive", handleReceive);

  return () => {
    socket.off("chat:receive", handleReceive);
  };
}, [conversationId, socket]);

// edit message 
useEffect(() => {
  const handleEdited = (
    updatedMessage: Message
  ) => {
    if (
      updatedMessage.conversationId !==
      conversationId
    ) {
      return;
    }

    queryClient.setQueryData<Message[]>(
      ["messages", conversationId],
      (old = []) => {
        return old.map((message) =>
          message.id === updatedMessage.id
            ? updatedMessage
            : message
        );
      }
    );
  };

  socket.on(
    "chat:edited",
    handleEdited
  );

  return () => {
    socket.off(
      "chat:edited",
      handleEdited
    );
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