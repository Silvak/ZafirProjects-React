import React, { useState } from "react";
import { Grid, Paper, Typography, useMediaQuery } from "@mui/material";
import FirstRow from "./content/FirstRow";
import AvatarsGroup from "./content/AvatarsGroup";
import ReportTasks from "./content/ReportTasks";
import PieChart from "./content/PieChart";
import TaskByProject from "./content/TaskByProject";
import TaskByProjectRow from "./content/TaskByProjectRow";
import UpcomingTask from "./content/UpcomingTask";
import { useBoundStore } from "../../stores/index";

function ComponentBody() {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [projectSelected, setProjectSelected] = useState(null);
  const { projectsData } = useBoundStore();

  return (
    <Grid container spacing={4} sx={{ mt: 2, paddingX: 2 }}>
      {/* Primera fila */}
      <Grid item xs={12}>
        <Paper style={paperStyle}>
          <Typography sx={titleStyle}>Project report glance</Typography>
          {/* Contenido para la primera fila */}
          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: isMobile ? "center" : "space-between",
              alignItems: "center",
            }}
          >
            <FirstRow
              setProjectSelected={setProjectSelected}
              projectsData={projectsData}
            />
            <AvatarsGroup
              projectSelected={projectSelected}
              projectsData={projectsData}
            />
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
              {/* Contenido para el primer paper en la segunda fila */}

              <PieChart />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper style={paperStyle}>
              <Typography sx={titleStyle}>Task by project</Typography>
              {/* Contenido para el segundo paper en la segunda fila */}
              <TaskByProject />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      {/* Tercera fila */}
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Paper style={paperStyle}>
              <Typography sx={titleStyle}>Upcoming tasks by asignee</Typography>
              {/* Contenido para el primer paper en la tercera fila */}
              <UpcomingTask />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper style={paperStyle}>
              <Typography sx={titleStyle}>Project performance</Typography>
              {/* Contenido para el segundo paper en la tercera fila */}
              <TaskByProjectRow />
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
