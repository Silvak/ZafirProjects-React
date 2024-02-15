import { useState } from "react";
import { projectsData } from "../../mockData/projectsData";
import ProjectsTableItem from "@/components/projectsTable/ProjectsTableItem";
import {
  Typography,
  Grid,
  Box,
  ThemeProvider,
  createTheme,
  Table,
  TableBody,
  TableRow,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import ProjectItemsOverview from "./ProjectItemsOverview";

function ProjectsOverview() {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: "#ffffff",
          height: "572px",
          width: "360px",
          borderRadius: "20px",
          minWidth: "360px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Grid
            item
            sx={{
              marginLeft: "20px",
              marginTop: "22px",
            }}
          >
            <Typography
              sx={{ fontSize: "20px", fontWeight: 500, fontFamily: "Poppins" }}
            >
              Projects
            </Typography>
          </Grid>
          <Grid item
            sx={{
                marginTop: "26px",
                marginRight: "30px"
            }}
          >
            <NavLink to="/projects" style={{ textDecoration: "none" }}>
              View all
            </NavLink>
          </Grid>
        </Box>
        <Table
          sx={{
            mt: "10px",
            background: "#FFFFFF",
            borderRadius: "20px",
            display: "block",
            padding: "10px",
            borderBottom: "none",
          }}
        >

          <TableBody sx={{ display: "grid" }}>
            <TableRow
              sx={{
                overflowX: "auto",
                borderBottom: "none",
                "&>*": {
                  borderBottom: "none",
                  width: "max(900px, 100%)",
                },
              }}
            >
              {projectsData.map((project) => (
                  <ProjectItemsOverview
                    {...project}
                    key={project.id}
                  />
                ))}
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </ThemeProvider>
  );
}

export default ProjectsOverview;
