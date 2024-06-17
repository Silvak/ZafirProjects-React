import { useState } from 'react';
import FilterSelect from '@/components/Selects/FilterSelect';
import { Toolbar, Typography } from '@mui/material';

const filtersData = [
  { id: 0, label: 'All', value: 'all' },
  { id: 1, label: 'This week', value: 'week' },
  { id: 2, label: 'This month', value: 'month' },
  { id: 3, label: 'Today', value: 'today' },
];

const ProjectsTableHeader = ({
  totalProjects,
  dateProjects,
  setDateProjects,
  dateMyProjects,
  setDateMyProjects,
  accordion,
}) => {
  return (
    <Toolbar
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: '20px',
      }}
    >
      <Typography variant="h6" fontSize={18}>
        {totalProjects} projects
      </Typography>
      <FilterSelect
        data={filtersData}
        padding="10px"
        value={accordion === 1 ? dateMyProjects : dateProjects}
        setter={accordion === 1 ? setDateMyProjects : setDateProjects}
      />
    </Toolbar>
  );
};
export default ProjectsTableHeader;
