import { Button, Table } from "react-bootstrap";
import { Todo } from "../../hooks/useTodo";
import { formatDate } from "../../utils/formatDate";

interface Props {
  data: Todo[];
  handleDelete: (id: string) => void;
  handleStatus: (id: string) => void;
  selectedOption: string;
}
const TaskTable = ({
  data,
  handleDelete,
  handleStatus,
  selectedOption,
}: Props) => {
  data =
    selectedOption === "completed"
      ? data.filter((data) => data.status)
      : selectedOption === "uncompleted"
      ? data.filter((data) => !data.status)
      : data;
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Status</th>
          <th>CreatedAt</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((data) => (
          <tr key={data.createdAt}>
            <td>{data.name}</td>
            <td>{data.description}</td>
            <td>
              <input
                type="checkbox"
                checked={data.status}
                onChange={() => handleStatus(data.id!)}
              />
            </td>
            <td>{formatDate(data.createdAt)}</td>
            <td>
              <Button variant="danger" onClick={() => handleDelete(data.id!)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TaskTable;
