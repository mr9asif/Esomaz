import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest.js";
import { AuthController } from "./auth.controller.js";


import {
    loginValidationSchema,
    registerValidationSchema,
} from "./auth.validation.js";

const router = Router();

router.post(
  "/register",
  validateRequest(
    registerValidationSchema
  ),
  AuthController.register
);



router.post(
  "/login",
  validateRequest(
    loginValidationSchema
  ),

  AuthController.login
);

export default router;