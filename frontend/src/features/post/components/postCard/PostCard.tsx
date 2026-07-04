import { formatTime } from "@/features/post/utils/format.time";
import { useAuth } from "@/provider/UseAuth";
import {
  Bookmark,
  Heart,
  MessageCircle
} from "lucide-react";
import { useToggleReaction } from "../../hooks/useToggleReaction";
import PostMenu from "../feed/PostMenu";

import { useState } from "react";

import ConfirmDialog from "@/components/common/ConfirmDialogue";
import { useToggleFollow } from "@/features/follow/hooks/useToggleFollow";
import { Link } from "react-router-dom";
import { useToggleBookmark } from "../../hooks/useCreateBookmark";
import { useDeletePost } from "../../hooks/useDeletePost";
import { useUpdatePost } from "../../hooks/useUpdatePost";
import type { Post } from "../../types/post.types";
import CommentsSection from "../comment/CommentSection";
import EditPostModal from "./EditPostModal";
import PostMedia from "./PostMedia";


interface Props {
  post: Post;
}



export default function PostCard({ post }: Props) {
  const { user } = useAuth();
  const [showComments, setShowComments] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] =
  useState(false);
  const [showEditDialog, setShowEditDialog] =
  useState(false);
const {
  mutate: deletePost,
  isPending: isDeleting,
} = useDeletePost();

  const { mutate: toggleBookmarkMutation } =
  useToggleBookmark();
const { mutate: toggleFollow } =
useToggleFollow();

// const { user } = useAuth();

const handleBookmark = () => {
  toggleBookmarkMutation(post.id);
};

const handleDelete = () => {
  console.log("Delete clicked:", post.id);

  deletePost(post.id, {
    onSuccess: () => {
      console.log("Mutation Success");
      setShowDeleteDialog(false);
    },

    onError: (error) => {
      console.error("Mutation Error:", error);
    },
  });
};;

const {
  mutate: updatePost,
  isPending: isUpdating,
} = useUpdatePost();

const handleEdit = (content: string) => {
  updatePost(
    {
      postId: post.id,
      content,
    },
    {
      onSuccess: () => {
        setShowEditDialog(false);
      },
    }
  );
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
       <Link to={`/profile/${post.author.username}`}>
          <img
            src={post.author.avatar}
            className="w-11 h-11 rounded-full object-cover"
            alt={post.author.name}
          />
         </Link>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <Link to={`/profile/${post.author.username}`}>
             
              <h3 className="font-semibold cursor-pointer">
                {post.author.name}
              </h3></Link>

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
  {user?.id === post.author.id ? (
  <PostMenu
  onEdit={() => {
    setShowEditDialog(true);
  }}
  onDelete={() => {
    setShowDeleteDialog(true);
  }}
/>
  ) : (
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
<ConfirmDialog
  open={showDeleteDialog}
  title="Delete Post"
  description="Are you sure you want to delete this post? This action cannot be undone."
  confirmText="Delete"
  loading={isDeleting}
  onClose={() => setShowDeleteDialog(false)}
  onConfirm={handleDelete}
/>
<EditPostModal
  open={showEditDialog}
  initialContent={post.content ?? ""}
  loading={isUpdating}
  onClose={() => setShowEditDialog(false)}
  onSave={handleEdit}
/>
    </article>
    
  );
}