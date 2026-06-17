import LeftSidebar from "@/components/sidebar/LeftSidebar";
import RightSidebar from "@/components/sidebar/RightSidebar";
import CreatePost from "@/features/post/components/createPost/CreatePost";
import Feed from "@/features/post/components/feed/Feed";
import MainLayout from "@/layouts/MainLayout";

const Home = () => {
    return (
        <MainLayout>
            <div className="max-w-[1800px] mx-auto flex ">

              <div className="">
                  {/* Left Sidebar */}
                <LeftSidebar />
              </div>

                {/* Center */}
                <main className="flex-1 max-w-[950px]  border-x border-gray-200 min-h-screen">

                    <div className="sticky top-0 bg-white/90 backdrop-blur-md z-20 border-b">

                        <div className="flex">

                            <button className="flex-1 py-4 font-semibold border-b-2 border-black">
                                For You
                            </button>

                            <button className="flex-1 py-4 text-gray-500 hover:bg-gray-100 transition">
                                Following
                            </button>

                        </div>

                    </div>

                    <CreatePost />

                    <Feed />

                </main>

               
             <div className="">
                     <RightSidebar />
             </div>

            </div>
        </MainLayout>
    );
};

export default Home;