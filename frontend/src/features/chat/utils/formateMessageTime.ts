export const formatMessageTime = (
  date: string
) => {
  const messageDate = new Date(date);
  const now = new Date();

  const isToday =
    messageDate.toDateString() ===
    now.toDateString();

  if (isToday) {
    return messageDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);

  const isYesterday =
    messageDate.toDateString() ===
    yesterday.toDateString();

  if (isYesterday) {
    return `Yesterday, ${messageDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  }

  return messageDate.toLocaleDateString([], {
    month: "short",
    day: "numeric",
    year:
      messageDate.getFullYear() !==
      now.getFullYear()
        ? "numeric"
        : undefined,
  }) +
    ", " +
    messageDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
};