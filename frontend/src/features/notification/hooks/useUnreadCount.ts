import { useQuery } from "@tanstack/react-query";
import { getUnreadCount } from "../service/notificaton.service";

export const useUnreadCount = () => {
  return useQuery({
    queryKey: ["notification-count"],
    queryFn: getUnreadCount,
  });
};