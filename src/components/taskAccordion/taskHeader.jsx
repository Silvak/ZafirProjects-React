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
import React, { useState } from "react";

import Header from "@/components/Header/Header";

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
        <ButtonGroup
          variant="outlined"
          aria-label="Loading button group"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "normal",
            padding: "0.3rem",
            borderRadius: "8px",
            border: "1px solid gray",
            cursor: "pointer",
            paddingBottom: 1,
            backgroundColor: "white",
            width: "100%",
          }}
        >
          <FormatListBulletedRoundedIcon
            sx={{
              marginRight: "10px",
              backgroundColor: selectedIcon === "Format List" ? "#1976d2" : "",
              color: selectedIcon === "Format List" ? "white" : "gray",
              borderRadius: "8px",
              padding: "2px",
            }}
            onClick={() => handleIconButtonClick("Format List")}
          />
          <ViewKanbanOutlinedIcon
            sx={{
              marginRight: "10px",
              backgroundColor: selectedIcon === "View Kanban" ? "#1976d2" : "",
              color: selectedIcon === "View Kanban" ? "white" : "gray",
              borderRadius: "8px",
              padding: "2px",
              display: isMobile ? "none" : "",
            }}
            onClick={() => handleIconButtonClick("View Kanban")}
          />
          <CalendarTodayIcon
            sx={{
              backgroundColor: selectedIcon === "Calendar" ? "#1976d2" : "",
              color: selectedIcon === "Calendar" ? "white" : "gray",
              borderRadius: "8px",
              padding: "2px",
            }}
            onClick={() => handleIconButtonClick("Calendar")}
          />
        </ButtonGroup>
        <Select
          value={selectedValue}
          onChange={handleSelectChange}
          sx={{
            width: isMobile ? "120px" : "170px",
            width: "100%",
            height: "40px",
            color: "black",
            backgroundColor: "white",
            border: "1px solid gray",
            borderRadius: "8px",
            fontSize: "16px",
          }}
        >
          <MenuItem
            value="All Tasks"
            sx={{
              backgroundColor: "white",
              fontSize: "12px",
            }}
          >
            All Tasks
          </MenuItem>
          <MenuItem
            value="Item1"
            sx={{
              backgroundColor: "white",
              fontSize: "12px",
            }}
          >
            Item1
          </MenuItem>
        </Select>
        <Button
          variant="contained"
          sx={{
            fontSize: "12px",
            fontWeight: "bold",
            borderRadius: "12px",
            padding: "10px 20px",
          }}
          onClick={handleAddTask}
        >
          + Create new task
        </Button>
      </Header>
    </ThemeProvider>
  );
};

export default TaskHeader;
