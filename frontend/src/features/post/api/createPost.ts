import axios from "@/lib/axios";

export const createPost = async (formData: FormData) => {

    const { data } = await axios.post(
        "/post",
        formData,
        {
            headers:{
                "Content-Type":"multipart/form-data"
            }
        }
    );

    return data.data;

};