import { Grid, Box } from "@mui/material";
import GridItem from "./TaskDetailItem";

const TaskDetailContent = ({ task }) => {
  const { start, priority } = task || {};

  const formatDate = (dateString) => {
    const today = new Date();
    const date = new Date(dateString);
    const options = { year: "numeric", month: "short", day: "numeric" };

    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      return "Today";
    } else {
      return date.toLocaleDateString("en-US", options);
    }
  };

  return (
    <Grid container spacing={3} sx={{ marginTop: "10px" }}>
      <GridItem
        label="Task description"
        detailText={task.data[0].description}
      />
      <GridItem label="Date" detailText={formatDate(task.start)} />
      <Grid item xs={12}>
        <p style={{ color: "#6B6E75", marginBottom: "5px" }}>Assigned to</p>
        {task.members}
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
