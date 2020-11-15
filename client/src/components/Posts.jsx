import React from "react";
import { useRecoilValue } from "recoil";

import { posts } from "../atoms";

import Post from "./Post";

const Posts = () => {
  const postsData = useRecoilValue(posts);
  console.log(postsData);
  return (
    <div>
      <Post />
      <Post />
      <Post />
    </div>
  );
};

export default Posts;
