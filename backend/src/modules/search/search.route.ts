import { Router } from "express";
import protect from "../../middleware/protect.js";
import { getPostById, searchController } from "./search.controller.js";

const router = Router();

router.get(
  "/",
  protect,
  searchController
);
router.get("/:id", protect, getPostById);

export default router;