import useData from "./useData";

export interface Todo {
  id?: string;
  name: string;
  description: string;
  status: boolean;
  createdAt: string;
}

const useTodo = () => useData<Todo>("/todos");

export default useTodo;
