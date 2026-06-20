import { useAuth } from "@/provider/UseAuth";
import { useState } from "react";
import { useComments } from "../../hooks/useComment";
import { useCreateComment } from "../../hooks/useCreateComment";

interface Props {
  postId: string;
}

export default function CommentSection({ postId }: Props) {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [visibleComments, setVisibleComments] = useState(3);

const {
  mutate: createComment,
  isPending,
} = useCreateComment();

  const {
    data: comments = [],
    isLoading,
  } = useComments(postId);

  return (
    <div className="mt-5 border-t border-gray-200 pt-4 animate-in fade-in duration-300">

      {/* Create Comment */}

      <div className="flex gap-3 mb-6">

        <img
          src={user?.avatar}
          alt=""
          className="w-10 h-10 rounded-full object-cover"
        />

        <div className="flex-1">

         <textarea
  rows={2}
  value={content}
  onChange={(e) =>
    setContent(e.target.value)
  }
  placeholder="Write a thoughtful comment..."
  className="
    w-full
    resize-none
    rounded-xl
    border
    border-gray-200
    bg-gray-50
    p-3
    outline-none
    focus:border-blue-500
  "
/>
          <div className="flex justify-end mt-2">

           <button
  disabled={isPending}
  onClick={() => {
    if (!content.trim()) return;

    createComment({
      postId,
      content,
    });
console.log(postId, content)
    setContent("");
  }}
  className="
    rounded-lg
    bg-blue-600
    px-4
    py-2
    text-white
    disabled:opacity-50
  "
>
  Post
</button>

          </div>

        </div>

      </div>

      {/* Loading */}

      {isLoading && (

        <div className="space-y-4">

          {[1, 2].map((item) => (

            <div
              key={item}
              className="flex gap-3 animate-pulse"
            >

              <div className="w-10 h-10 rounded-full bg-gray-200" />

              <div className="flex-1">

                <div className="h-3 w-28 bg-gray-200 rounded mb-2" />

                <div className="h-3 w-full bg-gray-200 rounded mb-2" />

                <div className="h-3 w-2/3 bg-gray-200 rounded" />

              </div>

            </div>

          ))}

        </div>

      )}

      {/* Empty */}

      {!isLoading && comments.length === 0 && (

        <div className="py-8 text-center">

          <p className="font-medium text-gray-500">

            No comments yet

          </p>

          <p className="text-sm text-gray-400 mt-1">

            Be the first person to comment.

          </p>

        </div>

      )}

      {/* Comments */}

    {!isLoading && comments.length > 0 && (

  <div className="space-y-4">

    {comments
      .slice(0, visibleComments)
      .map((comment) => (

        <div
          key={comment.id}
          className="flex gap-3"
        >

          <img
            src={comment.user.avatar}
            className="w-10 h-10 rounded-full object-cover"
          />

          <div className="flex-1">

            <div
              className="
                bg-gray-50
                border
                border-gray-100
                rounded-2xl
                px-4
                py-3
              "
            >

              <p className="font-semibold text-sm">
                {comment.user.name}
              </p>

              <p className="text-sm mt-1">
                {comment.content}
              </p>

            </div>

            <div className="flex gap-5 text-xs text-gray-500 mt-2 ml-3">

              <button className="font-medium hover:text-blue-600">
                Reply
              </button>

              <span>
                Just now
              </span>

            </div>

          </div>

        </div>

      ))}

    {/* View More Button */}

    {comments.length > visibleComments && (

      <div className="flex justify-center pt-2">

        <button
          onClick={() =>
            setVisibleComments((prev) => prev + 5)
          }
          className="
            text-sm
            font-medium
            text-blue-600
            hover:underline
          "
        >
          View {comments.length - visibleComments} more comments
        </button>

      </div>

    )}

  </div>

)}

    </div>
  );
}