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
  const { file, body: post } = req;
  if (req.err) {
    res.status(409).json({ error: req.err });
    return;
  }
  if (file) {
    post.selectedFile = `http://localhost:5000/api/image/${file.filename}`;
  }

  const newPost = new PostMessage(post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
