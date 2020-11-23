import express from "express";
import getImg from "../controllers/imageCtrl.js";

const router = express.Router();

router.get("/:image", getImg);

export default router;
