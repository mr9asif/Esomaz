import {
  MessageCircle,
  Pencil,
  Share2,
  UserPlus,
} from "lucide-react";
import toast from "react-hot-toast";

type Props = {
  isMe: boolean;
  isFollowing?: boolean;
  username: string;
};

const ProfileAction = ({
  isMe,
  isFollowing,
  username,
}: Props) => {
  const handleShare = async () => {
    const url = `${window.location.origin}/profile/${username}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "Check out my Esomaz profile",
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("Profile link copied!");
      }
    } catch {
      try {
        await navigator.clipboard.writeText(url);
        toast.success("Profile link copied!");
      } catch {
        toast.error("Unable to share profile");
      }
    }
  };

  if (isMe) {
    return (
      <div className="flex flex-wrap justify-center gap-3 mt-6">
        <button className="flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition">
          <Pencil size={18} />
          Edit Profile
        </button>

        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-5 py-2 rounded-xl border hover:bg-gray-50 transition"
        >
          <Share2 size={18} />
          Share Profile
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-3 mt-6">
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