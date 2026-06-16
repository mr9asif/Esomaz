 // post.route.ts

import { Router } from "express";
import protect from "../../middleware/protect.js";
import { upload } from "../../middleware/upload.js";
import { createPost, deletePost, getPostById, getPosts } from "./post.controller.js";
 const router = Router();

router.post(
  "/",
  protect,
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
    {
      name: "video",
      maxCount: 1,
    },
  ]),
  createPost
);
router.get("/", getPosts);

router.get("/:id", getPostById);

router.delete("/:id", protect, deletePost);


export default router;