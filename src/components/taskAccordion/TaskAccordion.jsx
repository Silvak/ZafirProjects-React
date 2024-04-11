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
import { axiosInstance } from "../../config/apiConfig";
import { useParams } from "react-router-dom";

const TaskAccordion = ({ title, state, tasks, handleAddTask, view }) => {
  const theme = createTheme();
  const [expanded, setExpanded] = useState(false);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isKanbanView = view == "View Kanban";

  const { updateTask } = useBoundStore();
  const params = useParams();

  const [{ opacity, dropTarget, isOver }, drop] = useDrop({
    accept: ["task"], // Especifica el tipo de elemento que se puede soltar
    drop: (dropResult) => {
      // Recibe información sobre el destino en `dropResult`
      // console.log("Elemento soltado en:", state); // ID del destino
    },
  });

  const addTaskToList = async (taskId) => {
    await updateTask(taskId, state, params.id);
  };

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

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
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
            borderRadius: "12px",
            padding: "20px",
            boxShadow:
              " rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
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
                  borderRadius: "12px",
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
              gap: "20px",
            }}
          >
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                isMobile={isMobile}
                isKanbanView={isKanbanView}
                onDragStart={addTaskToList}
              />
            ))}
          </AccordionDetails>
        </CustomAccordion>
      </div>
    </ThemeProvider>
  );
};

export default TaskAccordion;
