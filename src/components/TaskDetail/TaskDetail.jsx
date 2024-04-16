import { Grid, useMediaQuery } from "@mui/material";
import TaskDetailContent from "./TaskDetailContent";
import TaskDetailHeader from "./TaskDetailHeader";
import TaskDetailSubstasks from "./TaskDetailSubstasks";
import ChatMessage from "../chatSeccion/chat";

const TaskDetail = ({ task }) => {
  const { id, data } = task || {};
  const name = data[0].name;
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  console.log("IDDDD: ", id);
  return (
    <Grid
      container
      sx={{
        background: "#FFFF",
        margin: 0,
        height: "100vh",
        width: "100%",
        "& > .MuiGrid-item": {
          padding: "0px",
        },
        "& > .MuiGrid-item:nth-of-type(1)": {
          padding: `10px  ${isMobile ? "10px" : "30px"}`,
        },
      }}
      spacing={4}
    >
      <Grid
        item
        xs={12}
        md={7}
        sx={{
          color: "#1D1F24",
          height: "100%",
          overflowY: isMobile ? "none" : "scroll",
        }}
      >
        <TaskDetailHeader taskId={id} taskTitle={name} />
        <TaskDetailContent task={task} />
        <TaskDetailSubstasks taskId={id} />
      </Grid>
      <Grid item xs={12} md={5}>
        <ChatMessage />
      </Grid>
    </Grid>
  );
};
export default TaskDetail;
