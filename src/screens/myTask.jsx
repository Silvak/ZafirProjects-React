import React, { useState } from "react";
import Header from "../components/taskAccordion/taskHeader";
import TaskList from "../components/taskAccordion/taskList";
import { useBoundStore } from "../stores/index"; // Importa el hook useBoundStore aquí
import useMediaQuery from "@mui/material/useMediaQuery";

const App = () => {
  const [view, setView] = useState("Format List");
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const { tasks, addTask } = useBoundStore();

  const pendingTasks = tasks.filter((task) => task.status === "Pending");
  const backlogTasks = tasks.filter((task) => task.status === "Backlog");
  const workingTasks = tasks.filter(
    (task) => task.status !== "Pending" && task.status !== "Backlog"
  );

  const handleButton = (buttonName) => {
    setView(buttonName);
  };

  const handleAddTask = (title, description) => {
    addTask({ title, description });
  };

  return (
    <div>
      <Header
        title="My Task"
        isMobile={isMobile}
        handleAddTask={handleAddTask}
        handleButton={handleButton}
      />
      <div
        style={{
          display: view === "View Kanban" ? "flex" : "",
          flexDirection: view === "View Kanban" ? "row" : "",
          gap: "1rem",
        }}
      >
        <div>
          <TaskList
            title="Working Tasks"
            tasks={workingTasks}
            view={view}
            handleAddTask={() => handleAddTask("", "")}
          />
        </div>
        <div>
          <TaskList
            title="Pending Tasks"
            tasks={pendingTasks}
            view={view}
            handleAddTask={() => handleAddTask("", "")}
          />
        </div>
        <div>
          <TaskList
            title="BackLog"
            tasks={backlogTasks}
            view={view}
            handleAddTask={() => handleAddTask("", "")}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
