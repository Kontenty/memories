import express from "express";
import upload from "../middleware/multer.js";
import { createPost, getPosts } from "../controllers/postsCtrl.js";
import imageResize from "../controllers/imgResizeCtrl.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", upload.single("file"), imageResize, createPost);

export default router;
