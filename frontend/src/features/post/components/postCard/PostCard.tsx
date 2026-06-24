import {
  Bookmark,
  Heart,
  MessageCircle,
  MoreHorizontal,
} from "lucide-react";

import { formatTime } from "@/features/post/utils/format.time";
import { useAuth } from "@/provider/UseAuth";
import { useToggleReaction } from "../../hooks/useToggleReaction";

import { useState } from "react";

import { useToggleFollow } from "@/features/follow/hooks/useToggleFollow";
import { useToggleBookmark } from "../../hooks/useCreateBookmark";
import type { Post } from "../../types/post.types";
import CommentsSection from "../comment/CommentSection";
import PostMedia from "./PostMedia";

interface Props {
  post: Post;
}



export default function PostCard({ post }: Props) {
  const { user } = useAuth();
  const [showComments, setShowComments] = useState(false);
  // const { mutate: bookmark } =
  // useToggleBookmark();
  const { mutate: toggleBookmarkMutation } =
  useToggleBookmark();
const { mutate: toggleFollow } =
useToggleFollow();

// const { user } = useAuth();

const handleBookmark = () => {
  toggleBookmarkMutation(post.id);
};
 
  const {
    mutate: toggleReaction,
    isPending,
  } = useToggleReaction();

  // Current user liked?
  const liked = post.reactions.some(
    (reaction) => reaction.userId === user?.id
  );
const bookmarked = post.isBookmarked;
  return (
    <article
      className="
      bg-white
      rounded-2xl
      border
      border-gray-200
      shadow-sm
      hover:shadow-md
      transition
      duration-200
      p-5
      "
    >
      {/* Header */}

      <div className="flex justify-between items-start">
        <div className="flex gap-3">
          <img
            src={post.author.avatar}
            className="w-11 h-11 rounded-full object-cover"
            alt={post.author.name}
          />

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold">
                {post.author.name}
              </h3>

              <span className="text-gray-500 text-sm">
                @{post.author.username}
              </span>

              <span className="text-gray-400">·</span>

              <span className="text-gray-400 text-sm">
                {formatTime(post.createdAt)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {user?.id !== post.author.id && (
           
           <button
              onClick={() =>
      toggleFollow(post.author.id)
    }
    className={`rounded-full px-3 py-1 text-xs font-medium ${
      post.author.isFollowing
        ? "bg-gray-200 text-gray-700"
        : "bg-blue-500 text-white"
    }`}
            >
              {post.author.isFollowing
      ? "Following"
      : "Follow"}
            </button>
          )}

          <button
            className="
            p-2
            rounded-full
            hover:bg-gray-100
            transition
            "
          >
            <MoreHorizontal size={18} />
          </button>
        </div>
      </div>

      {/* Content */}

      {post.content && (
        <p className="mt-3 text-gray-800 whitespace-pre-wrap">
          {post.content}
        </p>
      )}

      {/* Media */}

      <PostMedia media={post.media} />

      {/* Stats */}

      <div className="mt-4 flex items-center gap-8 text-sm text-gray-500">
        <span>
          ❤️ {post.reactions.length}
        </span>

        <span className="flex items-center gap-1">
          <MessageCircle size={16}  />
       {post._count?.comments}
        </span>
      </div>

      {/* Actions */}

      <div className="mt-3 flex justify-around border-t pt-3">
        {/* Like */}

        <button
          onClick={() => toggleReaction(post.id)}
          disabled={isPending}
          className={`
            flex
            items-center
            gap-2
            transition
            disabled:opacity-50
            ${
              liked
                ? "text-red-500"
                : "text-gray-600 hover:text-red-500"
            }
          `}
        >
          <Heart
            size={20}
            fill={liked ? "currentColor" : "none"}
          />

          Like
        </button>

        {/* Comment */}

      <button
  onClick={() => setShowComments(!showComments)}
  className="
    flex
    items-center
    gap-2
    text-gray-600
    hover:text-blue-500
    transition
  "
>
  <MessageCircle size={20} />
  Comment
</button>


        {/* Bookmark */}

        <button
        onClick={handleBookmark}
           className={`
    flex
    items-center
    gap-2
    transition
    ${
      bookmarked
        ? "text-red-500"
        : "text-gray-600 hover:text-red-500"
    }
  `}
        >
          <Bookmark size={20}  fill={bookmarked ? "currentColor" : "none"}/>

          Save
        </button>
      </div>
      {showComments && (
   <CommentsSection postId={post.id} />
)}
    </article>
  );
}