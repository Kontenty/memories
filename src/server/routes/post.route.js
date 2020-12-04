import express from "express";
import upload from "../middleware/multer.js";
import {
  createPost,
  deletePost,
  getPosts,
  updatePost,
} from "../controllers/postsCtrl.js";
import imageResize from "../controllers/imgResizeCtrl.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", upload.single("file"), imageResize, createPost);
router.delete("/", deletePost);
router.patch("/:id", upload.single("file"), imageResize, updatePost);

export default router;
