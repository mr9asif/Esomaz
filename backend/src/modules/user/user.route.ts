import { Router } from "express";

import protect from "../../middleware/protect.js";
import { upload } from "../../middleware/upload.js";
import { getMe, getUserProfile, updateAvatar, updateCoverPhoto } from "./user.controller.js";

const router =Router();

router.get('/me', protect, getMe)
router.get(
  "/:username",
 getUserProfile
);
router.get("/test", (req, res) => {
  res.send("working");
});
router.patch(
  "/avatar",
  protect,
  upload.single("avatar"),
  updateAvatar
);
router.patch(
  "/coverPhoto",
  protect,
  upload.single("coverPhoto"),
  updateCoverPhoto
);

export default router;