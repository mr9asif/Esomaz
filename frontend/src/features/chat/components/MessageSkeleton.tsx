const MessageSkeleton = () => {
  return (
    <div className="space-y-4 animate-pulse">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className={`flex ${
            i % 2 === 0
              ? "justify-start"
              : "justify-end"
          }`}
        >
          <div className="h-12 w-52 rounded-2xl bg-gray-200" />
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;