import LeftSidebar from "@/components/sidebar/LeftSidebar";
import RightSidebar from "@/components/sidebar/RightSidebar";
import BookmarksFeed from "@/features/post/components/Bookmark/bookmarkFeed";
import MainLayout from "@/layouts/MainLayout";

const Bookmarks = () => {
  return (
    <MainLayout>
      <div className="max-w-[1800px] mx-auto flex">
        
        <LeftSidebar />

        <main
          className="
          flex-1
          max-w-[950px]
          border-x
          border-gray-200
          min-h-screen
        "
        >
          <div
            className="
            sticky
            top-0
            bg-white/90
            backdrop-blur-md
            z-20
            border-b
            px-6
            py-4
          "
          >
            <h1 className="text-xl font-bold">
              Saved Posts
            </h1>

            <p className="text-sm text-gray-500">
              Your bookmarked posts
            </p>
          </div>

          <BookmarksFeed />
        </main>

        <RightSidebar />
      </div>
    </MainLayout>
  );
};

export default Bookmarks;