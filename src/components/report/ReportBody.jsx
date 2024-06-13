import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Typography,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";
import FirstRow from "./content/FirstRow";
import AvatarsGroup from "./content/AvatarsGroup";
import ReportTasks from "./content/ReportTasks";
import PieChart from "./content/PieChart";
import TaskByProject from "./content/TaskByProject";
import TaskByProjectRow from "./content/TaskByProjectRow";
import UpcomingTask from "./content/UpcomingTask";
import { useBoundStore } from "../../stores/index";
import { shallow } from "zustand/shallow";
import { axiosInstance } from "@/config/apiConfig";

function Loading() {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingBlock: 12,
      }}
    >
      <CircularProgress
        style={{ color: "#C02327" }}
        sx={{ m: 2 }}
        size='32px'
      />
      <span>..loading</span>
    </div>
  );
}

function ComponentBody() {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [projectSelected, setProjectSelected] = useState(null);

  const { projectsData } = useBoundStore((state) => state, shallow);
  const [totalTasks, setTotalTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [reduceProjects, setReduceProjects] = useState([]);
  const [userTasks, setUserTasks] = useState([]);
  const [usersWithData, setUsersWithData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    const fetchProjectTasks = async () => {
      setLoading(true); // Inicia el estado de carga
      setLoadingUsers(true);

      if (projectsData?.length > 0) {
        let tempArray = [];
        let taskCount = 0;
        const userTaskMap = {};

        const projectPromises = projectsData.map(async (project) => {
          const { data } = await axiosInstance.get(
            `/tasksList/project/${project._id}`
          );

          if (data?.length > 0) {
            const completedCount = data.filter(
              (task) => task.state === "Completed"
            ).length;

            const reduceProject = {
              total: data.length,
              completed: completedCount,
              project: project.name,
            };

            tempArray.push(reduceProject);
            taskCount += data.length;

            data.forEach((task) => {
              task.members_id.forEach((member) => {
                const memberId = member;
                if (!userTaskMap[memberId]) {
                  userTaskMap[memberId] = { ...memberId, taskCount: 0 };
                }
                userTaskMap[member].taskCount += 1; // Incrementar el recuento de tareas para este usuario
              });
            });
          }
        });

        await Promise.all(projectPromises);

        // Ordenar los proyectos por la cantidad de tareas en orden descendente
        tempArray.sort((a, b) => b.total - a.total);

        // Quedarse con los 4 proyectos con más tareas
        const topProjects = tempArray.slice(0, 4);
        setReduceProjects(topProjects);
        setTotalTasks(taskCount);

        // Ordenar los proyectos por tareas completadas en orden descendente y quedarse con los 5 primeros
        tempArray.sort((a, b) => b.completed - a.completed);
        const topCompletedProjects = tempArray.slice(0, 4);

        setCompletedTasks(topCompletedProjects);

        // Convertir el mapa de tareas por usuario en una lista y ordenar por cantidad de tareas
        const userTaskList = Object.entries(userTaskMap).map(
          ([userId, userData]) => ({
            _id: userId,
            taskCount: userData.taskCount,
          })
        );

        const userTaskListSorted = userTaskList
          .sort((a, b) => b.taskCount - a.taskCount)
          .slice(0, 4);

        setUserTasks(userTaskListSorted);
      }
      setLoading(false);
      setTimeout(() => {
        setLoadingUsers(false);
      }, 5000);
    };

    fetchProjectTasks();
  }, [projectsData]);

  useEffect(() => {
    const getUserNames = async (userTaskListSorted) => {
      const promises = userTaskListSorted.map(async (user) => {
        try {
          const response = await axiosInstance.get(`/user/${user._id}`);
          const userData = response.data; // Suponiendo que la respuesta contiene los datos del usuario
          return { ...user, name: userData.name, colorbg: userData.colorbg }; // Agregar el nombre del usuario a la lista
        } catch (error) {
          console.error(
            `Error fetching user data for user ${user._id}:`,
            error
          );
          return user; // En caso de error, devolver el objeto de usuario sin el nombre
        }
      });

      const usersWithData = await Promise.all(promises);
      setUsersWithData(usersWithData); // Actualizar el estado con los usuarios y sus nombres
    };

    if (userTasks.length > 0) {
      getUserNames(userTasks);
    }
  }, [userTasks]);

  return (
    <Grid container spacing={4} sx={{}}>
      {/* Primera fila */}
      <Grid item xs={12}>
        <Paper style={paperStyle}>
          <Typography sx={titleStyle}>Project report glance</Typography>
          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: isMobile ? "center" : "space-between",
              alignItems: "center",
            }}
          >
            <>
              <FirstRow
                setProjectSelected={setProjectSelected}
                projectSelected={projectSelected}
                projectsData={projectsData}
              />
              <AvatarsGroup
                projectSelected={projectSelected}
                projectsData={projectsData}
              />
            </>
          </div>
          <ReportTasks customProject={projectSelected} />
        </Paper>
      </Grid>
      {/* Segunda fila */}
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Paper style={paperStyle}>
              <Typography sx={titleStyle}>Tasks by completion</Typography>
              {loading ? (
                <Loading />
              ) : (
                <PieChart projectSelected={projectSelected} />
              )}
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper style={paperStyle}>
              <Typography sx={titleStyle}>
                Projects with the most tasks
              </Typography>
              {loading ? (
                <Loading />
              ) : (
                <TaskByProject
                  totalTasks={totalTasks}
                  reduceProjects={reduceProjects.slice(0, 3)}
                />
              )}
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      {/* Tercera fila */}
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Paper style={paperStyle}>
              <Typography sx={titleStyle}>
                Users with the most participations
              </Typography>
              {loadingUsers ? (
                <Loading />
              ) : (
                <UpcomingTask usersWithData={usersWithData} />
              )}
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper style={paperStyle}>
              <Typography sx={titleStyle}>Projects performance</Typography>
              {loading ? (
                <Loading />
              ) : (
                <TaskByProjectRow
                  totalTasks={totalTasks}
                  completedTasks={completedTasks}
                />
              )}
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

const paperStyle = {
  borderRadius: "12px",
  backgroundColor: "#ffffff",
  border: "1px solid #E0E3E8",
};

const titleStyle = {
  fontFamily: "Poppins",
  fontSize: "20px",
  fontWeight: 600,
  lineHeight: "30px",
  letterSpacing: "0.01em",
  textAlign: "left",
  color: "#1D1F24",
  padding: "22px",
};

export default ComponentBody;
