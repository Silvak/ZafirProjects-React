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
import { shallow } from "zustand/shallow";

import { useParams } from "react-router-dom";

const TaskAccordion = ({ title, state, tasks, handleAddTask, view }) => {
  const { updateTask } = useBoundStore((state) => state, shallow);
  const theme = createTheme();
  const [expanded, setExpanded] = useState(false);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isKanbanView = view == "View Kanban";
  const params = useParams();

  const addTaskToList = async (taskId) => {
    await updateTask({
      taskId: taskId,
      newData: { state },
      projectId: params.id,
    });
  };

  const [{ opacity, dropTarget, isOver }, drop] = useDrop({
    accept: ["task"], // Specifies the type of item that can be dropped
    drop: (dropResult) => {
      // Receive information about the destination in `dropResult`
      const taskId = dropResult.id;
      if (taskId) {
        addTaskToList(taskId);
      }
    },
  });

  const ExpandIcon = ({ expanded }) => {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          color: "#424242",
        }}
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? (
          <ExpandLessIcon
            style={{
              fontSize: "1.6rem",
            }}
          />
        ) : (
          <ExpandMoreIcon
            style={{
              fontSize: "1.6rem",
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
            borderRadius: "20px",
            padding: "10px 20PX",
            boxShadow: "none",
            border: "1px solid #E0E3E8",
          }}
        >
          <AccordionSummary
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{
              display: "flex",
              alignItems: "center",
              padding: 0,
              maxHeight: "40px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
              onClick={() => setExpanded(!expanded)}
            >
              <ExpandIcon expanded={expanded} />
              <Typography
                variant="p"
                sx={{
                  fontSize: "20px",
                  fontWeight: 600,
                  marginInline: "1rem",
                  color: "#1D1F24",
                }}
              >
                {title}
              </Typography>

              {tasks?.length > 0 && (
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 400,
                    marginRight: "10px",
                    borderRadius: "8px",
                    height: "24px",
                    width: "24px",
                    textAlign: "center",
                    lineHeight: "24px",
                    backgroundColor: "#7662EA",
                    color: "#FFFFFF",
                  }}
                >
                  {tasks?.length.toString()}
                </div>
              )}

              <AddIcon
                sx={{
                  color: "#8C7BEE",
                  cursor: "pointer",
                  borderRadius: "8px",
                  backgroundColor: "#ECE9FF",
                  height: "24px",
                  width: "24px",
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
            {tasks?.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                isMobile={isMobile}
                isKanbanView={isKanbanView}
                onDragStart={addTaskToList}
                projectId={params.id}
              />
            ))}
          </AccordionDetails>
        </CustomAccordion>
      </div>
    </ThemeProvider>
  );
};

export default TaskAccordion;
