import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createPost } from "../api/createPost";

export const useCreatePost = () => {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: createPost,

        onSuccess: () => {
            toast.success("Post created Successfully!")

            queryClient.invalidateQueries({

                queryKey: ["posts"],

            });

        },

    });

};