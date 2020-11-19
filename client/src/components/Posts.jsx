import { StackDivider, VStack } from "@chakra-ui/react";
import React from "react";
import { useRecoilValue } from "recoil";

import { postsAtom } from "../atoms";

import Post from "./Post";

const Posts = () => {
  const postsData = useRecoilValue(postsAtom);
  console.log(postsData);
  return (
    <div>
      <VStack divider={<StackDivider borderColor="gray.200" />} spacing={5}>
        {postsData.map((post) => (
          <Post key={post._id} data={post} />
        ))}
      </VStack>
    </div>
  );
};

export default Posts;
