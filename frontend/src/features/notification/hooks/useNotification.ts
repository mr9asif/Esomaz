import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "../service/notificaton.service";

export const useNotifications = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
  });
};