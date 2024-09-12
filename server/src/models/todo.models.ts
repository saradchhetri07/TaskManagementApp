import { Todo } from "../interfaces/todo.interface";
import { BaseModel } from "./base.models";

export class TodoModel extends BaseModel {
  static async createTodo(todo: Todo, id: string) {
    try {
      const todoToCreate = {
        name: todo.name,
        description: todo.description,
        created_by: parseInt(id, 10),
      };

      await this.queryBuilder().insert(todoToCreate).table("todos");

      return;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getTodos(userId: string) {
    try {
      const todos = await this.queryBuilder()
        .table("todos")
        .select(
          "todos.id",
          "todos.name",
          "todos.description",
          "todos.status",
          "todos.createdAt"
        )
        .where({ "todos.created_by": userId })
        .orderBy("todos.id", "asc");

      return todos;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  static async deleteTodo(todoId: string, userId: string) {
    try {
      const deletedTodo = await this.queryBuilder()
        .table("todos")
        .delete()
        .where({ id: todoId, created_by: userId });
      return deletedTodo;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async updateTodo(todoId: string, status: boolean, userId: string) {
    try {
      const updatedTodo = await this.queryBuilder()
        .table("todos")
        .update({ status })
        .where({ id: todoId, created_by: userId });
      return updatedTodo;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
