import { Box, Button } from "@mui/material";
import { RxEyeOpen } from "react-icons/rx";
import { getStatusColor } from "../../utils/getStatusColor";

//mock
import { subsTaksData } from "../../mockData/taskData";

import { useBoundStore } from "../../stores";
import CreateTaskForm from "../forms/createTaskForm";
//styles
import css from "./style.module.css";
import TaskDetail from "./TaskDetail";

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
    ChangeTitleModal("Substask");
    ChangeContentModal(<TaskDetail />);
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

        {subsTaksData.map((item) => (
          <tr key={item.id}>
            <td>
              <strong>{item.name}</strong>
            </td>
            <td>
              <div className={css.assignee}>
                <img
                  src={item.assignee.profile}
                  alt={`Photo of ${item.assignee.name}`}
                />
                <strong>{item.assignee.name}</strong>
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
