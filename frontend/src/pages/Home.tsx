import { useMe } from "@/features/auth/hooks/useMe";

const Home = () => {
  const { data, isLoading } = useMe();
  console.log(data)

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>Home Page</h1>

      {data?.data ? (
        <>
          <p>{data.data.name}</p>
          <p>{data.data.email}</p>
        </>
      ) : (
        <p>Not Logged In</p>
      )}
    </div>
  );
};

export default Home;