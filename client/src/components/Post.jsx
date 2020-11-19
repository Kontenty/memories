import { Heading, VStack, Text, Box } from "@chakra-ui/react";
import React from "react";

const Post = ({ data }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={3}>
      <VStack spacing={3}>
        <Heading>{data.title}</Heading>
        <Text>{data.message}</Text>
        <img src={data.selectedFile} alt="post" />
      </VStack>
    </Box>
  );
};

export default Post;
