import fs from "fs";
import path from "path";
import log from "loglevel";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const createPost = async (req, res) => {
  const { image, body: post } = req;
  if (req.err) {
    res.status(409).json({ error: req.err });
    return;
  }
  if (image) {
    post.selectedFile = `http://localhost:5000/image/${image}`;
  }

  const newPost = new PostMessage(post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  const {
    body: { id },
  } = req;

  try {
    const post = await PostMessage.findById(id);
    const { selectedFile } = post;
    const image = selectedFile.match(/\/[a-z0-9_-]*.(jpg|png)$/g);
    await PostMessage.deleteOne(post);
    try {
      fs.unlinkSync(path.join(process.cwd(), "/uploads", image[0]));
    } catch (error) {
      log.error(error);
    }
    res.status(200).json({ message: " post deleted", post });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
