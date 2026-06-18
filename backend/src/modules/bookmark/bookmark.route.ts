import { Router } from "express";
import protect from "../../middleware/protect.js";
import { toggleBookmarkController } from "./bookmark.controller.js";

const router = Router();

router.post(
  "/:postId",
  protect,
  toggleBookmarkController
);

export default router;