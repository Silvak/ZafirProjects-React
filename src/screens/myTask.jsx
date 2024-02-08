import React, { useState } from "react";
import TaskAccordion from "../components/taskAccordion/TaskAccordion";
import { mockTasks, mockTasksPending } from "../mockData/taskData";
import {
  Button,
  Select,
  MenuItem,
  Typography,
  ButtonGroup,
  Grid,
  useMediaQuery,
} from "@mui/material";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import ViewQuiltRoundedIcon from "@mui/icons-material/ViewQuiltRounded";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const App = () => {
  const [workingTasks, setWorkingTasks] = useState(mockTasks);
  const [pendingTasks, setPendingTasks] = useState(mockTasksPending);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const handleAddTask = (task, setTasks) => {
    // Lógica para agregar una nueva tarea
  };

  return (
    <div>
      {/* Header */}
      <Grid
        container
        direction={isMobile ? "column" : "row"}
        alignItems="center"
        justify={isMobile ? "center" : "space-between"}
        // style={{ margin: "1rem 0 2rem 0" }}
      >
        {isMobile ? (
          <>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="h4"
                sx={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                My Task
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              style={{ textAlign: "center", marginTop: "1rem" }}
            >
              <div style={{ display: "flex", gap: "1rem" }}>
                <ButtonGroup
                  variant="outlined"
                  aria-label="Loading button group"
                  sx={{
                    fontWeight: "normal",
                    color: "gray",
                    backgroundColor: "white",
                    padding: "0.3rem",
                    borderRadius: "8px",
                    border: "1px solid gray",
                    cursor: "pointer",
                    marginBottom: "1rem",
                  }}
                >
                  <FormatListBulletedRoundedIcon sx={{ marginRight: "10px" }} />
                  <ViewQuiltRoundedIcon sx={{ marginRight: "10px" }} />
                  <CalendarTodayIcon />
                </ButtonGroup>

                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value="All Tasks"
                  label=""
                  sx={{
                    width: "150px",
                    height: "35px",
                    color: "black",
                    backgroundColor: "white",
                    fontSize: "16px",
                    border: "1px solid gray",
                    borderRadius: "8px",
                  }}
                >
                  <MenuItem value="All Tasks">All Tasks</MenuItem>
                  <MenuItem value={10}>Item1</MenuItem>
                </Select>
              </div>
              <Button
                variant="contained"
                href="#"
                sx={{
                  padding: "0.6rem",
                  fontSize: "2rem",
                  height: "min-content",
                  borderRadius: "12px",
                  marginBottom: "1rem",
                }}
              >
                + Create new task
              </Button>
            </Grid>
          </>
        ) : (
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            style={{ marginBottom: "3rem", marginTop: "1rem" }}
          >
            <Grid item xs={12} sm={6}>
              <Typography
                variant="h4"
                sx={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  marginLeft:"2rem"
                }}
              >
                My Task
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} container justifyContent="flex-end">
              <ButtonGroup
                variant="outlined"
                aria-label="Loading button group"
                sx={{
                  fontWeight: "normal",
                  color: "gray",
                  backgroundColor: "white",
                  padding: "0.5rem",
                  borderRadius: "8px",
                  border: "1px solid gray",
                  cursor: "pointer",
                  marginRight: "2rem",
                }}
              >
                <FormatListBulletedRoundedIcon sx={{ marginRight: "10px" }} />
                <ViewQuiltRoundedIcon sx={{ marginRight: "10px" }} />
                <CalendarTodayIcon />
              </ButtonGroup>

              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value="All Tasks"
                label=""
                sx={{
                  width: "120px",
                  height: "40px",
                  color: "black",
                  backgroundColor: "white",
                  fontSize: "12px",
                  border: "1px solid gray",
                  borderRadius: "8px",
                  marginRight: "2rem",
                }}
              >
                <MenuItem value="All Tasks" style={{ fontSize: "10px", backgroundColor:"white" }}>
                  All Tasks
                </MenuItem>
                <MenuItem style={{backgroundColor:"white", fontSize:"10px"}} value={10}>Item1</MenuItem>
              </Select>

              <Button
                variant="contained"
                href="#"
                sx={{
                  padding: "0.6rem",
                  fontSize: "2rem",
                  height: "min-content",
                  borderRadius: "12px",
                }}
              >
                + Create new task
              </Button>
            </Grid>
          </Grid>
        )}
      </Grid>
      {/* Fin del Header */}
      <div>
        <TaskAccordion
          title="Working Tasks"
          tasks={workingTasks}
          handleAddTask={() => handleAddTask(workingTasks, setWorkingTasks)}
        />
      </div>
      <div style={{ marginTop: "2rem" }}>
        <TaskAccordion
          title="Pending Tasks"
          tasks={pendingTasks}
          handleAddTask={() => handleAddTask(pendingTasks, setPendingTasks)}
        />
      </div>
    </div>
  );
};

export default App;
