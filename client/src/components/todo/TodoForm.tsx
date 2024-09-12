import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ApiClient from "../../services/ApiClient";
import { token } from "../../constant";
import { toast } from "react-toastify";
import { Todo } from "../../hooks/useTodo";
import { formatDate } from "../../utils/formatDate";

const todoSchema = z.object({
  name: z.string().min(1, { message: "name is required" }),
  descriptions: z
    .string()
    .min(4, { message: "Description must be at least 6 characters long" }),
});

interface Props {
  addTodo: (todo: Todo) => void;
}
const TodoForm = ({ addTodo }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(todoSchema),
  });

  const onSubmit = async (data: FieldValues) => {
    ApiClient.post(
      "/todos",
      {
        name: data.name,
        description: data.descriptions,
      },
      {
        headers: {
          Authorization: `Bearer ${token()}`, // Set the Bearer token here
          "Content-Type": "application/json", // Optional, ensures correct content type
        },
      }
    )
      .then((res) => {
        toast.success(res.data.message);
        const newTodo: Todo = {
          name: data.name,
          description: data.descriptions,
          status: false,
          createdAt: formatDate(new Date().toISOString()),
        };
        addTodo(newTodo);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ margin: "2rem" }}>
      <div className="mb-3">
        <input
          {...register("name")}
          className="form-control"
          id="name"
          type="text"
          placeholder="task Name"
        />
        {errors.name && (
          <p className="text-danger">{errors.name.message as string}</p>
        )}
      </div>

      <div className="mb-3">
        <input
          {...register("descriptions")}
          className="form-control"
          id="descriptions"
          type="text"
          placeholder="Description of task"
        />
        {errors.descriptions && (
          <p className="text-danger">{errors.descriptions.message as string}</p>
        )}
      </div>

      <button type="submit" className="btn btn-dark">
        Create task
      </button>
    </form>
  );
};

export default TodoForm;
