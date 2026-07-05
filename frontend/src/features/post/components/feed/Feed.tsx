import { useAuth } from "@/provider/UseAuth";
import PostCard from "../../components/postCard/PostCard";
import { useFollowingPosts } from "../../hooks/useFollowingPosts";

import { usePosts } from "../../hooks/usePosts";
import type { Post } from "../../types/post.types";
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
const currentQuery =
  tab === "forYou"
    ? forYouQuery
    : followingQuery;

const data = currentQuery.data ?? [];
const isLoading = currentQuery.isLoading;

if (isLoading) {
  return <FeedSkeleton />;
}
if (isLoading) {
  return <FeedSkeleton />;
}

  return (
    <div className="space-y-5 border-none pb-32">
      {data?.map((post:Post) => (
        <PostCard
          key={post.id}
          post={post}
        />
      ))}
    </div>
  );
}