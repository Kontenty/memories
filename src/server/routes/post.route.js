import express from "express";
import upload from "../middleware/multer.js";
import {
  createPost,
  deletePost,
  getPosts,
  likePost,
  updatePost,
} from "../controllers/postsCtrl.js";
import imageResize from "../middleware/imageResize.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", upload.single("file"), imageResize, createPost);
router.delete("/", deletePost);
router.patch("/:id", upload.single("file"), imageResize, updatePost);
router.patch("/:id/likePost", upload.single("file"), likePost);

export default router;
