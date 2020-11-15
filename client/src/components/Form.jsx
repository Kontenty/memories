import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { Box, Button, Heading, Input, Stack } from "@chakra-ui/react";
import FileBase64 from "react-file-base64";

import { createPost } from "../api";
import { posts } from "../atoms";

const initialPostData = {
  creator: "",
  title: "",
  message: "",
  tags: "",
  selectedFile: "",
};
const formInputs = [
  { name: "creator", placeholder: "Creator" },
  { name: "title", placeholder: "Post title" },
  { name: "message", placeholder: "Message" },
  { name: "tags", placeholder: "Tags" },
];

const Form = () => {
  const [postData, setPostData] = useState(initialPostData);
  const setPosts = useSetRecoilState(posts);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("submit", postData);
    try {
      const response = await createPost(postData);
      console.log(response, response.data);
      setPosts((oldPosts) => [...oldPosts, response.data]);
    } catch (error) {
      throw error;
    }
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    setPostData({ ...postData, [name]: value });
  };

  const handleClear = () => {
    setPostData(initialPostData);
  };

  return (
    <div>
      <Heading as="h5" size="lg" mb={3}>
        Creating a Memory
      </Heading>
      <form noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {formInputs.map((input) => (
            <Input
              key={`memo-input-${input.name}`}
              {...input}
              value={postData[input.name]}
              onChange={handleInput}
            />
          ))}
          <Box>
            <FileBase64
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setPostData({ ...postData, selectedFile: base64 })
              }
            />
          </Box>
          <Button colorScheme="blue" type="submit">
            Submit
          </Button>
          <Button colorScheme="red" size="sm" onClick={handleClear}>
            Reset
          </Button>
        </Stack>
      </form>
    </div>
  );
};

export default Form;
