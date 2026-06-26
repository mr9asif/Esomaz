import { useConversations } from "../hooks/useConversations";
import type { Conversation } from "../types/chat.types";

import ConversationItem from "./ConversationItem";

const ConversationList = () => {
  const { data, isLoading } =
    useConversations();

  if (isLoading) {
    return (
      <div className="p-5">
        Loading...
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">

      <div className="p-5 border-b">

        <h1 className="text-2xl font-bold">
          Messages
        </h1>

      </div>

      <div className="flex-1 overflow-y-auto">

        {data?.map(
          (conversation: Conversation) => (
            <ConversationItem
              key={conversation.id}
              conversation={conversation}
            />
          )
        )}

      </div>

    </div>
  );
};

export default ConversationList;