import React, { useState, useEffect } from 'react';
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
  const [dateMyProjects, setDateMyProjects] = useState('all');
  const accordion = 1;

  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    usePagination({});
  const { leaderProjects, projectsData, stateAccordion1, setStateAccordion1 } =
    useBoundStore((state) => state, shallow);

  const [filteredProjects, setFilteredProjects] = useState(leaderProjects);
  const totalProjects = leaderProjects?.length;

  useEffect(() => {
    const filterProjectsByDate = () => {
      const now = new Date();
      let filtered = leaderProjects;

      if (dateMyProjects === 'today') {
        filtered = leaderProjects.filter((project) => {
          const projectDate = new Date(project.start);
          return projectDate.toDateString() === now.toDateString();
        });
      } else if (dateMyProjects === 'week') {
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(endOfWeek.getDate() + 6);
        filtered = leaderProjects.filter((project) => {
          const projectDate = new Date(project.start);
          return projectDate >= startOfWeek && projectDate <= endOfWeek;
        });
      } else if (dateMyProjects === 'month') {
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        filtered = leaderProjects.filter((project) => {
          const projectDate = new Date(project.start);
          return projectDate >= startOfMonth && projectDate <= endOfMonth;
        });
      }

      setFilteredProjects(filtered);
    };

    filterProjectsByDate();
  }, [dateMyProjects, leaderProjects]);

  return (
    <Accordion
      elevation={1}
      style={{ backgroundColor: 'white', borderRadius: '12px' }}
      expanded={stateAccordion1}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel${accordion}-content`}
        id={`panel${accordion}-header`}
        onClick={() => setStateAccordion1(!stateAccordion1)}
      >
        <Typography variant="h6" fontWeight={600}>
          My Projects
        </Typography>
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
          <ProjectsTableHeader
            totalProjects={filteredProjects.length}
            dateMyProjects={dateMyProjects}
            setDateMyProjects={setDateMyProjects}
            accordion={accordion}
          />
          <TableBody sx={{ display: 'grid' }}>
            {filteredProjects.length > 0 &&
              filteredProjects
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
            data={filteredProjects}
          />
        </Table>
      </AccordionDetails>
    </Accordion>
  );
};

export default MyProjectsTable;
