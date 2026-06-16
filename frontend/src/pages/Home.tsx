// import { useMe } from "@/features/auth/hooks/useMe";
import CreatePost from "@/features/post/components/createPost/CreatePost";
import Feed from "@/features/post/components/feed/Feed";
import MainLayout from "@/layouts/MainLayout";

const Home = () => {
  // const { data } = useMe();

  return (
    <MainLayout>
     <div className="max-w-2xl mx-auto py-5 space-y-6">

            <CreatePost />

            <Feed />

        </div>
    </MainLayout>
  );
};

export default Home;