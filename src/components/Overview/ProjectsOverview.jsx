import { useState } from "react";
import { projectsData } from "../../mockData/projectsData";
import ProjectsTableItem from "@/components/projectsTable/ProjectsTableItem";
import EastIcon from '@mui/icons-material/East';
import EditProjectForm from "../forms/EditProjectForm";
import {
  Typography,
  Grid,
  Box,
  ThemeProvider,
  createTheme,
  Table,
  TableBody,
  TableRow,
  useMediaQuery,
} from "@mui/material";
import { useBoundStore } from "../../stores";
import { NavLink } from "react-router-dom";
import ProjectItemsOverview from "./ProjectItemsOverview";

function ProjectsOverview() {
  const theme = createTheme();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const { ChangeStateModal, ChangeContentModal, ChangeTitleModal } = useBoundStore();
  const handleEdit = () => {
    ChangeTitleModal("Edit Project");
    ChangeContentModal(<EditProjectForm />);
    ChangeStateModal(true);
  }
  


  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: "#ffffff",
          height: "auto",
          // width: "360px",
          borderRadius: "20px",
          // minWidth: "360px",
        }}
      >
        <Grid
          sx={{
            display: isMobile ? "flex" : "flex",
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
                marginRight: "30px",
                marginLeft: isMobile ? "30px" : "",
                backgroundColor: isMobile ? "#ECE9FF" : ""
            }}
          >
            <NavLink to="/projects" style={{ textDecoration: "none", display: "flex", fontFamily: "Poppins" }}>
              View all
              <EastIcon xs sx={{marginLeft: "6px"}}/>
            </NavLink>
          </Grid>
        </Grid>
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
                    handleEdit={handleEdit}
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
