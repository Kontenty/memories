import express from "express";
import imageRouter from "./image.route.js";
import postRouter from "./post.route.js";

const router = express.Router();

router.use("/image", imageRouter);
router.use("/api/posts", postRouter);

export default router;
