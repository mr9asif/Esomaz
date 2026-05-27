import { Router } from "express";

import protect from "../../middleware/protect.js";
import { getMe } from "./user.controller.js";

const router =Router();

router.get('/me', protect, getMe)


export default router;