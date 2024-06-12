import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CreateTaskForm from "@/components/forms/createTaskForm";
import MyTaskList from "@/components/MyTaskSections/MyTaskList";
import LayoutPage from "@/layout/layoutPage";
import { useBoundStore } from "@/stores/index";
import { shallow } from "zustand/shallow";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";

const IndividualTasks = ({ view }) => {
  //const [view, setView] = useState("Format List");
  const params = useParams();

  const {
    userTasks,
    myTasks,
    ChangeStateModal,
    ChangeContentModal,
    ChangeTitleModal,
    fetchTasksById,
    selectedProject,
    fetchTasksByUser,
    User,
  } = useBoundStore((state) => state, shallow);

  const [pendingTasks, setPendingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [workingTasks, setWorkingTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedProject && selectedProject._id) {
        await fetchTasksById(selectedProject._id);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (Array.isArray(myTasks)) {
      setPendingTasks(myTasks.filter((task) => task.state === "Pending"));
      setCompletedTasks(myTasks.filter((task) => task.state === "Completed"));
      setWorkingTasks(myTasks.filter((task) => task.state === "In Progress"));
    }
  }, [myTasks]);

  const handleButton = (buttonName) => {
    setView(buttonName);
  };

  const handleAddTask = (title, description) => {
    ChangeTitleModal("Create Task");
    ChangeContentModal(
      <CreateTaskForm placeholderTaskName='task 1' projectId={params.id} />
    );
    ChangeStateModal(true);
  };

  return (
    <LayoutPage
      head={
        <Typography
          variant='p'
          style={{ fontSize: "24px", color: "#1D1F24", fontWeight: 600 }}
        >
          Your individual Tasks
        </Typography>
      }
    >
      <DndProvider backend={HTML5Backend}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <MyTaskList
              title='In progress'
              tasks={workingTasks}
              view={view}
              state='In Progress'
            />
          </Grid>

          <Grid item xs={12}>
            <MyTaskList
              title='Pending'
              tasks={pendingTasks}
              view={view}
              state='Pending'
            />
          </Grid>

          <Grid item xs={12}>
            <MyTaskList
              title='Completed'
              tasks={completedTasks}
              view={view}
              state='Completed'
            />
          </Grid>
        </Grid>
      </DndProvider>
    </LayoutPage>
  );
};

export default IndividualTasks;
