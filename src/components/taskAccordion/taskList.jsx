import React from "react";
import TaskAccordion from "./TaskAccordion";

const TaskList = ({ title, tasks, handleAddTask, view }) => {
  return (
    <div style={{ marginTop: "2rem" }}>
      <TaskAccordion
        title={title}
        tasks={tasks}
        view={view}
        handleAddTask={handleAddTask}
      />
    </div>
  );
};

export default TaskList;
