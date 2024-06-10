import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import { Task, TaskBar, CtmToolTip } from "./GanttStyles";

const CustomToolTip = ({ task }) => {
  return (
    <CtmToolTip>
      <p>{task.task}</p>
    </CtmToolTip>
  );
};

const TaskProgressBar = ({ task, taskWidth }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <Task>
      <TaskBar
        style={{
          background: `${task.styles.color}99`,
          width: `${taskWidth.width}px`,
          left: `${taskWidth.left}px`,
          position: "relative",
          top: "15px",
          zIndex: "1",
          cursor: "pointer",
        }}
        draggable
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* content */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "100%",
            width: "100%",
            padding: "0 12px",
          }}
        >
          <p
            style={{
              fontSize: "14px",
              fontWeight: 400,
              color: "white",
            }}
          >
            {taskWidth.width > 500 && task.task}
          </p>
          {taskWidth.width > 99 && (
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              style={{ height: "24px", width: "24px" }}
            />
          )}
        </div>

        {/* internal progress bar */}
        <div
          style={{
            position: "relative",
            left: 0,
            top: "-40px",
            height: "100%",
            width: `${task.progress}%`,
            background: `${task.styles.color}`,
            zIndex: "-1",
            borderRadius: "12px 0px 0px 12px",
          }}
        ></div>

        {showTooltip && <CustomToolTip task={task} />}
      </TaskBar>
    </Task>
  );
};

export default TaskProgressBar;
