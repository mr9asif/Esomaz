import PostCard from "../../components/postCard/PostCard";
import { usePosts } from "../../hooks/usePosts";

export default function Feed() {
  const { data, isLoading } = usePosts();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="space-y-5 border-none pb-32">
      {data?.map((post) => (
        <PostCard
          key={post.id}
          post={post}
        />
      ))}
      
    </div>
  );
}