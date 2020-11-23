import express from "express";
import upload from "../middleware/multer.js";
import { createPost, getPosts } from "../controllers/postsCtrl.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", upload.single("file"), createPost);

export default router;
