import { useAuth } from "@/provider/UseAuth";
import PostCard from "../../components/postCard/PostCard";
import { useFollowingPosts } from "../../hooks/useFollowingPosts";

import { usePosts } from "../../hooks/usePosts";
import FeedSkeleton from "./FeedSkeleton";

interface FeedProps {
  tab: "forYou" | "following";
}

export default function Feed({
  tab,
}: FeedProps) {
  const { user } = useAuth();

  const forYouQuery = usePosts();
  console.log("for",forYouQuery)

  const followingQuery =
    useFollowingPosts(user?.id || "");

  const { data, isLoading } =
    tab === "forYou"
      ? forYouQuery
      : followingQuery;

    console.log("d",data)

  if (isLoading) {
    <FeedSkeleton></FeedSkeleton>
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