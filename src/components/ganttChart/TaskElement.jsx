import React from "react";
import { mockTasksGantt } from "@/mockData/taskData";
import { differenceInDays, addDays } from "date-fns";
import useTaskWidth from "../../hooks/ganttChart/useTaskWidth";
import { TaskRow, Task, TaskBar } from "./GanttStyles";

// ----------------- Component ----------------------
function TaskElement({ date, view, dateRange, tasksList }) {
  // Range
  const isTaskInRange2 = (view, date, taskStartDate, taskEndDate) =>
    (view === "day" && date >= taskStartDate && date <= taskEndDate) ||
    (view === "week" &&
      date >= addDays(taskStartDate, -taskStartDate.getDay()) &&
      date <= addDays(taskEndDate, 6 - taskEndDate.getDay())) ||
    (view === "month" &&
      date.getMonth() === taskStartDate.getMonth() &&
      date.getFullYear() === taskStartDate.getFullYear());

  // Calculate if the task start date is within the current view
  const isCurrentDateTaskStart = (view, date, taskStartDate) =>
    (view === "day" && differenceInDays(taskStartDate, date) === 0) ||
    (view === "week" &&
      date >= addDays(taskStartDate, -taskStartDate.getDay()) &&
      date <= addDays(taskStartDate, 6 - taskStartDate.getDay())) ||
    (view === "month" &&
      date.getMonth() === taskStartDate.getMonth() &&
      date.getFullYear() === taskStartDate.getFullYear());

  return (
    <>
      {tasksList.map((task) => {
        const taskStartDate = new Date(task.date.start);
        const taskEndDate = new Date(task.date.end);

        const taskInRange = isTaskInRange2(
          view,
          date,
          taskStartDate,
          taskEndDate
        );

        const currentDateTaskStart = isCurrentDateTaskStart(
          view,
          date,
          taskStartDate
        );

        // Calculate the width of the task bar based on its duration and view
        let taskWidth = 0;

        // Adjust the left position of the task bar based on its start date
        if (taskInRange & currentDateTaskStart) {
          taskWidth = useTaskWidth(
            view,
            date,
            taskStartDate,
            taskEndDate,
            dateRange
          );
        }

        return (
          <TaskRow key={task.id}>
            {taskInRange & currentDateTaskStart ? (
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
                    <div>Persons </div>
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
            ) : null}
          </TaskRow>
        );
      })}
    </>
  );
}

export default TaskElement;
