const NotificationSkeleton = () => {
  return (
    <div className="animate-pulse">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-3 border-b bg-white px-4 py-3"
        >
          {/* Notification Icon */}
          <div className="h-5 w-5 rounded-full bg-gray-200 flex-shrink-0" />

          {/* Avatar */}
          <div className="h-12 w-12 rounded-full bg-gray-200 flex-shrink-0" />

          {/* Content */}
          <div className="min-w-0 flex-1">
            <div className="h-3 w-40 rounded bg-gray-200" />

            <div className="mt-2 h-2.5 w-12 rounded bg-gray-200" />
          </div>

          {/* Unread Dot */}
          <div className="h-3 w-3 rounded-full bg-gray-200 flex-shrink-0" />
        </div>
      ))}
    </div>
  );
};

export default NotificationSkeleton;