import React from "react";
import { Box, Flex, Grid, Heading, Image, ScaleFade } from "@chakra-ui/core";

import memoImg from "../assets/images/memories.jpg";
import Form from "./Form";
import Posts from "./Posts";

const App = () => {
  return (
    <>
      <Flex
        as="nav"
        h="60px"
        bg="pink.700"
        color="white"
        px={["20px", "20vw"]}
        alignItems="center"
        justify="space-around"
      >
        <Heading>Memories</Heading>
        <Box w="60px">
          <Image src={memoImg} alt="memories" />
        </Box>
      </Flex>
      <Box maxW="1200px" px="40px" mx="auto">
        <ScaleFade in={true}>
          <h1>App</h1>
          <Grid templateColumns={["1fr", null, "7fr 4fr"]}>
            <Posts />
            <Form />
          </Grid>
        </ScaleFade>
      </Box>
    </>
  );
};

export default App;
