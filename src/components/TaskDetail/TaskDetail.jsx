import { Grid } from "@mui/material";
import TaskDetailContent from "./TaskDetailContent";
import TaskDetailHeader from "./TaskDetailHeader";
import TaskDetailSubstasks from "./TaskDetailSubstasks";
import ChatMessage from "../chatSeccion/chat";

const TaskDetail = ({ task }) => {
  const { id, task: taskTitle } = task || {};

  return (
    <Grid
      container
      sx={{
        padding: "0 10px",
        background: "#FFFF",
        margin: 0,
        overflowY: "auto",
        height: "100vh",
        width: "100%",
        "& > .MuiGrid-item": {
          padding: "20px 5px",
        },
      }}
      spacing={3}
    >
      <Grid item xs={12} md={7} sx={{ color: "#1D1F24" }}>
        <TaskDetailHeader taskId={id} taskTitle={taskTitle} />
        <TaskDetailContent task={task} />
        <TaskDetailSubstasks />
      </Grid>
      <Grid item xs={12} md={5}>
        <ChatMessage />
      </Grid>
    </Grid>
  );
};
export default TaskDetail;
