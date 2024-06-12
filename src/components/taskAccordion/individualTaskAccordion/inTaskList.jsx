import React from "react";
import InTaskAccordion from "./inTaskAccordion";

const InTaskList = ({ title, tasks, state, handleAddTask, view }) => {
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

export default InTaskList;
