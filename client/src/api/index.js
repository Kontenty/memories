import axios from "axios";

const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api/posts"
    : "/api/posts";

export const fetchPosts = async () => await axios.get(url);
export const createPost = async (newPost) => await axios.post(url, newPost);
