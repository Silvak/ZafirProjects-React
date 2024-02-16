import { Grid, Box } from "@mui/material";
import GridItem from "./TaskDetailItem";

import { taskDetailData } from "../../mockData/taskData";

const TaskDetailContent = () => {
  const { task, appDesign, date, assignees, priority } = taskDetailData;

  return (
    <Grid container spacing={3} sx={{ marginTop: "10px" }}>
      <GridItem label="Task description" detailText={appDesign} />
      <GridItem label="Date" detailText={date} />
      <Grid item xs={12}>
        <p style={{ color: "#6B6E75", marginBottom: "5px" }}>Assigned to</p>
        <Box sx={{ display: "flex", gap: "10px" }}>
          {assignees.map((element) => (
            <img
              key={element.id}
              src={element.profile}
              alt="profile"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          ))}
        </Box>
      </Grid>
      <GridItem label="Priority" detailText={priority} />
      <GridItem label="Tags" detailText="tag1, tag2" />
    </Grid>
  );
};
export default TaskDetailContent;
