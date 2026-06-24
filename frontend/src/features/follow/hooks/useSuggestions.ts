import { useQuery } from "@tanstack/react-query";
import { getSuggestions } from "../api/getSuggesitons";

export const useSuggestions = () => {
  return useQuery({
    queryKey: ["suggestions"],
    queryFn: getSuggestions,
  });
};