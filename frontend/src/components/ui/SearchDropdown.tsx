import type { SearchPost, SearchUser } from "@/features/search/search.type";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSearch } from "../../features/search/hooks/useSearch";

const SearchDropdown = () => {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");

  const { data, isLoading } = useSearch(
    query,
    type
  );

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) =>
          setQuery(e.target.value)
        }
        className="w-full rounded-lg border px-4 py-2"
      />

      {query && (
        <div className="absolute top-12 z-50 w-full rounded-xl border bg-white shadow-lg">
          
          <div className="flex gap-2 border-b p-2">
            {["all", "user", "post"].map(
              (item) => (
                <button
                  key={item}
                  onClick={() =>
                    setType(item)
                  }
                  className={`rounded-md px-3 py-1 text-sm ${
                    type === item
                      ? "bg-black text-white"
                      : "bg-gray-100"
                  }`}
                >
                  {item}
                </button>
              )
            )}
          </div>

          {isLoading && (
            <div className="flex justify-center p-4">
              <Loader2 className="animate-spin" />
            </div>
          )}

          {!isLoading && (
            <div className="max-h-96 overflow-y-auto">
              
              {data?.users?.map((user:SearchUser) => (
                <NavLink
                  key={user.id}
                  to={`/profile/${user.username}`}
                  className="flex items-center gap-3 p-3 hover:bg-gray-50"
                >
                  <img
                    src={
                      user.profilePicture ||
                      "/avatar.png"
                    }
                    alt=""
                    className="h-10 w-10 rounded-full"
                  />

                  <span>
                    {user.username}
                  </span>
                </NavLink>
              ))}

              {data?.posts?.map((post:SearchPost) => (
                <NavLink
                  key={post.id}
                  to={`/post/${post.id}`}
                  className="block border-t p-3 hover:bg-gray-50"
                >
                  <p className="line-clamp-2 text-sm">
                    {post.content}
                  </p>
                </NavLink>
              ))}

              {!data?.users?.length &&
                !data?.posts?.length && (
                  <p className="p-4 text-center text-sm text-gray-500">
                    No results found
                  </p>
                )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;