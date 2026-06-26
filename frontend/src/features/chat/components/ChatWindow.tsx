import { useParams } from "react-router-dom";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";

const ChatWindow = () => {
  const { conversationId } =
    useParams();

  if (!conversationId) {
    return (
      <div className="h-full flex items-center justify-center">

        <h1 className="text-gray-400">

          Select a conversation

        </h1>

      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">

      <ChatHeader />

      <MessageList />

      <MessageInput />

    </div>
  );
};

export default ChatWindow;