import { Grid } from "@mui/material";
import TaskDetailContent from "./TaskDetailContent";
import TaskDetailHeader from "./TaskDetailHeader";
import TaskDetailSubstasks from "./TaskDetailSubstasks";
import ChatMessage from "../chatSeccion/chat";

const TaskDetail = () => {
  return (
    <Grid
      container
      sx={{
        padding: "50px 30px",
        background: "#FFFF",
        margin: 0,
        overflowY: "auto",
        height: "100vh",
      }}
      spacing={3}
    >
      <Grid item xs={12} md={7} sx={{ color: "#1D1F24" }}>
        <TaskDetailHeader taskId="86a28kta" taskTitle="Task Title" />
        <TaskDetailContent />
        <TaskDetailSubstasks />
      </Grid>
      <Grid item xs={12} md={5}>
        <ChatMessage />
      </Grid>
    </Grid>
  );
};
export default TaskDetail;
