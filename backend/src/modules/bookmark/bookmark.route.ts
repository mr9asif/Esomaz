import { Router } from "express";
import protect from "../../middleware/protect.js";
import { getMyBookmarksController, toggleBookmarkController } from "./bookmark.controller.js";

const router = Router();

router.post(
  "/:postId",
  protect,
  toggleBookmarkController
);

router.get(
  "/me",
  protect,
  getMyBookmarksController
);

export default router;