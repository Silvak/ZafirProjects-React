import { Container, Typography } from "@mui/material";
import ProjectsTable from "@/components/projectsTable/ProjectsTable";

const projects = () => {
  return (
    <Container sx={{ px: 0, pt: "20px", w: "100%" }}>
      <Typography variant="h2">All Projects</Typography>
      <ProjectsTable />
    </Container>
  );
};
export default projects;
