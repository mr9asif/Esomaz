import { Router } from "express";
import protect from "../../middleware/protect.js";
import {
    getFollowersController,
    getFollowingController,
    toggleFollowController,
} from "./follow.controller.js";

const router = Router();

router.post(
  "/:userId",
  protect,
  toggleFollowController
);

router.get(
  "/followers/:userId",
  getFollowersController
);

router.get(
  "/following/:userId",
  getFollowingController
);

export default router;