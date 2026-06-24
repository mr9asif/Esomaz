 // post.route.ts

import { Router } from "express";
import protect from "../../middleware/protect.js";
import { upload } from "../../middleware/upload.js";
import { createPost, deletePost, getPostById, getPosts, getTrendingPosts, updatePostController } from "./post.controller.js";
 const router = Router();

router.post(
  "/",
  protect,
  upload.fields([
    {
      name: "images",
      maxCount: 5,
    },
    {
      name: "video",
      maxCount: 1,
    },
  ]),
  createPost
);
router.get(
  "/trending",
  getTrendingPosts
);

router.get("/", protect, getPosts);

router.get("/:id", getPostById);

router.delete("/:id", protect, deletePost);
router.patch(
  "/:id",
  protect,
  updatePostController
);



export default router;