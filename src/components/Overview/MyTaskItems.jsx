import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import {
  AttachFile as AttachFileIcon,
  Circle,
  MarkUnreadChatAltOutlined as MarkUnreadChatAltOutlinedIcon,
  MoreHoriz as MoreHorizIcon,
} from "@mui/icons-material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AddIcon from "@mui/icons-material/Add";
import AvatarGroup from "@mui/material/AvatarGroup";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CircleIcon from "@mui/icons-material/Circle";

function MyTaskItems({ tasks, handleAddTask }) {
  const handleMoreIcon = () => {
    alert("toqueé el ... ");
  };
  const handleClipIcon = () => {
    alert("toqueé el icono del clip");
  };
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
    <div>
    <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "0",
            }}
          >
            {tasks.map((task, index) => (
              <Paper
                key={index}
                // elevation={isMobile || isKanbanView ? 2 : 0}
                elevation={0}
                sx={{
                  marginBottom: "8px",
                  padding: "18px",
                  opacity: task.status === "Completed" ? 0.5 : 1,
                  borderRadius: "18px",
                  width: "99%", // width: isKanbanView || isMobile ? "90%" : "99%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  noWrap
                  style={{ fontSize: "14px", marginTop: "16px" }}
                >
                  {task.task}
                </Typography>
                <Grid
                  container
                  spacing={0.5}
                  // columns={isMobile || isKanbanView ? 6 : 12}
                  columns={6}
                  alignItems="center"
                  padding={1}
                >
                  <Grid item xs={12} sm={2}>
                  {/* <Grid item xs={12} sm={!isKanbanView ? 2 : 1}> */}
                    <Typography
                      variant="h6"
                      noWrap
                      style={{
                        fontSize: "12px",
                        width: "min-content",
                        fontWeight: "bold",
                        paddingInline: "8px",
                        borderRadius: "6px",
                        ...priorityColors[task.priority],
                      }}
                    >
                      <Circle
                        sx={{ fontSize: "10px", marginRight: "2px" }}
                      ></Circle>
                      {task.priority}
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12} sm={2}>
                    <div
                      style={{
                        display: "flex",
                        color: "darkslategray",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ display: "flex" }}>
                        <MarkUnreadChatAltOutlinedIcon
                          sx={{ mr: "5px", color: "gray" }}
                        />
                        <Typography
                          variant="body1"
                          noWrap
                          style={{
                            fontSize: "14px",
                            fontWeight: "bold",
                          }}
                        >
                          {task.notification}
                        </Typography>
                      </div>
                      
                      <div
                        style={{
                          display: "flex",
                          // marginLeft: !isKanbanView ? 30 : 0,
                          marginLeft: 30,
                        }}
                      >
                        <AttachFileIcon
                          style={{ cursor: "pointer", color: "gray" }}
                          onClick={handleClipIcon}
                        />
                        <Typography
                          variant="body1"
                          noWrap
                          style={{
                            fontSize: "14px",
                            fontWeight: "bold",
                            marginRight: "1rem",
                          }}
                        >
                          {" "}
                          {task.attachments.length}
                        </Typography>
                      </div>
                    </div>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    // sm={isKanbanView ? 3 : 2}
                    sm={2}
                    sx={{
                      // mt: isKanbanView ? 4 : 0,
                      mt: 0,
                      marginInline: 2,
                      minWidth: "max-content",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginRight: "4rem",
                      }}
                    >
                      <CalendarTodayIcon
                        style={{
                          // marginTop: isMobile ? "5px" : "",
                          marginTop: "5px",
                          // marginRight: isMobile ? "" : "5px",
                          color: "gray",
                        }}
                      />
                      <Typography
                        variant="body1"
                        color="textSecondary"
                        noWrap
                        style={{ fontSize: "14px", fontWeight: "bold" }}
                      >
                        {task.date}
                      </Typography>
                    </div>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={1}
                    sx={{
                      // mt: isKanbanView ? 4 : 0,
                      mt: 0,
                      marginInline: 2,
                      minWidth: "min-content",
                    }}
                  >
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      noWrap
                      sx={{
                        fontWeight: "bold",
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
                </Grid>
              </Paper>
            ))}
          </Box>
    </div>
  </ThemeProvider>
  );
}

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

export default MyTaskItems;
