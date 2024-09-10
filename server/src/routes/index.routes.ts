import express from "express";
import authRouter from "./auth.routes";
import { genericErrorHandler } from "../middlewares/errorHandler.middlewares";

const router = express.Router();

router.use("/auth", authRouter);

export default router;
