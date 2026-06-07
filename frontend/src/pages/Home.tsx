import { useMe } from "@/features/auth/hooks/useMe";
import MainLayout from "@/layouts/MainLayout";

const Home = () => {
  const { data } = useMe();

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold ">
        Home Feed
      </h1>

      <p>
        Welcome {data?.data?.name}
      </p>
    </MainLayout>
  );
};

export default Home;