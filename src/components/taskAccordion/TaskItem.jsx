import { Grid, Paper, Typography } from "@mui/material";
import { useDrag } from "react-dnd";

//icons
import {
  AttachFile as AttachFileIcon,
  Circle,
  MarkUnreadChatAltOutlined as MarkUnreadChatAltOutlinedIcon,
  MoreHoriz as MoreHorizIcon,
} from "@mui/icons-material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CircleIcon from "@mui/icons-material/Circle";
import { Avatar, Divider } from "@mui/material";
import AvatarGroup from "@mui/material/AvatarGroup";

const TaskItem = ({ task, isMobile, isKanbanView }) => {
  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: "task",
      item: { id: task.id },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
    }),
    []
  );

  const handleMoreIcon = () => {
    alert("toqueé el ... ");
  };
  const handleClipIcon = () => {
    alert("toqueé el icono del clip");
  };

  return (
    <Paper
      elevation={3}
      sx={{
        marginBottom: "8px",
        padding: "14px",
        opacity: opacity,
        borderRadius: "18px",
        width: isKanbanView || isMobile ? "85%" : "99%",
        marginLeft: "auto",
        marginRight: "auto",
      }}
      ref={dragRef}
    >
      {/* iconos para vista Kanban */}
      {isMobile ||
        (isKanbanView && (
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  color: "#52555B",
                  fontSize: "14px",
                  marginY: 2.5,
                }}
              >
                {task.appDesign}
              </Typography>
              <ArrowForwardIcon style={{ color: "#6B6E75" }} />
            </div>
            <Divider sx={{ mb: 2 }}></Divider>
            {task.screen && (
              <img
                src={task.screen}
                alt="Task Screen"
                style={{
                  width: "100%",
                  marginBottom: "10px",
                  border: "3px solid #F6F7FA",
                  borderRadius: 8,
                }}
              />
            )}
          </div>
        ))}
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
        spacing={0}
        columns={isMobile || isKanbanView ? 6 : 12}
        alignItems="center"
        padding={0}
      >
        <Grid item xs={12} sm={!isKanbanView ? 2 : 1}>
          <Typography
            variant="h6"
            noWrap
            style={{
              fontSize: "12px",
              width: "min-content",
              fontWeight: "bold",
              paddingInline: "4px",
              paddingBlock: "2px",
              borderRadius: "6px",
              ...priorityColors[task.priority],
            }}
          >
            <Circle sx={{ fontSize: "10px", marginRight: "2px" }}></Circle>
            {task.priority}
          </Typography>
        </Grid>
        {isKanbanView && (
          <CircleIcon
            style={{
              fontSize: "6px",
              color: "lightgray",
              marginRight: "0rem",
              marginInline: "1rem",
            }}
          />
        )}
        {!isKanbanView && (
          <Grid item xs={12} sm={2}>
            <Typography
              variant="body1"
              color="textSecondary"
              noWrap
              style={{ fontSize: "14px", fontWeight: "bold" }}
              sx={{ ml: "3rem" }}
            >
              {task.appDesign}
            </Typography>
          </Grid>
        )}
        {!isKanbanView && (
          <Grid item xs={12} sm={1} sx={{ marginRight: "3rem" }}>
            <AvatarGroup max={3} style={{ marginRight: isMobile ? "30%" : "" }}>
              {task.assignees.map((assignee, index) => (
                <Avatar key={index} alt="Assignee" src={assignee} />
              ))}
            </AvatarGroup>
          </Grid>
        )}
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
            {isKanbanView && (
              <CircleIcon
                style={{
                  fontSize: "6px",
                  color: "lightgray",
                  marginInline: "1rem",
                }}
              />
            )}
            <div
              style={{
                display: "flex",
                marginLeft: !isKanbanView ? 30 : 0,
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
                {isKanbanView && (
                  <CircleIcon
                    style={{
                      fontSize: "6px",
                      color: "lightgray",
                      marginInline: "2rem",
                    }}
                  />
                )}
              </Typography>
            </div>
            {isMobile ||
              (isKanbanView && (
                <Grid item xs={12} sm={1}>
                  <AvatarGroup max={3}>
                    {task.assignees.map((assignee, index) => (
                      <Avatar key={index} alt="Assignee" src={assignee} />
                    ))}
                  </AvatarGroup>
                </Grid>
              ))}
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          sm={isKanbanView ? 3 : 2}
          sx={{
            mt: isKanbanView ? 4 : isMobile ? 2 : 0,
            mb: isMobile ? 2 : 0,
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
                marginTop: isMobile ? "5px" : "",
                marginRight: isMobile ? "" : "5px",
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
            mt: isKanbanView ? 4 : 0,
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
        <Grid item xs={12} sm={1}>
          {!isKanbanView && (
            <MoreHorizIcon
              style={{
                color: "darkslategray",
                cursor: "pointer",
                visibility: isMobile ? "hidden" : "inherits",
              }}
              onClick={handleMoreIcon}
              sx={{ ml: "5rem" }}
            />
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};
export default TaskItem;

const statusColors = {
  "In Progress": { backgroundColor: "#BED8F5", color: "#2676CF" },
  Issues: { backgroundColor: "#F8D1CB", color: "#D3544B" },
  Review: { backgroundColor: "#F6E5C6", color: "#E19E41" },
  Completed: { backgroundColor: "#CCE3DD", color: "#277F65" },
  Pending: { backgroundColor: "#E0E5E9", color: "#7E838A" },
  Backlog: { backgroundColor: "#F0E1F1", color: "#8E44AD" },
};

const priorityColors = {
  High: { backgroundColor: "#FFD1CE", color: "#E24942" },
  Medium: { backgroundColor: "#FDE9D5", color: "#E5922C" },
  Low: { backgroundColor: "#CDD9E5", color: "#4B8DC2" },
};
