export const formatTime = (date: string) => {
  const now = new Date();
  const created = new Date(date);

  const diff = now.getTime() - created.getTime();

  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;

  if (diff < hour) {
    return `${Math.floor(diff / minute)}m`;
  }

  if (diff < day) {
    return `${Math.floor(diff / hour)}h`;
  }

  if (diff < day * 7) {
    return `${Math.floor(diff / day)}d`;
  }

  return created.toLocaleDateString();
};