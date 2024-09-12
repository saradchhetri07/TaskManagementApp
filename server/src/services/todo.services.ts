import { NotFoundError } from "../error/NotFoundError";
import { Todo } from "../interfaces/todo.interface";
import * as TodoModel from "../models/todo.models";

export const createTodos = (todo: Todo, id: string) => {
  const createdTodo = TodoModel.TodoModel.createTodo(todo, id);
  if (!createdTodo) {
    throw new Error("todo creation failed");
  }
  return createdTodo;
};

export const getTodos = (userId: string) => {
  const todos = TodoModel.TodoModel.getTodos(userId);
  if (!todos) {
    throw new NotFoundError("no todos found");
  }
  return todos;
};

export const deleteTodo = (todoId: string, userId: string) => {
  const deletedTodo = TodoModel.TodoModel.deleteTodo(todoId, userId);
  if (!deletedTodo) {
    throw new Error("todo deletion failed");
  }
  return deletedTodo;
};

export const updateTodo = (todoId: string, status: boolean, userId: string) => {
  const updatedTodo = TodoModel.TodoModel.updateTodo(todoId, status, userId);
  if (!updatedTodo) {
    throw new Error("todo update failed");
  }
  return updatedTodo;
};
