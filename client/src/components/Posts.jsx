import React from "react";
import { useRecoilValue } from "recoil";

import { getPosts } from "../atoms";

import Post from "./Post";

const Posts = () => {
  const postsData = useRecoilValue(getPosts);
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
