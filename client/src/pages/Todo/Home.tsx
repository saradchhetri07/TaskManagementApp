import TodoForm from "../../components/todo/TodoForm";
import { toast, ToastContainer } from "react-toastify";
import useTodo, { Todo } from "../../hooks/useTodo";
import TaskTable from "../../components/todo/TaskTable";
import FilterDropDown from "../../components/todo/FilterDropDown";
import { useState } from "react";
import ApiClient from "../../services/ApiClient";
import { token } from "../../constant";
import LogOutButton from "../../components/todo/LogOutButton";

const Home = () => {
  const { data, setData } = useTodo();
  const [selectedOption, setOption] = useState<string>("All");
  const handleDelete = (id: string) => {
    setData(data.filter((data) => data.id !== id));
    data.map((data) => {
      if (data.id === id) {
        try {
          ApiClient.delete(`/todos/${id}`, {
            headers: {
              Authorization: `Bearer ${token()}`,
            },
          })
            .then((res) => {
              toast.success(res.data.message);
            })
            .catch((error) => toast.error(error.message || error));
        } catch (error) {
          toast.error((error as Error).message);
        }
      }
    });
  };

  const handleStatusChange = (id: string) => {
    setData(
      data.map((data) =>
        data.id === id ? { ...data, status: !data.status } : data
      )
    );
    data.map((data) => {
      if (data.id === id) {
        try {
          ApiClient.put(
            `/todos/${id}`,
            {
              status: !data.status,
            },
            {
              headers: {
                Authorization: `Bearer ${token()}`,
              },
            }
          )
            .then((res) => {
              toast.success(res.data.message);
            })
            .catch((error) => toast.error(error.message || error));
        } catch (error) {
          toast.error((error as Error).message);
        }
      }
    });
  };

  const addTask = (todo: Todo) => {
    setData([...data, todo]);
  };

  return (
    <>
      <LogOutButton />
      <div
        className="main_container"
        style={{ height: "100vh", width: "80vw" }}
      >
        <TodoForm addTodo={addTask} />
        <FilterDropDown
          selectedOption={selectedOption}
          handleChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
            setOption(event.target.value)
          }
        />
        <TaskTable
          data={data}
          handleDelete={handleDelete}
          handleStatus={handleStatusChange}
          selectedOption={selectedOption}
        />
        <ToastContainer />
      </div>
    </>
  );
};

export default Home;
