import { Router } from "express";
import { getMeService } from "./user.service.js";

const router =Router();

router.get('/me', getMeService)


export default router;