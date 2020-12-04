import { atom, selector } from "recoil";
import { fetchPosts } from "./api";

export const getPosts = selector({
  key: "getPosts",
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

export const postsAtom = atom({
  key: "postsAtom",
  default: getPosts,
});

export const currentPostIdAtom = atom({
  key: "currentId",
  default: null,
});
