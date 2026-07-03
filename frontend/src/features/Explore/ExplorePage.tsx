import RightSidebar from "@/components/sidebar/RightSidebar";
import MainLayout from "@/layouts/MainLayout";

const ExplorePage = () => {
  return (
    <div className="pb-20">
        <MainLayout>
      <RightSidebar mobile />
      </MainLayout>
    </div>
  );
};

export default ExplorePage;