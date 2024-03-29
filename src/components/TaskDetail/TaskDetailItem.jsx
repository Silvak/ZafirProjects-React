import { Grid, Box } from "@mui/material";

const TaskDetailItem = ({ label, detailText }) => {
  return (
    <Grid item xs={12}>
      <Box
        sx={{
          padding: "10px",
          borderRadius: "8px",
          outline: "1px solid #E0E3E8",
          display: "flex",
          flexDirection: "column",
          gap: "2px",
          alignItems: "start",
          justifyContent: "center",
        }}
      >
        <p style={{ color: "#6B6E75" }}>{label}</p>
        <span>{detailText}</span>
      </Box>
    </Grid>
  );
};
export default TaskDetailItem;
