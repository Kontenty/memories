import { atom, selector } from "recoil";
import { fetchPosts } from "./api";

export const posts = atom({
  key: "posts",
  default: [],
});

export const getPosts = selector({
  key: "get-posts",
  get: async () => {
    try {
      const { data } = await fetchPosts();
      return data;
    } catch (error) {
      console.log(error, error.response);
      throw error;
    }
  },
});
