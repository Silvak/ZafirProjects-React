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
  const { projectsData, handleEdit, isMobile, theme } = useProjectsOverview();

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
          <Grid
            item
            sx={{
              marginTop: "26px",
              marginRight: "30px",
              marginLeft: isMobile ? "30px" : "",
              backgroundColor: isMobile ? "#ECE9FF" : "",
            }}
          >
            <NavLink
              to="/projects"
              style={{
                textDecoration: "none",
                display: "flex",
                fontFamily: "Poppins",
              }}
            >
              View all
              <EastIcon xs sx={{ marginLeft: "6px" }} />
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
              {projectsData.length === 0 ? (
                <p>Sin projectos</p>
              ) : (
                projectsData
                  .slice(0, 8)
                  .map((project) => (
                    <ProjectItemsOverview
                      handleEdit={() =>
                        handleEdit(<EditProjectForm project={project} />)
                      }
                      {...project}
                      key={project.id}
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
