import { Task, TaskBar } from "./GanttStyles";

const TaskProgressBar = ({ task, taskWidth }) => {
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
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "100%",
            width: "100%",
            padding: "0 8px",
          }}
        >
          <p
            style={{
              fontSize: "12px",
              fontWeight: 500,
              color: "white",
            }}
          >
            {task.task}
          </p>
          <div>Persons</div>
        </div>

        <div
          style={{
            position: "relative",
            left: 0,
            top: "-40px",
            height: "100%",
            width: `${task.progress}%`,
            background: `${task.styles.color}`,
            zIndex: "-1",
          }}
        ></div>
      </TaskBar>
    </Task>
  );
};

export default TaskProgressBar;
