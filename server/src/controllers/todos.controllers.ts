import { NextFunction, Response } from "express";
import { Request } from "../interfaces/auth.interface";
import { StatusCodes as HTTPStatusCodes } from "http-status-codes";
import { BadRequestError } from "../error/BadRequestError";
import * as TodoService from "../services/todo.services";

export const createTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;

    const user = req.user;

    const createdTodo = await TodoService.createTodos(body, user!.id);

    return res
      .status(HTTPStatusCodes.CREATED)
      .json({ message: "todos created", data: createdTodo });
  } catch (error) {
    if (error instanceof Error) {
      next(new BadRequestError(error.message));
    }
  }
};

export const getTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user!.id;
    const todos = await TodoService.getTodos(userId);

    return res.status(HTTPStatusCodes.OK).json({ data: todos });
  } catch (error) {
    if (error instanceof Error) {
      next(new BadRequestError(error.message));
    }
  }
};

export const deleteTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { todoId } = req.params;
    const user = req.user;
    const deletedTodo = await TodoService.deleteTodo(todoId, user!.id);
    return res.status(HTTPStatusCodes.OK).json({ message: "deleted" });
  } catch (error) {
    if (error instanceof Error) {
      next(new BadRequestError(error.message));
    }
  }
};

export const updateTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { todoId } = req.params;
    const { status } = req.body;
    const userId = req.user!.id;
    await TodoService.updateTodo(todoId, status, userId);
    return res.status(HTTPStatusCodes.OK).json({ message: "updated" });
  } catch (error) {
    if (error instanceof Error) {
      next(new BadRequestError(error.message));
    }
  }
};
