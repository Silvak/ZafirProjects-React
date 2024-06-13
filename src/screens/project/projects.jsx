import { Container, Box, Typography, Grid, Button } from '@mui/material';
import ProjectsTable from '@/components/projectsTable/ProjectsTable';
import MyProjectsTable from '../../components/projectsTable/MyProjectsTable';
import { useBoundStore } from '../../stores';
import AddIcon from '@mui/icons-material/Add';
import { shallow } from 'zustand/shallow';
import CreateProjectForm from '@/components/forms/CreateProjectForm';

const projects = () => {
  const {
    ChangeStateModal,
    ChangeContentModal,
    ChangeTitleModal,
    projectsData,
  } = useBoundStore((state) => state, shallow);

  const handleCreate = () => {
    ChangeTitleModal('Add Project');
    ChangeContentModal(<CreateProjectForm />);
    ChangeStateModal(true);
  };

  return (
    <Box
      sx={{
        padding: '50px 0',
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: '70px',
        }}
      >
        <Typography variant="h2">
          All Projects: {projectsData.length}
        </Typography>
        <Grid>
          <Button
            onClick={handleCreate}
            sx={{
              textTransform: 'none',
              color: 'white',
              backgroundColor: '#7662EA',
              height: '40px',
              minWidth: 'max-content',
              borderRadius: '12px',
              fontSize: '13px',
              fontWeight: 500,
              fontFamily: 'Poppins',
              '&:hover': { backgroundColor: 'black' },
            }}
          >
            <AddIcon sx={{ marginRight: '10px' }} />
            Create new
          </Button>
        </Grid>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <MyProjectsTable />
        <ProjectsTable />
      </Box>
    </Box>
  );
};
export default projects;
