import LeftSidebar from "@/components/sidebar/LeftSidebar";
import PostCard from "@/features/post/components/postCard/PostCard";
import { usePost } from "@/features/post/hooks/usePosts";
import MainLayout from "@/layouts/MainLayout";

import RightSidebar from "@/components/sidebar/RightSidebar";
import { useParams } from "react-router-dom";

const PostDetails = () => {
  const { id } = useParams();

  const {
    data: post,
    isLoading,
  } = usePost(id!);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="max-w-2xl mx-auto py-10">
          Loading...
        </div>
      </MainLayout>
    );
  }

  if (!post) {
    return (
      <MainLayout>
        <div className="max-w-2xl mx-auto py-10">
          Post not found
        </div>
      </MainLayout>
    );
  }
 return (
    <MainLayout>
      <div className="max-w-7xl mx-auto flex gap-6">
        <LeftSidebar />

        <main className="flex-1 max-w-2xl">
          <PostCard post={post}  />

        </main>

        <RightSidebar />
      </div>
    </MainLayout>
  );
};

export default PostDetails;