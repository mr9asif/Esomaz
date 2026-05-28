 // post.route.ts

import { Router } from "express";
import protect from "../../middleware/protect.js";
import { createPost, deletePost, getPostById, getPosts } from "./post.controller.js";

 const router = Router();
router.post("/", protect, createPost);

router.get("/", getPosts);

router.get("/:id", getPostById);

router.delete("/:id", protect, deletePost);


// adfksdlfsdkfl
export default router;