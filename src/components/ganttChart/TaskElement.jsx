import React from "react";
import { TaskRow } from "./GanttStyles";
import {
  isTaskInRange,
  isCurrentDateTaskStart,
} from "@/utils/ganttChart/dateRange";
import useTaskWidth from "@/hooks/ganttChart/useTaskWidth";
import TaskProgressBar from "./TaskProgressBar";

const Task = ({ task, view, date, dateRange }) => {
  const taskStartDate = new Date(task.date.start);
  const taskEndDate = new Date(task.date.end);

  const taskInRange = isTaskInRange(view, date, taskStartDate, taskEndDate);
  const currentDateTaskStart = isCurrentDateTaskStart(
    view,
    date,
    taskStartDate
  );

  const taskWidth =
    taskInRange && currentDateTaskStart
      ? useTaskWidth(view, date, taskStartDate, taskEndDate, dateRange)
      : 0;

  return (
    <TaskRow key={task.id}>
      {taskInRange && currentDateTaskStart && (
        <TaskProgressBar task={task} taskWidth={taskWidth} />
      )}
    </TaskRow>
  );
};

/* Main component */
function TaskElement({ date, view, dateRange, tasksList }) {
  return (
    <>
      {tasksList.map((task) => (
        <Task
          key={task.id}
          task={task}
          view={view}
          date={date}
          dateRange={dateRange}
        />
      ))}
    </>
  );
}

export default TaskElement;
