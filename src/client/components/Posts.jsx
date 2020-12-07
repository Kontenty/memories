import { Grid } from "@chakra-ui/react";
import React from "react";
import { useRecoilValue } from "recoil";

import { postsAtom } from "../atoms";

import Post from "./Post";

const Posts = () => {
  const postsData = useRecoilValue(postsAtom);
  return (
    <div>
      <Grid templateColumns="repeat(auto-fit, minmax(300px, 500px))" gap={4}>
        {postsData.map((post) => (
          <Post key={post._id} data={post} />
        ))}
      </Grid>
    </div>
  );
};

export default Posts;
