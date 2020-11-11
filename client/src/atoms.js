import { selector } from "recoil";
import { fetchPosts } from "./api";

export const posts = selector({
  key: "posts",
  get: async () => {
    try {
      const { data } = await fetchPosts();
      return data;
    } catch (error) {
      console.log(error);
    }
  },
});
