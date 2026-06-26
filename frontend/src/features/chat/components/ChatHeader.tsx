import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useParams } from "react-router-dom";
import { useConversation } from "../hooks/useConversation";

import { useAuth } from "@/provider/UseAuth";
import type { ConversationParticipant } from "../types/chat.types";

const ChatHeader = () => {
  const navigate = useNavigate();

  const { conversationId } = useParams();

  const { data: conversation } =
    useConversation(conversationId!);

  const { user } = useAuth();

  if (!conversation) return null;

  const receiver =
    conversation.participants.find(
      (participant:ConversationParticipant) =>
        participant.user.id !== user?.id
    );

  if (!receiver) return null;

  return (
    <div className="h-16 border-b flex items-center px-4">

      <button
        onClick={() => navigate("/messages")}
        className="mr-3 lg:hidden"
      >
        <ArrowLeft size={22} />
      </button>

      <img
        src={
          receiver.user.avatar ??
          "/default-avatar.png"
        }
        alt={receiver.user.name}
        className="w-10 h-10 rounded-full object-cover"
      />

      <div className="ml-3">

        <h2 className="font-semibold">

          {receiver.user.name}

        </h2>

        <p className="text-sm text-gray-500">

          @{receiver.user.username}

        </p>

      </div>

    </div>
  );
};

export default ChatHeader;