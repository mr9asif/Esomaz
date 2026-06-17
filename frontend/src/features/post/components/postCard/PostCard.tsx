import {
    Bookmark,
    Heart,
    MessageCircle,
    MoreHorizontal,
} from "lucide-react";

import { useAuth } from "@/provider/UseAuth";

import { formatTime } from "@/features/post/utils/format.time";
import type { Post } from "../../types/post.types";
import PostMedia from "./PostMedia";

interface Props {
  post: Post;
}

export default function PostCard({
  post,
}: Props) {

  const { user } = useAuth();

  return (
    <article className="bg-white
rounded-2xl
border
border-gray-200
shadow-sm
hover:shadow-md
transition
duration-200
p-5">

      {/* Header */}

      <div className="flex justify-between">

        <div className="flex gap-3">

          <img
            src={post.author.avatar}
            className="w-11 h-11 rounded-full object-cover"
          />

          <div>

            <div className="flex items-center gap-2 flex-wrap">

              <h3 className="font-semibold">

                {post.author.name}

              </h3>

              <span className="text-gray-500 text-sm">

                @{post.author.username}

              </span>

              <span className="text-gray-400">

                ·

              </span>

              <span className="text-gray-400 text-sm">

                {formatTime(post.createdAt)}

              </span>

            </div>

          </div>

        </div>

        {user?.id !== post.author.id && (

          <button className="text-blue-600 font-semibold text-sm">

            Follow

          </button>
          

        )}
          <button className="p-2 rounded-full hover:bg-gray-100 transition">
    <MoreHorizontal size={18} />
  </button>

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

      <div className="mt-4 flex justify-start gap-15 text-gray-500 text-sm">

        <span>

          ❤️ {post.reactions.length}

        </span>
         <span className="flex items-center gap-1">
    <MessageCircle size={16} />
    0
  </span>

      </div>

      {/* Actions */}

      <div className="mt-3 flex justify-around border-t pt-3">

        <button className="flex gap-2 text-gray-600 hover:text-red-500">

          <Heart size={20} />

          Like

        </button>

        <button className="flex gap-2 text-gray-600 hover:text-blue-500">

          <MessageCircle size={20} />

          Comment

        </button>

        <button className="flex gap-2 text-gray-600 hover:text-yellow-500">

          <Bookmark size={20} />

          Save

        </button>

      </div>

    </article>
  );
}