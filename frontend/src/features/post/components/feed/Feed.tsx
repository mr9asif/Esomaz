import { useAuth } from "@/provider/UseAuth";
import PostCard from "../../components/postCard/PostCard";
import { useFollowingPosts } from "../../hooks/useFollowingPosts";
import { usePosts } from "../../hooks/usePosts";

interface FeedProps {
  tab: "forYou" | "following";
}

export default function Feed({
  tab,
}: FeedProps) {
  const { user } = useAuth();

  const forYouQuery = usePosts();

  const followingQuery =
    useFollowingPosts(user?.id || "");

  const { data, isLoading } =
    tab === "forYou"
      ? forYouQuery
      : followingQuery;

      console.log("data", data)
      console.log("TAB:", tab);
console.log("FOR YOU:", forYouQuery.data);
console.log(
  "FOLLOWING:",
  followingQuery.data
);

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