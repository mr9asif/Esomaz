import { MessageCircle, Pencil, Share2, UserPlus } from "lucide-react";

type Props = {
  isMe: boolean;
  isFollowing?: boolean;
};

const ProfileAction = ({
  isMe,
  isFollowing,
}: Props) => {
  if (isMe) {
    return (
      <div className="flex justify-center gap-3 mt-6">
        <button className="flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition">
          <Pencil size={18} />
          Edit Profile
        </button>

        <button className="flex items-center gap-2 px-5 py-2 rounded-xl border hover:bg-gray-50 transition">
          <Share2 size={18} />
          Share Profile
        </button>
      </div>
    );
  }

  return (
    <div className="flex justify-center gap-3 mt-6">
      <button
        className={`flex items-center gap-2 px-5 py-2 rounded-xl transition ${
          isFollowing
            ? "border hover:bg-gray-50"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        <UserPlus size={18} />

        {isFollowing ? "Following" : "Follow"}
      </button>

      <button className="flex items-center gap-2 px-5 py-2 rounded-xl border hover:bg-gray-50 transition">
        <MessageCircle size={18} />
        Message
      </button>
    </div>
  );
};

export default ProfileAction;