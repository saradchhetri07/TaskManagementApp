import express from "express";
import authRouter from "./auth.routes";
import todoRouter from "./todo.routes";
import { genericErrorHandler } from "../middlewares/errorHandler.middlewares";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/todos", todoRouter);

export default router;
