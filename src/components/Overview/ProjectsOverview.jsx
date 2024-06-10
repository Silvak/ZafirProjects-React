import EastIcon from "@mui/icons-material/East";
import {
  Box,
  Grid,
  Table,
  TableBody,
  TableRow,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import ProjectItemsOverview from "./ProjectItemsOverview";
import { useProjectsOverview } from "@/hooks/useProjectsOverview";
import EditProjectForm from "@/components/forms/EditProjectForm";

function ProjectsOverview() {
  const { projectsData, handleEdit, handleDelete, isMobile, theme } =
    useProjectsOverview();

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: "#ffffff",
          height: "auto",
          width: "100%",
          height: "100%",
          borderRadius: "20px",
          padding: "20px 0px",
          maxHeight: "572px",
          overflow: "hidden",
        }}
      >
        <Grid
          sx={{
            display: isMobile ? "flex" : "flex",
            justifyContent: "space-between",
            padding: "0px 20px 20px 20px",
          }}
        >
          <Grid item>
            <Typography
              sx={{ fontSize: "20px", fontWeight: 500, fontFamily: "Poppins" }}
            >
              Projects
            </Typography>
          </Grid>

          <Grid item>
            <NavLink
              to="/projects"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                fontWeight: 600,
                color: "#7662EA",
              }}
            >
              View all
              <EastIcon xs sx={{ marginLeft: "6px" }} />
            </NavLink>
          </Grid>
        </Grid>

        <Table
          sx={{
            background: "#FFFFFF",
            display: "block",
            padding: "0px 20px",
            borderBottom: "none",
            width: "100%",
            overflowX: "hidden",
            height: "482px",
          }}
        >
          <TableBody sx={{ display: "grid" }}>
            <TableRow
              sx={{
                display: "flex",
                flexDirection: "column",
                overflowX: "auto",
                borderBottom: "none",
                "&>*": {
                  borderBottom: "none",
                  width: "100%",
                },
                gap: "20px",
              }}
            >
              {projectsData.length === 0 ? (
                <strong
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  No Projects
                </strong>
              ) : (
                projectsData.map((project) => (
                  <ProjectItemsOverview
                    handleDelete={handleDelete}
                    handleEdit={() =>
                      handleEdit(<EditProjectForm project={project} />)
                    }
                    {...project}
                    key={project._id}
                  />
                ))
              )}
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </ThemeProvider>
  );
}

export default ProjectsOverview;
