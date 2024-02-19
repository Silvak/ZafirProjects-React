import { useState } from "react";
import { useBoundStore } from "../../stores/index"; // Importa el hook useBoundStore aquí
import {
  Typography,
  Box,
  createTheme,
  Select,
  MenuItem,
  Grid,
  ThemeProvider,
} from "@mui/material";
import MyTaskList from "./MyTaskList";

function MyTask() {
  const { tasks, addTask } = useBoundStore();
  const theme = createTheme();
  const [selectedValue, setSelectedValue] = useState("This Week");
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const workingTasks = tasks.filter(
    (task) => task.status !== "Pending" && task.status !== "Backlog"
  );

  return (
    <ThemeProvider theme={theme}>
      <Grid
        sx={{
          backgroundColor: "#ffffff",
          height: "572px",
          minWidth: "544px",
          borderRadius: "20px",
          marginRight: "24px",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        {/* My Task Header */}
        <Grid
          item
          sx={{
            display: "flex",
            justifyContent: "space-between",
            height: "69px",
          }}
        >
          <Grid
            item
            sx={{
              marginLeft: "20px",
              marginBottom: "17px",
              marginTop: "22px",
            }}
          >
            <Typography
              sx={{ fontSize: "20px", fontWeight: 500, fontFamily: "Poppins" }}
            >
              My Task
            </Typography>
          </Grid>
          <Grid item>
            <Select
              value={selectedValue}
              onChange={handleSelectChange}
              sx={{
                width: "140px",
                height: "34px",
                color: "#1D1F24",
                backgroundColor: "white",
                border: "1px solid gray",
                borderRadius: "8px",
                marginTop: "20px",
                marginRight: "20px",
                marginBottom: "15px",
                paddingTop: 1,
                fontSize: "16px",
              }}
            >
              <MenuItem
                value="This Month"
                sx={{
                  backgroundColor: "white",
                  fontSize: "12px",
                }}
              >
                This Month
              </MenuItem>
              <MenuItem
                value="This Week"
                sx={{
                  backgroundColor: "white",
                  fontSize: "12px",
                }}
              >
                This Week
              </MenuItem>
              <MenuItem
                value="Today"
                sx={{
                  backgroundColor: "white",
                  fontSize: "12px",
                }}
              >
                Today
              </MenuItem>
            </Select>
          </Grid>
        </Grid>
        {/* Task list */}
        <MyTaskList
          tasks={workingTasks}
          handleAddTask={() => handleAddTask("", "")}
        />
      </Grid>
    </ThemeProvider>
  );
}

export default MyTask;
