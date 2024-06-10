import React from "react";
import TaskAccordion from "./TaskAccordion";

const TaskList = ({ title, tasks, state, handleAddTask, view }) => {
  return (
    <div>
      <TaskAccordion
        title={title}
        tasks={tasks}
        view={view}
        state={state}
        handleAddTask={handleAddTask}
      />
    </div>
  );
};

export default TaskList;
