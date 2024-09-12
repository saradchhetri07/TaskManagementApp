import express from "express";
import {
  createTodo,
  getTodos,
  deleteTodo,
  updateTodo,
} from "../controllers/todos.controllers";
import { validateReqBody } from "../middlewares/validator.middlewares";
import { createTodoBodySchema } from "../schema/todo.schema";
import { authenticate } from "../middlewares/auth.middlewares";

const router = express.Router();

router.use(authenticate);

router.post("/", validateReqBody(createTodoBodySchema), createTodo);
router.get("/", getTodos);
router.delete("/:todoId", deleteTodo);
router.put("/:todoId", updateTodo);

export default router;
