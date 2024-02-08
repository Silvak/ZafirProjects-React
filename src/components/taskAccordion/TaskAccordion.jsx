import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Paper,
  Grid,
  Avatar,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import {
  AttachFile as AttachFileIcon,
  Event as EventIcon,
  MarkUnreadChatAltOutlined as MarkUnreadChatAltOutlinedIcon,
  MoreHoriz as MoreHorizIcon,
} from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import AvatarGroup from "@mui/material/AvatarGroup";

const TaskAccordion = ({ title, tasks, handleAddTask }) => {
  const theme = createTheme();
  const [expanded, setExpanded] = useState(true);

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Accordion
          expanded={expanded}
          onChange={() => setExpanded(!expanded)}
          sx={{
            backgroundColor: "#F6F7FA",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
          }}
        >
          <AccordionSummary
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#F6F7FA",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <ExpandIcon expanded={expanded} />
              <Typography
                variant="h4"
                sx={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  marginRight: "1rem",
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
                onClick={handleAddTask}
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
            <div
              style={{
                width: "100%",
                border: "1px solid lightgray",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                backgroundColor: "white",
              }}
            >
              {tasks.map((task, index) => (
                <Paper
                  key={index}
                  elevation={0}
                  sx={{
                    marginBottom: "10px",
                    padding: "10px",
                    opacity: task.status === "Completed" ? 0.5 : 1,
                  }}
                >
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={2}>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <Typography
                          variant="h6"
                          fontWeight="bold"
                          noWrap
                          style={{ fontSize: "14px", marginTop: "16px" }}
                        >
                          {task.task}
                        </Typography>
                        <Typography
                          variant="h6"
                          noWrap
                          style={{
                            fontSize: "12px",
                            width: "min-content",
                            paddingInline: "6px",
                            borderRadius: "6px",
                            ...priorityColors[task.priority],
                          }}
                        >
                          {task.priority}
                        </Typography>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Typography
                        variant="body1"
                        color="textSecondary"
                        noWrap
                        style={{ fontSize: "14px", fontWeight: "bold" }}
                      >
                        {task.appDesign}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={1} sx={{ marginRight: "3rem" }}>
                      <AvatarGroup max={3}>
                        {task.assignees.map((assignee, index) => (
                          <Avatar key={index} alt="Assignee" src={assignee} />
                        ))}
                      </AvatarGroup>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <div style={{ display: "flex", color: "darkslategray" }}>
                        <MarkUnreadChatAltOutlinedIcon
                          style={{ marginRight: "5px", color: "darkslategray" }}
                        />
                        <Typography
                          variant="body1"
                          noWrap
                          style={{ fontSize: "14px", marginRight: "1rem" }}
                        >
                          {task.notification}
                        </Typography>
                        <AttachFileIcon />
                        <Typography
                          variant="body1"
                          noWrap
                          style={{ fontSize: "14px" }}
                        >
                          {" "}
                          {task.attachments.length}
                        </Typography>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginRight: "4rem",
                        }}
                      >
                        <EventIcon
                          style={{ marginRight: "5px", color: "darkslategray" }}
                        />
                        <Typography
                          variant="body1"
                          color="textSecondary"
                          noWrap
                          style={{ fontSize: "14px" }}
                        >
                          {task.date}
                        </Typography>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={1}>
                      <Typography
                        variant="body1"
                        color="textSecondary"
                        noWrap
                        sx={{
                          fontSize: "14px",
                          borderRadius: "8px",
                          padding: "4px 8px",
                          textAlign: "center",
                          alignItems: "center",
                          ...statusColors[task.status],
                        }}
                      >
                        {task.status}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={1}>
                      <MoreHorizIcon style={{ color: "darkslategray" }} />
                    </Grid>
                  </Grid>
                </Paper>
              ))}
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </ThemeProvider>
  );
};

const statusColors = {
  "In Progress": { backgroundColor: "#CEE4F8", color: "#459CED" },
  Issues: { backgroundColor: "#FFEBEA", color: "#EB807B" },
  Review: { backgroundColor: "#FCF2E3", color: "#EDB055" },
  Completed: { backgroundColor: "#E2F3F0", color: "#429482" },
  Pending: { backgroundColor: "#F6F7FA", color: "#8D9096" },
};

const priorityColors = {
  High: { backgroundColor: "#FFEBEA", color: "#E55D57" },
  Medium: { backgroundColor: "#FCF2E3", color: "#EBA741" },
  Low: { backgroundColor: "#DEE9F2", color: "#5BA9F6" },
};

const ExpandIcon = ({ expanded }) => {
  return (
    <span
      style={{
        transform: expanded ? "rotate(180deg)" : "rotate(-90deg)",
        fontSize: "20px",
        color: "gray",
        fontWeight: "normal",
        marginRight: "1rem",
      }}
    >
      v
    </span>
  );
};

export default TaskAccordion;
