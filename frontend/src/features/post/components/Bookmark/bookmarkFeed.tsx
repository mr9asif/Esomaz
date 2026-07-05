import { Loader } from "lucide-react";
import { useBookmarks } from "../../hooks/useBookmark";
import PostCard from "../postCard/PostCard";

const BookmarksFeed = () => {
  const { data: posts, isLoading } =
    useBookmarks();
   

  if (isLoading) {
    return (
      <div className="p-6">
       
    <div className="flex min-h-screen items-center justify-center">
      <Loader className="h-8 w-8 animate-spin" />
    </div>

      </div>
    );
  }

  if (!posts?.length) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-xl font-semibold">
          No saved posts yet
        </h2>

        <p className="text-gray-500 mt-2">
          Posts you bookmark will appear here.
        </p>
      </div>
    );
  }

  return (
    <div>
      {posts?.map((post) => (
  <PostCard
    key={post.id}
    post={post}
  />
))}
    </div>
  );
};

export default BookmarksFeed;