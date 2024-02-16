import { Box, Button } from "@mui/material";
import { RxEyeOpen } from "react-icons/rx";
import { getStatusColor } from "../../utils/getStatusColor";
import TaskDetail from "./TaskDetail";
import { useBoundStore } from "../../stores";
import CreateTaskForm from "../forms/createTaskForm";
//mock
import { subsTasksData } from "../../mockData/taskData";
//styles
import css from "./style.module.css";

const tableHeadData = [
  { id: 1, label: "Name" },
  { id: 2, label: "Assignee" },
  { id: 3, label: "Status" },
  { id: 4, label: "Date" },
  { id: 5, label: "Action" },
];

const TaskDetailSubstasks = () => {
  const { ChangeStateModal, ChangeTitleModal, ChangeContentModal } =
    useBoundStore((state) => state);

  const handleAddTask = () => {
    ChangeStateModal(true);
    ChangeTitleModal("Add Task");
    ChangeContentModal(<CreateTaskForm />);
  };

  const handleViewSubstask = () => {
    ChangeStateModal(true);
    ChangeTitleModal("Substask Detail");
    ChangeContentModal(<TaskDetail task={subsTasksData[0]} />);
  };

  return (
    <Box sx={{ padding: "50px 0" }}>
      <p className={css.title}>Subtasks</p>
      <table className={css.table}>
        <tr>
          {tableHeadData.map((item) => (
            <th key={item.id} className={css.headText}>
              {item.label}
            </th>
          ))}
        </tr>

        {subsTasksData &&
          subsTasksData.map((item) => (
            <tr key={item.id}>
              <td>
                <strong>{item.task}</strong>
              </td>
              <td>
                <div className={css.assignee}>
                  <img
                    src={item.assignees.profilePhoto}
                    alt={`Photo of ${item.assignees.name}`}
                  />
                  <strong>{item.assignees.name}</strong>
                </div>
              </td>
              <td>
                <div
                  style={{
                    backgroundColor: getStatusColor(item.status).bg,
                    color: getStatusColor(item.status).color,
                    padding: "5px 10px",
                    borderRadius: "5px",
                    textAlign: "center",
                  }}
                >
                  {item.status}
                </div>
              </td>
              <td>{item.date}</td>
              <td className={css.icon}>
                <Button color="inherit" onClick={handleViewSubstask}>
                  <RxEyeOpen size={25} />
                </Button>
              </td>
            </tr>
          ))}

        <tr className={css.addSubstask}>
          <Button color="inherit" onClick={handleAddTask}>
            + Add substask
          </Button>
        </tr>
      </table>
    </Box>
  );
};
export default TaskDetailSubstasks;
