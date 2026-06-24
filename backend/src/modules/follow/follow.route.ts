import { Router } from "express";
import protect from "../../middleware/protect.js";
import {
  getFollowersController,
  getFollowingController,
  getWhoToFollow,
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

router.get(
  "/suggestions",
  protect,
  getWhoToFollow
);

export default router;