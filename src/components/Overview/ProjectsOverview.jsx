import EastIcon from '@mui/icons-material/East';
import {
  Box,
  Grid,
  Table,
  TableBody,
  TableRow,
  ThemeProvider,
  Typography,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import ProjectItemsOverview from './ProjectItemsOverview';
import { useProjectsOverview } from '@/hooks/useProjectsOverview';
import EditProjectForm from '@/components/forms/EditProjectForm';

function ProjectsOverview() {
  const { projectsData, handleEdit, handleDelete, isMobile, theme } =
    useProjectsOverview();

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: '#ffffff',
          height: 'auto',
          width: '100%',
          borderRadius: '20px',
        }}
      >
        <Grid
          sx={{
            display: isMobile ? 'flex' : 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Grid
            item
            sx={{
              marginLeft: '20px',
              marginTop: '22px',
            }}
          >
            <Typography
              sx={{ fontSize: '20px', fontWeight: 500, fontFamily: 'Poppins' }}
            >
              Projects
            </Typography>
          </Grid>
          <Grid
            item
            sx={{
              marginTop: '26px',
              marginRight: '30px',
              marginLeft: isMobile ? '30px' : '',
            }}
          >
            <NavLink
              to="/projects"
              style={{
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                fontFamily: 'Poppins',
              }}
            >
              View all
              <EastIcon xs sx={{ marginLeft: '6px' }} />
            </NavLink>
          </Grid>
        </Grid>
        <Table
          sx={{
            mt: '10px',
            background: '#FFFFFF',
            borderRadius: '20px',
            display: 'block',
            padding: '10px',
            borderBottom: 'none',
            width: '100%',
          }}
        >
          <TableBody sx={{ display: 'grid' }}>
            <TableRow
              sx={{
                overflowX: 'auto',
                borderBottom: 'none',
                '&>*': {
                  borderBottom: 'none',
                  width: '100%',
                },
              }}
            >
              {projectsData.length === 0 ? (
                <strong
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                  }}
                >
                  No Projects
                </strong>
              ) : (
                projectsData
                  .slice(0, 6)
                  .map((project) => (
                    <ProjectItemsOverview
                      handleDelete={handleDelete}
                      handleEdit={() =>
                        handleEdit(<EditProjectForm project={project} />)
                      }
                      {...project}
                      project={project}
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
