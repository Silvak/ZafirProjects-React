
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
import ViewKanbanOutlinedIcon from "@mui/icons-material/ViewKanbanOutlined";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const App = () => {
  const [workingTasks, setWorkingTasks] = useState(mockTasks);
  const [pendingTasks, setPendingTasks] = useState(mockTasksPending);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const handleButton = (buttonName) => {
    alert(`Has hecho clic en: ${buttonName}`);
  };

  return (
    <div>
      {/* Header */}
      <Grid
        container
        direction={isMobile ? "column" : "row"}
        alignItems="center"
        justify={isMobile ? "center" : "space-between"}
      >
        <Grid item xs={12} sm={6}>
          <Typography
            variant="h4"
            sx={{
              fontSize: "18px",
              fontWeight: "bold",
              textAlign: isMobile ? "center" : "left",
            }}
          >
            My Task
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          container
          alignItems="center"
          justifyContent={isMobile ? "center" : "flex-end"}
          style={{
            textAlign: isMobile ? "center" : "right",
            marginTop: isMobile ? "1rem" : 0,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              textAlign: "center",
              marginBottom: "1rem",
            }}
          >
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
                marginRight: "2rem",
              }}
            >
              <FormatListBulletedRoundedIcon
                sx={{ marginRight: "10px" }}
                onClick={() => handleButton("Format List")}
              />
              <ViewKanbanOutlinedIcon
                sx={{ marginRight: "10px" }}
                onClick={() => handleButton("View Kanban")}
              />
              <CalendarTodayIcon onClick={() => handleButton("Calendar")} />
            </ButtonGroup>

            <Select
              value="All Tasks"
              sx={{
                width: isMobile ? "120px" : "150px",
                height: "35px",
                color: "black",
                backgroundColor: "white",
                fontSize: isMobile ? "16px" : "12px",
                border: "1px solid gray",
                borderRadius: "8px",
                marginRight: isMobile ? 0 : "2rem",
              }}
            >
              <MenuItem
                value="All Tasks"
                style={{ backgroundColor: "white", fontSize: "12px" }}
              >
                All Tasks
              </MenuItem>
              <MenuItem
                value="Item1"
                style={{ backgroundColor: "white", fontSize: "12px" }}
              >
                Item1
              </MenuItem>
            </Select>
          </div>

          <Button
            variant="contained"
            sx={{
              padding: "0.6rem",
              fontSize: "2rem",
              height: "min-content",
              borderRadius: "12px",
              marginBottom: "1rem",
            }}
            onClick={() => handleButton("Create new task")}
          >
            + Create new task
          </Button>
        </Grid>
      </Grid>
      {/* Fin del Header */}
      <div style={{ marginTop: isMobile ? "" : "2rem" }}>
        <TaskAccordion
          title="Working Tasks"
          tasks={workingTasks}
          handleAddTask={() => handleAddTask("", "")}
        />
      </div>
      <div style={{ marginTop: "2rem" }}>
        <TaskAccordion
          title="Pending Tasks"
          tasks={pendingTasks}
          handleAddTask={() => handleAddTask("", "")}
        />
      </div>
    </div>
  );
};

export default App;
