import fs from "fs";
import path from "path";
import log from "loglevel";
import mongoose from "mongoose";
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
  if (typeof post.tags === "string") {
    post.tags = post.tags.split(",").map((tag) => tag.trim());
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

export const updatePost = async (req, res) => {
  const _id = req.params.id;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No post with that ID");
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
    new: true,
  });

  return res.json(updatedPost);
};
