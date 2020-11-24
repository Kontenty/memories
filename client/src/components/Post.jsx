import React from "react";
import {
  Heading,
  VStack,
  Text,
  Box,
  Flex,
  IconButton,
  ButtonGroup,
} from "@chakra-ui/react";
import {
  AiOutlineHeart,
  AiOutlineLike,
  AiOutlineEdit,
  AiOutlineDelete,
} from "react-icons/ai";
import moment from "moment";

const Post = ({ data }) => {
  return (
    <Box bg="white" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Box borderRadius="lg" overflow="hidden" pos="relative">
        <picture>
          <img src={data.selectedFile} alt="post bg" />
        </picture>
        <Box pos="absolute" top="0" w="100%" px={4} pt={2} color="pink.50">
          <Flex justify="space-between">
            <Text>{data.creator}</Text>
            <Flex align="center">
              <Text mr={1}>{data.likeCount}</Text>
              <AiOutlineHeart />
            </Flex>
          </Flex>
          <Text fontSize="sm">{moment(data.createdAt).fromNow()}</Text>
        </Box>
      </Box>
      <Flex justify="center" pos="relative" h="40px">
        <Box pos="absolute" top="-10px" px={3} bg="white" borderRadius="lg">
          <Heading>{data.title}</Heading>
        </Box>
      </Flex>
      <VStack spacing={3} pb={4}>
        <Text>{data.message}</Text>
        <ButtonGroup isAttached variant="outline">
          <IconButton icon={<AiOutlineLike />} />
          <IconButton icon={<AiOutlineEdit />} />
          <IconButton icon={<AiOutlineDelete />} />
        </ButtonGroup>
      </VStack>
    </Box>
  );
};

export default Post;
