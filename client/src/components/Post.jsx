import React from "react";
import { useSetRecoilValue } from "recoil";

import { posts } from "../atoms";

const Post = () => {
  const postsData = useSetRecoilValue(posts);
  return (
    <div>
      <h3>Post</h3>
    </div>
  );
};

export default Post;
