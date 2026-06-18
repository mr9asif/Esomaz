import { Router } from "express";
import protect from "../../middleware/protect.js";
import {
    createCommentController,
    deleteCommentController,
    getCommentsController,
    replyCommentController,
    updateCommentController,
} from "./comment.controller.js";

const router = Router();

router.post(
  "/",
  protect,
  createCommentController
);

router.get(
  "/:postId",
  getCommentsController
);

router.patch(
  "/:id",
  protect,
  updateCommentController
);

router.delete(
  "/:id",
  protect,
  deleteCommentController
);

router.post(
  "/reply",
  protect,
  replyCommentController
);

export default router;