import { useSuggestions } from "@/features/follow/hooks/useSuggestions";
import { useToggleFollow } from "@/features/follow/hooks/useToggleFollow";
import type { SuggestionUser } from "@/features/follow/types/follow.type";

const RightSidebar = () => {
  const { data: suggestions, isLoading } =
    useSuggestions();

  const { mutate: toggleFollow } =
    useToggleFollow();

  return (
    <aside className="hidden xl:block w-[350px] h-screen sticky top-0 overflow-y-auto p-5">

      <div className="mt-6 rounded-2xl bg-gray-100 p-5">

        <h2 className="font-bold text-xl">
          Trends
        </h2>

        <div className="mt-4 space-y-4">

          <div>
            <p className="text-sm text-gray-500">
              Technology
            </p>

            <h3 className="font-semibold">
              #AI
            </h3>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Programming
            </p>

            <h3 className="font-semibold">
              #React
            </h3>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Bangladesh
            </p>

            <h3 className="font-semibold">
              #Startup
            </h3>
          </div>

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