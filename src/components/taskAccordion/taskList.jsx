import React from "react";
import TaskAccordion from "./TaskAccordion";


const TaskList = ({ title, tasks, status, handleAddTask, view }) => {

  return (
    <div style={{ marginTop: "2rem" }}>
      <TaskAccordion
        title={title}
        tasks={tasks}
        view={view}
        status={status}
        handleAddTask={handleAddTask}
      />
    </div>
  );
};

export default TaskList;
