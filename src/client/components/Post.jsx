import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  Heading,
  VStack,
  Text,
  Box,
  Flex,
  IconButton,
  ButtonGroup,
  useToast,
} from "@chakra-ui/react";
import {
  AiOutlineHeart,
  AiOutlineLike,
  AiOutlineEdit,
  AiOutlineDelete,
} from "react-icons/ai";
import moment from "moment";

import { postsAtom, currentPostIdAtom } from "../atoms";
import { deletePost } from "../api";

const Post = ({ data }) => {
  const toast = useToast();
  const [posts, setPosts] = useRecoilState(postsAtom);
  const setId = useSetRecoilState(currentPostIdAtom);

  const handleDelete = async () => {
    const id = data._id;
    const deletedIndex = posts.findIndex((post) => id === post._id);
    const newPosts = [...posts];
    newPosts.splice(deletedIndex, 1);
    try {
      await deletePost(id);
      toast({
        title: "Post was removed.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setPosts(newPosts);
    } catch (error) {
      console.log(error.message);
    }
  };

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
          <IconButton
            icon={<AiOutlineEdit />}
            onClick={() => setId(data._id)}
          />
          <IconButton icon={<AiOutlineDelete />} onClick={handleDelete} />
        </ButtonGroup>
      </VStack>
    </Box>
  );
};

export default Post;
