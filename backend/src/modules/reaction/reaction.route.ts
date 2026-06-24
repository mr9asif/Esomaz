import { Router } from "express";
import protect from "../../middleware/protect.js";
import { toggleReactionController } from "./reaction.controller.js";

const router = Router();

router.post(
    "/:postId",
    protect,
    toggleReactionController
);


export default router;