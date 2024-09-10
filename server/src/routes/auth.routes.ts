import express from "express";
import { login } from "../controllers/auth.controllers";
import { validateReqBody } from "../middlewares/validator.middlewares";

const router = express();

router.post("/login", login);

export default router;
