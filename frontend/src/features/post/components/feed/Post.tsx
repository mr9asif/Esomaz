import LeftSidebar from "@/components/sidebar/LeftSidebar";
import RightSidebar from "@/components/sidebar/RightSidebar";
import CreatePost from "@/features/post/components/createPost/CreatePost";
import MainLayout from "@/layouts/MainLayout";

const Post = () => {
  return (
    <MainLayout>
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr_320px] gap-6">
        <LeftSidebar />

        <div className="min-w-0">
          <CreatePost />
        </div>

        <RightSidebar />
      </div>
    </MainLayout>
  );
};

export default Post;