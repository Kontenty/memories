import { Heading, VStack, Text } from "@chakra-ui/react";
import React from "react";

const Post = ({ data }) => {
  return (
    <div>
      <VStack spacing={3}>
        <Heading>{data.title}</Heading>
        <Text>{data.message}</Text>
        <img src={data.selectedFile} alt="post" style={{ width: "300px" }} />
      </VStack>
    </div>
  );
};

export default Post;
