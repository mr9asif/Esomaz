export const formatTime = (date: string) => {
  const now = new Date();
  const created = new Date(date);

  const diff = now.getTime() - created.getTime();

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;
  const year = day * 365;

  if (diff < minute) {
    return "Just now";
  }

  if (diff < hour) {
    return `${Math.floor(diff / minute)}m`;
  }

  if (diff < day) {
    return `${Math.floor(diff / hour)}h`;
  }

  if (diff < week) {
    return `${Math.floor(diff / day)}d`;
  }

  if (diff < month) {
    return `${Math.floor(diff / week)}w`;
  }

  if (diff < year) {
    return `${Math.floor(diff / month)}mo`;
  }

  return `${Math.floor(diff / year)}y`;
};