const FeedSkeleton = () => {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <PostSkeleton key={index} index={index} />
      ))}
    </div>
  );
};

const PostSkeleton = ({ index }: { index: number }) => {
  const hasImage = index % 2 === 0;

  return (
    <article className="overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <div className="p-4 sm:p-5">
        {/* Header */}
        <div className="flex items-start gap-3">
          <Skeleton className="h-11 w-11 rounded-full flex-shrink-0" />

          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-36 rounded-md" />
            <Skeleton className="h-3 w-24 rounded-md" />
          </div>

          <Skeleton className="h-8 w-8 rounded-full" />
        </div>

        {/* Content */}
        <div className="mt-4 space-y-2">
          <Skeleton className="h-3.5 w-full rounded-md" />
          <Skeleton className="h-3.5 w-[92%] rounded-md" />
          <Skeleton className="h-3.5 w-[70%] rounded-md" />
        </div>

        {/* Image */}
        {hasImage && (
          <div className="mt-4">
            <Skeleton className="aspect-video w-full rounded-xl" />
          </div>
        )}

        {/* Stats */}
        <div className="mt-4 flex gap-5">
          <Skeleton className="h-3 w-10 rounded-md" />
          <Skeleton className="h-3 w-10 rounded-md" />
          <Skeleton className="h-3 w-10 rounded-md" />
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex items-center justify-between border-t border-zinc-200 pt-3 dark:border-zinc-800">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="flex items-center gap-2"
            >
              <Skeleton className="h-9 w-9 rounded-full" />
              <Skeleton className="hidden h-3 w-8 rounded sm:block" />
            </div>
          ))}
        </div>
      </div>
    </article>
  );
};

const Skeleton = ({ className = "" }: { className?: string }) => {
  return (
    <div
      className={`relative overflow-hidden bg-zinc-200 dark:bg-zinc-800 ${className}`}
    >
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 dark:via-white/10 to-transparent" />
    </div>
  );
};

export default FeedSkeleton;