import axios from "@/lib/axios";

export const getSuggestions =
  async () => {
    const { data } = await axios.get(
      "/follows/suggestions"
    );

    return data.data;
  };