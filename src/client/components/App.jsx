import React, { Suspense } from "react";
import { Box, Flex, Grid, Heading, Image, ScaleFade } from "@chakra-ui/react";
import { useRecoilCallback } from "recoil";

import memoImg from "../assets/images/memories.jpg";
import Form from "./Form";
import Posts from "./Posts";

function DebugButton() {
  const onClick = useRecoilCallback(
    ({ snapshot }) => async () => {
      console.debug("Atom values:");
      for (const node of snapshot.getNodes_UNSTABLE()) {
        const value = await snapshot.getPromise(node);
        console.debug(node.key, value);
      }
    },
    []
  );

  return <button onClick={onClick}>Dump State</button>;
}

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
      <Box as="main" maxW="1200px" px="40px" mx="auto" mt="50px">
        <ScaleFade in={true}>
          <Grid templateColumns={["1fr", null, "5fr 3fr"]} gap={6}>
            <Suspense fallback={<h3>Posts are loading ...</h3>}>
              <Posts />
              <Form />
            </Suspense>
          </Grid>
        </ScaleFade>
      </Box>
      <DebugButton />
    </>
  );
};

export default App;
