import React, { useState } from "react";
import {
  Typography,
  Grid,
  ButtonGroup,
  Select,
  MenuItem,
  Button,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import {
  FormatListBulletedRounded as FormatListBulletedRoundedIcon,
  ViewKanbanOutlined as ViewKanbanOutlinedIcon,
  CalendarToday as CalendarTodayIcon,
} from "@mui/icons-material";

const Header = ({ title, isMobile, handleButton, handleAddTask }) => {
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
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          flexWrap: isMobile ? "wrap" : "",
          alignItems: "center",
          textAlign: "center",
          justifyContent: isMobile ? "center" : "space-between",
          gap: "1rem",
          padding: "1.5rem",
        }}
      >
        <Grid item>
          <Typography
            variant="h4"
            sx={{
              fontSize: "24px",
              fontWeight: "bold",
              textAlign: isMobile ? "center" : "left",
              mt: 2,
            }}
          >
            {title}
          </Typography>
        </Grid>
        <Grid item>
          <ButtonGroup
            variant="outlined"
            aria-label="Loading button group"
            sx={{
              fontWeight: "normal",
              padding: "0.3rem",
              borderRadius: "8px",
              border: "1px solid gray",
              cursor: "pointer",
              marginRight: "2rem",
              paddingBottom: 1,
            }}
          >
            <FormatListBulletedRoundedIcon
              sx={{
                marginRight: "10px",
                backgroundColor:
                  selectedIcon === "Format List" ? "#1976d2" : "",
                color: selectedIcon === "Format List" ? "white" : "gray",
                borderRadius: "8px",
                padding: "2px",
              }}
              onClick={() => handleIconButtonClick("Format List")}
            />
            <ViewKanbanOutlinedIcon
              sx={{
                marginRight: "10px",
                backgroundColor:
                  selectedIcon === "View Kanban" ? "#1976d2" : "",
                color: selectedIcon === "View Kanban" ? "white" : "gray",
                borderRadius: "8px",
                padding: "2px",
                display: isMobile ? "none" : ""
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
              height: "40px",
              color: "black",
              backgroundColor: "white",
              border: "1px solid gray",
              borderRadius: "8px",
              marginRight: isMobile ? 0 : "2rem",
              paddingTop: 1,
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
            fullWidth
            sx={{
              fontSize: "12px",
              fontWeight: "bold",
              borderRadius: "12px",
              maxWidth: "fit-content",
              padding: "0.6rem 1rem",
              marginTop: isMobile ? "1rem" : "0",
            }}
            onClick={handleAddTask}
          >
            + Create new task
          </Button>
        </Grid>
      </div>
    </ThemeProvider>
  );
};

export default Header;
