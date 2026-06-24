import { useSuggestions } from "@/features/follow/hooks/useSuggestions";
import { useToggleFollow } from "@/features/follow/hooks/useToggleFollow";
import type { SuggestionUser } from "@/features/follow/types/follow.type";
import { useTrendingPosts } from "@/features/post/hooks/usetrendingPosts";
import type { Post } from "@/features/post/types/post.types";
import { Heart, MessageCircle } from "lucide-react";
import { NavLink } from "react-router-dom";

const RightSidebar = () => {
  const { data: suggestions, isLoading } =
    useSuggestions();

  const { mutate: toggleFollow } =
    useToggleFollow();

        const { data: trendingPosts } =
  useTrendingPosts();

  return (
    <aside className="hidden xl:block w-[350px] h-screen sticky top-0 overflow-y-auto p-5">
<div className="mt-6 rounded-2xl bg-gray-100 p-5">

  <h2 className="font-bold text-xl mb-4">
    🔥 Trending Posts
  </h2>

  <div className="space-y-4">

    {trendingPosts?.map((post:Post) => (
      <NavLink
        key={post.id}
        to={`/post/${post.id}`}
        className="block rounded-xl p-3 hover:bg-white transition"
      >

        <p className="line-clamp-2 text-sm font-medium text-gray-900">
          {post.content}
        </p>

        <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">

          <div className="flex items-center gap-1">
            <Heart className="h-3.5 w-3.5" />
            {post._count?.reactions ??
              post.reactions?.length ??
              0}
          </div>

          <div className="flex items-center gap-1">
            <MessageCircle className="h-3.5 w-3.5" />
            {post._count?.comments ?? 0}
          </div>

        </div>

      </NavLink>
    ))}

    {trendingPosts?.length === 0 && (
      <p className="text-sm text-gray-500">
        No trending posts yet
      </p>
    )}

  </div>

</div>
      <div className="mt-5 rounded-2xl bg-gray-100 p-5">

        <h2 className="font-bold text-xl">
          Who to Follow
        </h2>

        <div className="mt-5 space-y-4">

          {isLoading && (
            <p className="text-sm text-gray-500">
              Loading...
            </p>
          )}

          {suggestions?.map((user: SuggestionUser) => (
            <div
              key={user.id}
              className="flex items-center justify-between"
            >

              <div className="flex items-center gap-3">

                <img
                  src={
                    user.avatar ||
                    "/avatar.png"
                  }
                  alt={user.username}
                  className="w-10 h-10 rounded-full object-cover"
                />

                <div>

                  <h4 className="font-semibold text-sm">
                    {user.name}
                  </h4>

                  <p className="text-sm text-gray-500">
                    @{user.username}
                  </p>

                  <p className="text-xs text-gray-400">
                    {user._count.followers} followers
                  </p>

                </div>

              </div>

              <button
                onClick={() =>
                  toggleFollow(user.id)
                }
                className="rounded-full bg-black text-white px-4 py-2 text-sm hover:opacity-90 transition"
              >
                Follow
              </button>

            </div>
          ))}

          {!isLoading &&
            suggestions?.length === 0 && (
              <p className="text-sm text-gray-500">
                No suggestions available
              </p>
            )}

        </div>

      </div>

    </aside>
  );
};

export default RightSidebar;