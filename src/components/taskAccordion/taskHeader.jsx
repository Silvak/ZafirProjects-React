import React, { useState } from "react";
import {
  CalendarToday as CalendarTodayIcon,
  FormatListBulletedRounded as FormatListBulletedRoundedIcon,
  ViewKanbanOutlined as ViewKanbanOutlinedIcon,
} from "@mui/icons-material";
import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  MenuItem,
  Select,
  ThemeProvider,
  Typography,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import Header from "@/components/Header/Header";
import FilterSelect from "@/components/Selects/FilterSelect";
import { Link } from "react-router-dom";

const filtersData = [
  { id: 1, label: "All Tasks", value: "All Tasks" },
  { id: 2, label: "In Progress", value: "In Progress" },
  { id: 3, label: "Pending", value: "Pending" },
  { id: 4, label: "Completed", value: "Completed" },
];

const TaskHeader = ({ title, handleButton, handleAddTask }) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const theme = createTheme();
  const [selectedValue, setSelectedValue] = useState("All Tasks");
  const [selectedIcon, setSelectedIcon] = useState("Format List");

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleIconButtonClick = (buttonName) => {
    setSelectedIcon(buttonName);
    handleButton(buttonName);
  };

  return (
    <ThemeProvider theme={theme}>
      <Header title={title}>
        {handleAddTask && handleButton && (
          <ButtonGroup
            variant="outlined"
            aria-label="Loading button group"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              fontWeight: "normal",
              borderRadius: "10px",
              backgroundColor: "white",
            }}
          >
            <Link to={`list`} style={{ height: "100%" }}>
              <FormatListBulletedRoundedIcon
                sx={{
                  backgroundColor:
                    selectedIcon === "Format List"
                      ? "rgb(118, 98, 234)"
                      : "transparent",
                  color: selectedIcon === "Format List" ? "white" : "gray",
                  borderRadius: "8px",
                  padding: "4px",
                  cursor: "pointer",
                  height: "30px",
                  width: "30px",
                }}
                onClick={() => handleIconButtonClick("Format List")}
              />
            </Link>
            <Link to={`trello`} style={{ height: "100%" }}>
              <ViewKanbanOutlinedIcon
                sx={{
                  backgroundColor:
                    selectedIcon === "View Kanban" ? "rgb(118, 98, 234)" : "",
                  color: selectedIcon === "View Kanban" ? "white" : "gray",
                  borderRadius: "8px",
                  padding: "4px",
                  display: isMobile ? "none" : "",
                  cursor: "pointer",
                  height: "30px",
                  width: "30px",
                }}
                onClick={() => handleIconButtonClick("View Kanban")}
              />
            </Link>
            <Link to={`gantt`} style={{ height: "100%" }}>
              <CalendarTodayIcon
                sx={{
                  backgroundColor:
                    selectedIcon === "Calendar" ? "rgb(118, 98, 234)" : "",
                  color: selectedIcon === "Calendar" ? "white" : "gray",
                  borderRadius: "8px",
                  padding: "4px",
                  height: "30px",
                  cursor: "pointer",
                  width: "30px",
                }}
                onClick={() => handleIconButtonClick("Calendar")}
              />
            </Link>
          </ButtonGroup>
        )}
        {/* <FilterSelect data={filtersData} padding="10px" /> */}
        {handleAddTask && handleButton && (
          <Button
            variant="contained"
            sx={{
              fontSize: "12px",
              fontWeight: "bold",
              borderRadius: "12px",
              background: "rgb(118, 98, 234)",
            }}
            onClick={handleAddTask}
          >
            + Create new task
          </Button>
        )}
      </Header>
    </ThemeProvider>
  );
};

export default TaskHeader;
