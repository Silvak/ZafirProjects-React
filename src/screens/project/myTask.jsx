import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CreateTaskForm from "@/components/forms/createTaskForm";
import Header from "@/components/taskAccordion/taskHeader";
import TaskList from "@/components/taskAccordion/taskList";
import { useBoundStore } from "@/stores/index";

const App = () => {
  const [view, setView] = useState("Format List");
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const {
    tasks,
    addTask,
    ChangeStateModal,
    ChangeContentModal,
    ChangeTitleModal,
  } = useBoundStore();

  let pendingTasks = tasks.filter((task) => task.status === "Pending");
  let backlogTasks = tasks.filter((task) => task.status === "Backlog");
  let workingTasks = tasks.filter((task) => task.status === "Working");

  const handleButton = (buttonName) => {
    setView(buttonName);
  };

  const handleAddTask = (title, description) => {
    ChangeTitleModal("Create Task");
    ChangeContentModal(<CreateTaskForm placeholderTaskName="task 1" />);
    ChangeStateModal(true);
  };

  const setColumnsStyle = () => {
    if (view === "View Kanban" && !isMobile) return "repeat(3,1fr)";
    if (view === "View Kanban" && isMobile) return "1fr";
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div sx={{ minWidth: "250px" }}>
        <Header
          title="My Task"
          handleAddTask={handleAddTask}
          handleButton={handleButton}
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: setColumnsStyle(),
            gap: "1rem",
            padding: "0 20px",
          }}
        >
          <div>
            <TaskList
              title="Working Tasks"
              tasks={workingTasks}
              view={view}
              status="Working"
              handleAddTask={() => handleAddTask()}
            />
          </div>
          <div>
            <TaskList
              title="Pending Tasks"
              tasks={pendingTasks}
              view={view}
              status="Pending"
              handleAddTask={() => handleAddTask()}
            />
          </div>
          <div>
            <TaskList
              title="BackLog"
              tasks={backlogTasks}
              view={view}
              status="Backlog"
              handleAddTask={() => handleAddTask()}
            />
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default App;
