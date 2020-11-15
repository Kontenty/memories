import React from "react";
import { useRecoilValue } from "recoil";

import { posts } from "../atoms";

const Post = () => {
  const postsData = useRecoilValue(posts);
  console.log(postsData);
  return (
    <div>
      <h3>Post</h3>
    </div>
  );
};

export default Post;
