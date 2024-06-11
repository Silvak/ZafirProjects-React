import FilterSelect from '@/components/Selects/FilterSelect';
import {
  Grid,
  ThemeProvider,
  Typography,
  createTheme,
  useMediaQuery,
  Tooltip,
} from '@mui/material';
import { useEffect, useState, Suspense } from 'react';
import { useBoundStore } from '../../stores/index';
import { shallow } from 'zustand/shallow';

import MyTaskList from './MyTaskList';
import { isInThisWeek, isInThisMonth, isToday } from '../../hooks/useDates';

const filtersData = [
  { id: 1, label: 'All', value: 'All' },
  { id: 4, label: 'This week', value: 'This week' },
  { id: 2, label: 'This month', value: 'This month' },
  { id: 3, label: 'Today', value: 'Today' },
];

function MyTask() {
  const { myTasks, selectedProject, User, fetchTasksById } = useBoundStore(
    (state) => state,
    shallow
  );
  const theme = createTheme();
  const [filterOption, setFilterOption] = useState('All');

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const handleFilter = (event) => {
    setFilterOption(event.target.value);
  };

  useEffect(() => {
    if (User) {
      const fetchData = async () => {
        try {
          await fetchTasksById(selectedProject._id);
          // await fetchTasksByUser(User.uid);
        } catch (error) {
          console.error('Error fetching tasks', error);
        }
      };
      fetchData();
    }
  }, []);

  const filteredTasks = Array.isArray(myTasks)
    ? myTasks.filter((task) => {
        const taskDate = new Date(task.start);
        switch (filterOption) {
          case 'This week':
            return isInThisWeek(taskDate);
          case 'This month':
            return isInThisMonth(taskDate);
          case 'Today':
            return isToday(taskDate);
          case 'All':
          default:
            return true;
        }
      })
    : [];

  return (
    <ThemeProvider theme={theme}>
      <Grid
        sx={{
          backgroundColor: '#ffffff',
          height: '572px',
          borderRadius: '20px',
          padding: '20px 0px',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          overflow: 'hidden',
        }}
      >
        {/* My Task Header */}
        <Grid
          item
          sx={{
            display: isMobile ? 'inline-table' : 'flex',
            justifyContent: 'space-between',
            padding: '0px 20px',
            marginBottom: '8px',
            alignItems: 'center',
          }}
        >
          <Grid item>
            <Typography
              sx={{ fontSize: '20px', fontWeight: 600, color: '#1D1F24' }}
            >
              My Tasks -{' '}
              {selectedProject ? (
                <span style={{ color: '#6B6E75' }}>
                  {' '}
                  {selectedProject.name}
                </span>
              ) : (
                ''
              )}
            </Typography>
          </Grid>

          {/* Select Filter */}
          <Grid item>
            <Tooltip title="Filter">
              <select
                value={filterOption}
                onChange={handleFilter}
                style={{
                  border: 'none',
                  outline: ' 1px solid #E0E3E8',
                  background: 'white',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  padding: '8px 16px',
                  height: '40px',
                }}
              >
                {filtersData.map((filter) => (
                  <option value={filter.value} key={filter.id}>
                    {filter.label}
                  </option>
                ))}
              </select>
            </Tooltip>
          </Grid>
        </Grid>

        {/* Task list */}
        <div
          style={{
            overflowX: 'hidden',
          }}
        >
          <Suspense fallback={<div>Loading...</div>}>
            <MyTaskList
              tasks={filteredTasks}
              handleAddTask={() => handleAddTask('', '')}
            />
          </Suspense>
        </div>
      </Grid>
    </ThemeProvider>
  );
}

export default MyTask;
