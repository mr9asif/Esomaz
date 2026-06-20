import { queryClient } from "@/lib/react_query";
import { useMutation } from "@tanstack/react-query";
import { createReply } from "../components/comment/api/createReply";

export const useCreateReply = () => {

  return useMutation({

    mutationFn: createReply,

    onSuccess: (data) => {
        console.log("reply", data)

      queryClient.invalidateQueries({
        queryKey: ["comments", data.postId],
      });

    },

  });

};