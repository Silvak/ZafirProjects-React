import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CreateTaskForm from "@/components/forms/createTaskForm";
import TaskHeader from "@/components/taskAccordion/taskHeader";
import TaskList from "@/components/taskAccordion/taskList";
import { useBoundStore } from "@/stores/index";

const App = () => {
  const [view, setView] = useState("Format List");
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const {
    tasks,
    ChangeStateModal,
    ChangeContentModal,
    ChangeTitleModal,
    fetchTasks,
  } = useBoundStore();
  console.log(tasks);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchTasks();
      } catch (error) {
        console.error("Error fetching tasks", error);
      }
    };

    fetchData();
  }, []);

  let pendingTasks = tasks.filter((task) => task.state === "Pending");
  let backlogTasks = tasks.filter((task) => task.state === "Backlog");
  let workingTasks = tasks.filter((task) => task.state === "Working");

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
        <TaskHeader
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
              state="Working"
              handleAddTask={() => handleAddTask()}
            />
          </div>
          <div>
            <TaskList
              title="Pending Tasks"
              tasks={pendingTasks}
              view={view}
              state="Pending"
              handleAddTask={() => handleAddTask()}
            />
          </div>
          <div>
            <TaskList
              title="BackLog"
              tasks={backlogTasks}
              view={view}
              state="Backlog"
              handleAddTask={() => handleAddTask()}
            />
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default App;
