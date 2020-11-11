import React from "react";
import { Box, Flex, Heading, Image, theme } from "@chakra-ui/core";

import memoImg from "../assets/images/memories.jpg";

const App = () => {
  console.log(theme);
  return (
    <>
      <Flex
        as="nav"
        h="60px"
        bg="pink.700"
        color="white"
        px={["20px", "20vw"]}
        alignItems="center"
      >
        <Heading>Memories</Heading>
        <Box w="60px">
          <Image src={memoImg} alt="memories" />
        </Box>
      </Flex>
      <Box maxW="1200px" px="40px" mx="auto">
        <h1>App</h1>
      </Box>
    </>
  );
};

export default App;
