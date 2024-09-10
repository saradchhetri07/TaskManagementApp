import express from "express";
import { login, signUp } from "../controllers/auth.controllers";
import { validateReqBody } from "../middlewares/validator.middlewares";
import {
  loginUserBodySchema,
  createUserBodySchema,
} from "../schema/user.schema";
import { requestWrapper } from "../utils/requestWrapper.utils";
import { genericErrorHandler } from "../middlewares/errorHandler.middlewares";

const router = express.Router();

router.post("/signup", validateReqBody(createUserBodySchema), signUp);
router.post(
  "/login",
  validateReqBody(loginUserBodySchema),
  requestWrapper(login)
);

export default router;
