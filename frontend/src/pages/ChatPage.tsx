import { useParams } from "react-router-dom";

import ChatWindow from "@/features/chat/components/ChatWindow";
import ConversationList from "@/features/chat/components/ConversationList";

const ChatPage = () => {
  const { conversationId } = useParams();

  return (
    <div className="h-[calc(100vh-64px)] flex bg-white">

      {/* Conversation List */}

      <div
        className={`
        w-full
        lg:w-96
        border-r

        ${
          conversationId
            ? "hidden lg:block"
            : "block"
        }
      `}
      >
        <ConversationList />
      </div>

      {/* Chat */}

      <div
        className={`
        flex-1

        ${
          conversationId
            ? "block"
            : "hidden lg:block"
        }
      `}
      >
        <ChatWindow />
      </div>

    </div>
  );
};

export default ChatPage;