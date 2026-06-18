import { Router } from "express";
import protect from "../../middleware/protect.js";
import { searchController } from "./search.controller.js";

const router = Router();

router.get(
  "/",
  protect,
  searchController
);

export default router;