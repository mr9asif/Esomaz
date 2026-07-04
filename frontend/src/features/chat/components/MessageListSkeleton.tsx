import { ArrowLeft, Search } from "lucide-react";

export default function MessageListSkeleton() {
  return (
    <div className="h-full bg-white animate-pulse">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b">
        <div className="flex items-center gap-4 px-5 py-5">
          <ArrowLeft
            size={26}
            className="text-gray-300"
          />

          <div className="h-8 w-24 rounded bg-gray-200" />

          <div className="ml-auto relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300"
            />

            <div className="h-11 w-56 rounded-xl bg-gray-200" />
          </div>
        </div>
      </div>

      {/* Chat List */}
      <div className="px-5 py-2">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-4 py-4"
          >
            {/* Avatar */}
            <div className="h-14 w-14 rounded-full bg-gray-200" />

            {/* Name + Username */}
            <div className="flex-1">
              <div className="h-5 w-32 rounded bg-gray-200" />

              <div className="mt-2 h-4 w-24 rounded bg-gray-100" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}