import { Container, Box, Typography } from '@mui/material';
import ProjectsTable from '@/components/projectsTable/ProjectsTable';

const projects = () => {
  return (
    <Box sx={{ padding: '50px 0', width: '100%' }}>
      <Typography variant='h2' sx={{ mb: '70px' }}>
        All Projects
      </Typography>
      <ProjectsTable />
    </Box>
  );
};
export default projects;
