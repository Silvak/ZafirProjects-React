import { Container, Box, Typography } from "@mui/material";
import ProjectsTable from "@/components/projectsTable/ProjectsTable";
import LayoutPage from "@/layout/layoutPage";

const projects = () => {
  return (
    <LayoutPage
      head={
        <Typography
          variant='p'
          style={{ fontSize: "24px", color: "#1D1F24", fontWeight: 600 }}
        >
          All Projects
        </Typography>
      }
    >
      <ProjectsTable />
    </LayoutPage>
  );
};
export default projects;
