import { Box } from "@mui/material";

const TaskDetailHeader = ({ taskId, taskTitle }) => {
  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>{taskTitle}</h2>
      <Box sx={{ background: "#E0E3E8", padding: "5px", borderRadius: "8px" }}>
        <span>{taskId}</span>
      </Box>
    </Box>
  );
};
export default TaskDetailHeader;
