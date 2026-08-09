import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useConversations } from "../hooks/useConversations";
import { useSearchUsers } from "../hooks/useSearchUsers";
import type { Conversation } from "../types/chat.types";

import SearchInput from "../components/SearchInput";
import SearchResults from "../components/SearchResults";
import ConversationItem from "./ConversationItem";
import MessageListSkeleton from "./MessageListSkeleton";

const ConversationList = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const { data: conversations, isLoading } = useConversations();

  const { data: users = [] } = useSearchUsers(search);

  if (isLoading) {
    return <MessageListSkeleton />;
  }

  return (
    <div className="h-full flex flex-col border-r">
      {/* Header */}
      <div className="shrink-0 border-b border-amber-500 p-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/home")}
            className="rounded-full p-2 transition hover:bg-gray-100"
          >
            <ArrowLeft size={20} />
          </button>

          <h1 className="text-2xl font-bold">Chats</h1>
        </div>

        {/* Search */}
        <div className="mt-4">
          <SearchInput value={search} onChange={setSearch} />
        </div>
      </div>

      {/* Conversation area */}
      <div className="relative min-h-0 flex-1">
        {/* Search results */}
        {search.trim() && (
          <SearchResults users={users} onClose={() => setSearch("")} />
        )}

        {/* Conversation list */}
        <div className="h-full overflow-y-auto">
          {conversations?.map((conversation: Conversation) => (
            <ConversationItem
              key={conversation.id}
              conversation={conversation}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConversationList;
