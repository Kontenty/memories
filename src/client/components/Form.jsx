import React, { useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import { Box, Button, Heading, Input, Stack } from "@chakra-ui/react";
import { AiOutlineUpload } from "react-icons/ai";
import styled from "@emotion/styled";

import { createPost } from "../api";
import { postsAtom } from "../atoms";

const FileInput = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;

const initialPostData = {
  creator: "",
  title: "",
  message: "",
  tags: "",
  file: "",
};
const formInputs = [
  { name: "creator", placeholder: "Creator" },
  { name: "title", placeholder: "Post title" },
  { name: "message", placeholder: "Message" },
  { name: "tags", placeholder: "Tags" },
];

const Form = () => {
  const [postData, setPostData] = useState(initialPostData);
  const setPosts = useSetRecoilState(postsAtom);
  const fileInputRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("submit", postData);
    const formData = new FormData();
    for (const key in postData) {
      formData.append(key, postData[key]);
    }

    try {
      const response = await createPost(formData);
      setPosts((oldPosts) => {
        const newPosts = oldPosts.concat(response.data);
        // handleClear();
        return newPosts;
      });
    } catch (error) {
      throw error;
    }
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    setPostData({ ...postData, [name]: value });
  };

  const handleFileInput = (ev) => {
    setPostData({ ...postData, file: ev.target.files[0] });
  };

  const handleClear = () => {
    setPostData(initialPostData);
  };

  return (
    <Box bg="white" p={4} borderRadius="lg">
      <Heading as="h5" size="lg" mb={3}>
        Creating a Memory
      </Heading>
      <form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
        data-lpignore="true"
      >
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
            <FileInput
              type="file"
              name="file"
              id="file-input"
              onChange={handleFileInput}
              ref={fileInputRef}
            />
            <Button
              leftIcon={<AiOutlineUpload />}
              variant="outline"
              mr={2}
              onClick={() => fileInputRef.current.click()}
            >
              Choose an image
            </Button>
            <span>{postData?.file?.name || ""}</span>
          </Box>
          <Button colorScheme="blue" type="submit">
            Submit
          </Button>
          <Button colorScheme="red" size="sm" onClick={handleClear}>
            Reset
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Form;
