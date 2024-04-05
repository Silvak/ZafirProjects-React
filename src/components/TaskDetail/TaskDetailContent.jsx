import { Grid, Box } from "@mui/material";
import GridItem from "./TaskDetailItem";

const TaskDetailContent = ({ task }) => {
  const { appDesign, date, assignees, priority } = task || {};

  return (
    <Grid container spacing={3} sx={{ marginTop: "10px" }}>
      <GridItem label="Task description" detailText={appDesign} />
      <GridItem label="Date" detailText={date} />
      <Grid item xs={12}>
        <p style={{ color: "#6B6E75", marginBottom: "5px" }}>Assigned to</p>
        {"Members"}
        {/* <Box sx={{ display: "flex", gap: "5px" }}>
          {Array.isArray(assignees) ? (
            assignees.map((element) => (
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
            ))
          ) : (
            <img
              key={assignees.id}
              src={assignees.profile}
              alt="profile"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          )}
        </Box> */}
      </Grid>
      <GridItem label="Priority" detailText={priority} />
      <GridItem label="Tags" detailText="tag1, tag2" />
    </Grid>
  );
};
export default TaskDetailContent;
