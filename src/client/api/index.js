import axios from "axios";

const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api/posts"
    : "/api/posts";

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) =>
  axios.post(url, newPost, {
    headers: {
      "content-type": "multipart/form-data",
    },
  });
export const updatePost = (id, post) =>
  axios.patch(`${url}/${id}`, post, {
    headers: {
      "content-type": "multipart/form-data",
    },
  });

export const deletePost = (id) => axios.delete(url, { data: { id } });
