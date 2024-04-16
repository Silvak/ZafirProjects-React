import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import {
  AttachFile as AttachFileIcon,
  Circle,
  MarkUnreadChatAltOutlined as MarkUnreadChatAltOutlinedIcon,
} from "@mui/icons-material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

import { priorityColors, statusColors } from "@/utils/colors";

function MyTaskItems({ tasks }) {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  // console.log(tasks);

  const formatDate = (dateString) => {
    const today = new Date();
    const date = new Date(dateString);
    const options = { year: "numeric", month: "short", day: "numeric" };

    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      return "Today";
    } else {
      return date.toLocaleDateString("en-US", options);
    }
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
            display: !isMobile ? "flex" : "inherit",
            flexDirection: "column",
            padding: "0",
          }}
        >
          {!isMobile ? (
            tasks.map((task, index) => (
              <Box
                key={index}
                elevation={0}
                sx={{
                  opacity: task.state === "Completed" ? 0.5 : 1,
                  borderRadius: "18px",
                  width: "99%",
                  marginLeft: "auto",
                  marginRight: "auto",
                  overflowY: "auto",
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  noWrap
                  style={{ fontSize: "14px", marginTop: "16px" }}
                >
                  {task.data[0].name}
                </Typography>
                <Grid
                  container
                  spacing={0.5}
                  // columns={12}
                  alignItems="center"
                  padding={1}
                >
                  <Grid item xs={12} sm={2}>
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
                        marginLeft: 50,
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
                          {"5"}
                        </Typography>
                      </div>

                      <div
                        style={{
                          display: "flex",
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
                          {"1"}
                        </Typography>
                      </div>
                    </div>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    sx={{
                      mt: 0,
                      marginInline: 2,
                      minWidth: "max-content",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginLeft: 80,
                      }}
                    >
                      <CalendarTodayIcon
                        style={{
                          color: "gray",
                        }}
                      />
                      <Typography
                        variant="body1"
                        color="textSecondary"
                        noWrap
                        style={{ fontSize: "14px", fontWeight: "bold" }}
                      >
                        {formatDate(task.start)}
                      </Typography>
                    </div>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={1}
                    sx={{
                      mt: 0,
                      marginInline: 2,
                      minWidth: "min-content",
                      display: "flex",
                      justifyContent: "end",
                      borderRadius: "6px", // *
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
                        ...statusColors[task.state],
                      }}
                    >
                      {task.state}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            ))
          ) : (
            /////// MOBILE VIEW
            <Grid sx={{ minWidth: "208px" }}>
              {tasks.map((task, index) => (
                <Grid
                  item
                  key={index}
                  elevation={0}
                  sx={{
                    opacity: task.state === "Completed" ? 0.5 : 1,
                    overflowY: "auto",
                    borderBottom: "1px solid #E0E3E8",
                    marginBottom: "5px",
                    padding: 1,
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    noWrap
                    style={{ fontSize: "14px", marginTop: "16px" }}
                  >
                    {task.data[0].name}
                  </Typography>
                  <Grid item xs={12} sm={2} sx={{ marginBottom: "10px" }}>
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
                        marginLeft: 50,
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
                          {"notification"}
                        </Typography>
                      </div>

                      <div
                        style={{
                          display: "flex",
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
                          {"attachments.length"}
                        </Typography>
                      </div>
                    </div>
                  </Grid>

                  {/* Calendar and Status */}
                  <Grid
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "10px",
                    }}
                  >
                    <Grid
                      sx={{
                        display: "-moz-initial",
                        justifyContent: "left",
                        overflowX: "auto",
                      }}
                    >
                      <Grid
                        item
                        xs={12}
                        sm={4}
                        sx={{
                          mt: 0,
                          marginInline: 2,
                          minWidth: "max-content",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <CalendarTodayIcon
                            style={{
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
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={1}
                      sx={{
                        mt: 0,
                        marginInline: 2,
                        minWidth: "min-content",
                        width: "fit-content",
                        display: "flex",
                        justifyContent: "end",
                        backgroundColor: "grey", // *
                        borderRadius: "6px", // *
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
                          ...statusColors[task.state],
                        }}
                      >
                        {task.state}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default MyTaskItems;
