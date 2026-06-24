import type {
    SearchPost,
    SearchUser,
} from "@/features/search/search.type";
import { Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSearch } from "../../features/search/hooks/useSearch";

const SearchDropdown = () => {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  const [open, setOpen] = useState(false);

  const { data, isLoading } = useSearch(
    query,
    type
  );

  const inputRef =
    useRef<HTMLInputElement>(null);

  const clearSearch = () => {
    setOpen(false);
    setType("all");
    setQuery("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search..."
        value={query}
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          setOpen(true);
          setQuery(e.target.value);
        }}
        className="w-32 md:w-full rounded-lg border px-2 md:px-4 py-1.5 md:py-2 text-sm outline-none"
      />

      {open && query && (
        <div className="absolute top-12 z-50 w-full rounded-xl border bg-white shadow-lg">
          
          <div className="flex gap-2 border-b p-2">
            {["all", "users", "post"].map(
              (item) => (
                <button
                  key={item}
                  onClick={() =>
                    setType(item)
                  }
                  className={`rounded-md px-2 px-3 py-1 text-xs md:text-sm ${
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
              
              {data?.users?.map(
                (user: SearchUser) => (
                  <NavLink
                    key={user.id}
                    to={`/profile/${user.username}`}
                    onClick={clearSearch}
                    className="flex items-center gap-2 md:gap-3 p-2 md:p-3 hover:bg-gray-100"
                  >
                    <img
                      src={
                        user.avatar ||
                        "/avatar.png"
                      }
                      alt={
                        user.username
                      }
                      className="h-8 w-8 md:h-10 md:w-10 rounded-full object-cover"
                    />

                    <span className="text-sm md:text-base font-medium">
                      {user.username}
                    </span>
                  </NavLink>
                )
              )}

              {data?.posts?.map(
                (post: SearchPost) => (
                  <NavLink
                    key={post.id}
                    to={`/post/${post.id}`}
                    onClick={clearSearch}
                    className="block border-t p-3 hover:bg-gray-50"
                  >
                    <p className="line-clamp-2 text-xs md:text-sm">
                      {post.content}
                    </p>
                  </NavLink>
                )
              )}

              {!data?.users?.length &&
                !data?.posts?.length && (
                  <p className="p-3 md:p-4 text-center text-xs md:text-sm text-gray-500">
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