import {
  AccordionDetails,
  AccordionSummary,
  ThemeProvider,
  Typography,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TaskItem from "./TaskItem";
import CustomAccordion from "./customAccordion";
import { useDrop } from "react-dnd";
import { useBoundStore } from "../../stores";

const TaskAccordion = ({ title, status, tasks, handleAddTask, view }) => {
  const theme = createTheme();
  const [expanded, setExpanded] = useState(false);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isKanbanView = view == "View Kanban";

  const { setTasks } = useBoundStore();

  const ExpandIcon = ({ expanded }) => {
    return (
      <div
        style={{
          cursor: "pointer",
          color: "#424242",
        }}
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? (
          <ExpandMoreIcon
            style={{
              fontSize: "2rem",
            }}
          />
        ) : (
          <ExpandLessIcon
            style={{
              fontSize: "2rem",
            }}
          />
        )}
      </div>
    );
  };

  //drag  and drop
  const [{ opacity }, drop] = useDrop(
    () => ({
      accept: "task",
      drop: (item) => addTaskToList(item.id),
      collect: (monitor) => ({
        opacity: monitor.isOver() ? 0.5 : 1,
      }),
    }),
    []
  );

  const addTaskToList = (id) => {
    setTasks(id, status);
  };

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: isMobile ? "flex" : "",
          textAlign: isMobile ? "left" : "",
          opacity,
        }}
        ref={drop}
      >
        <CustomAccordion
          expanded={expanded}
          elevation={4}
          className="custom-accordion"
          style={{
            backgroundColor: "#F6F7FA",
            borderRadius: "2rem",
          }}
        >
          <AccordionSummary
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{
              display: "flex",
              alignItems: "center",
              borderRadius: 8,
              padding: 1,
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center" }}
              onClick={() => setExpanded(!expanded)}
            >
              <ExpandIcon expanded={expanded} />
              <Typography
                variant="h4"
                sx={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  marginInline: "1rem",
                }}
              >
                {title}
              </Typography>
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: "normal",
                  marginRight: "1rem",
                  borderRadius: "8px",
                  height: "1.6rem",
                  width: "1.6rem",
                  textAlign: "center",
                  lineHeight: "1.6rem",
                  backgroundColor: "#7662EA",
                  color: "#FFFFFF",
                }}
              >
                {tasks.length.toString()}
              </div>

              <AddIcon
                sx={{
                  color: "#8C7BEE",
                  cursor: "pointer",
                  borderRadius: "8px",
                  backgroundColor: "cyan",
                  fontSize: "1.5rem",
                }}
                onClick={() => handleAddTask()}
              />
            </div>
          </AccordionSummary>

          <AccordionDetails
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "0",
            }}
          >
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                isMobile={isMobile}
                isKanbanView={isKanbanView}
              />
            ))}
          </AccordionDetails>
        </CustomAccordion>
      </div>
    </ThemeProvider>
  );
};

export default TaskAccordion;
