import { useState } from "react";

import { ArrowLeft } from "lucide-react";
import { useConversations } from "../hooks/useConversations";
import { useSearchUsers } from "../hooks/useSearchUsers";
import type { Conversation } from "../types/chat.types";

import { useNavigate } from "react-router-dom";
import SearchInput from "../components/SearchInput";
import SearchResults from "../components/SearchResults";
import ConversationItem from "./ConversationItem";

const ConversationList = () => {
  const [search, setSearch] = useState("");
const navigate = useNavigate();
  const { data: conversations, isLoading } =
    useConversations();

  const { data: users = [] } =
    useSearchUsers(search);

  if (isLoading) {
    return (
      <div className="p-5">
        Loading...
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">

      <div className="border-b p-5 flex gap-2 border-amber-500 justify-between items-center space-y-4">
       
    <button
      onClick={() => navigate("/")}
      className="rounded-full p-2 transition hover:bg-gray-100"
    >
      <ArrowLeft size={20} />
    </button>
        <h1 className="text-2xl font-bold">
          Messages
        </h1>

        <SearchInput
          value={search}
          onChange={setSearch}
        />

      </div>

      <div className="relative flex-1">

        {search.trim() && (
          <SearchResults
            users={users}
            onClose={() => setSearch("")}
          />
        )}

        <div className="h-full overflow-y-auto">

          {conversations?.map(
            (conversation: Conversation) => (
              <ConversationItem
                key={conversation.id}
                conversation={conversation}
              />
            )
          )}

        </div>

      </div>

    </div>
  );
};

export default ConversationList;