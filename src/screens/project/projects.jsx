import { Container, Typography } from "@mui/material";
import ProjectsTable from "@/components/projectsTable/ProjectsTable";

const projects = () => {
  return (
    <Container sx={{ padding: "50px 0", width: "100%" }}>
      <Typography variant="h2">All Projects</Typography>
      <ProjectsTable />
    </Container>
  );
};
export default projects;
