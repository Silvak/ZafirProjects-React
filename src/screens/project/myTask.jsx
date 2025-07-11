import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CreateTaskForm from "@/components/forms/createTaskForm";
import TaskHeader from "@/components/taskAccordion/taskHeader";
import TaskList from "@/components/taskAccordion/taskList";
import { useBoundStore } from "@/stores/index";
import { shallow } from "zustand/shallow";
import Grid from "@mui/material/Grid";
import { useParams } from "react-router-dom";

const App = () => {
  const [view, setView] = useState("Format List");
  const params = useParams();

  const {
    myTasks,
    ChangeStateModal,
    ChangeContentModal,
    ChangeTitleModal,
    fetchTasksById,
    selectedProject,
  } = useBoundStore((state) => state, shallow);

  // useEffect(() => {
  //   if (params.id) {
  //     const fetchData = async () => {
  //       try {
  //         // Only fetch tasks if idProject has changed
  //         await fetchTasksById(params.id);
  //       } catch (error) {
  //         console.error('Error fetching tasks', error);
  //       }
  //     };

  //     fetchData();
  //   }
  // }, [params.id, fetchTasksById]);

  const [pendingTasks, setPendingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [workingTasks, setWorkingTasks] = useState([]);

  useEffect(() => {
    if (Array.isArray(myTasks)) {
      setPendingTasks(myTasks.filter((task) => task.state === "Pending"));
      setCompletedTasks(myTasks.filter((task) => task.state === "Completed"));
      setWorkingTasks(myTasks.filter((task) => task.state === "In Progress"));
    }
  }, [myTasks]);

  const handleAddTask = (title, description) => {
    ChangeTitleModal("Create Task");
    ChangeContentModal(
      <CreateTaskForm placeholderTaskName='task 1' projectId={params.id} />
    );
    ChangeStateModal(true);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div sx={{ minWidth: "250px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={view != "View Kanban" ? 4 : 12}>
            <TaskList
              title='In progress'
              tasks={workingTasks}
              view={view}
              state='In Progress'
              handleAddTask={() => handleAddTask()}
            />
          </Grid>

          <Grid item xs={12} lg={view != "View Kanban" ? 4 : 12}>
            <TaskList
              title='Pending'
              tasks={pendingTasks}
              view={view}
              state='Pending'
              handleAddTask={() => handleAddTask()}
            />
          </Grid>

          <Grid item xs={12} lg={view != "View Kanban" ? 4 : 12}>
            <TaskList
              title='Completed'
              tasks={completedTasks}
              view={view}
              state='Completed'
              handleAddTask={() => handleAddTask()}
            />
          </Grid>
        </Grid>
      </div>
    </DndProvider>
  );
};

export default App;
