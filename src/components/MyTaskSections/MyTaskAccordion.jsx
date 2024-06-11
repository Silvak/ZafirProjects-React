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
import MyTaskItems from "./MyTaskItems";
// import CustomAccordion from "./customAccordion";
import CustomTaskAccordion from "./CustomTaskAccordion";

import { useBoundStore } from "../../stores";
import { shallow } from "zustand/shallow";
import { useParams } from "react-router-dom";

function MyTaskAccordion({ title, state, tasks, view }) {
  const theme = createTheme();
  const [expanded, setExpanded] = useState(false);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isKanbanView = view === "View Kanban";
  const params = useParams();

  const ExpandIcon = ({ expanded }) => {
    return (
      // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
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
        }}
      >
        <CustomTaskAccordion
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
              height: "30px",
            }}
          >
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
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
            </div>
          </AccordionSummary>

          <AccordionDetails
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "0",
              gap: !isKanbanView ? "5px" : "20px",
              backgroundColor: !isKanbanView && "#FFFFFF",
              borderRadius: "1rem",
            }}
          >
            {tasks?.map((task) => (
              <MyTaskItems
                key={task.id}
                task={task}
                isMobile={isMobile}
                isKanbanView={isKanbanView}
                projectId={params.id}
              />
            ))}
          </AccordionDetails>
        </CustomTaskAccordion>
      </div>
    </ThemeProvider>
  );
}
export default MyTaskAccordion;
