import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Table,
  TableBody,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import ProjectsTableHeader from '@/components/projectsTable/ProjectsTableHeader';
import ProjectsTableItem from '@/components/projectsTable/ProjectsTableItem';
import TablePagination from '@/components/tableMembers/tablePagination';

import usePagination from '@/hooks/usePagination';
import { useBoundStore } from '../../stores';
import { shallow } from 'zustand/shallow';

const MyProjectsTable = () => {
  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    usePagination({});
  const { leaderProjects, projectsData } = useBoundStore(
    (state) => state,
    shallow
  );

  const totalProjects = leaderProjects?.length;

  return (
    <Accordion style={{ backgroundColor: 'white', borderRadius: '20px' }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="h6">My Projects</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Table
          sx={{
            mt: '10px',
            background: '#FFFFFF',
            borderRadius: '20px',
            display: 'block',
            padding: '20px',
            width: '100%',
          }}
        >
          <ProjectsTableHeader totalProjects={totalProjects} />
          <TableBody sx={{ display: 'grid' }}>
            {leaderProjects.length > 0 &&
              leaderProjects
                .slice(
                  (page - 1) * rowsPerPage,
                  (page - 1) * rowsPerPage + rowsPerPage
                )
                .map((project) => (
                  <ProjectsTableItem key={project.id} project={project} />
                ))}
          </TableBody>
          <TablePagination
            rowsPerPage={rowsPerPage}
            page={page}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            data={leaderProjects}
          />
        </Table>
      </AccordionDetails>
    </Accordion>
  );
};
export default MyProjectsTable;
