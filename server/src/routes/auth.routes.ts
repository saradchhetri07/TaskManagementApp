import express from "express";
import { login } from "../controllers/auth.controllers";
import { validateReqBody } from "../middlewares/validator.middlewares";
import {
  loginUserBodySchema,
  createUserBodySchema,
} from "../schema/user.schema";

const router = express();

router.post("/signUp", validateReqBody(createUserBodySchema), login);
router.post("/login", validateReqBody(loginUserBodySchema), login);

export default router;
