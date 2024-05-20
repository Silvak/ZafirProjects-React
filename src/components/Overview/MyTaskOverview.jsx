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
import MyTaskList from './MyTaskList';
import { isInThisWeek, isInThisMonth, isToday } from '../../hooks/useDates';

const filtersData = [
  { id: 1, label: 'All', value: 'All' },
  { id: 4, label: 'This week', value: 'This week' },
  { id: 2, label: 'This month', value: 'This month' },
  { id: 3, label: 'Today', value: 'Today' },
];

function MyTask() {
  const {
    tasks,
    myTasks,
    fetchTasksById,
    addTask,
    fetchTasks,
    selectedProject,
  } = useBoundStore();
  const theme = createTheme();
  const [filterOption, setFilterOption] = useState('All');

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  // const workingTasks = tasks.filter(
  //   (task) => task.state !== "Pending" && task.state !== "Backlog"
  // );
  const handleFilter = (event) => {
    setFilterOption(event.target.value);
  };

  useEffect(() => {
    if (selectedProject) {
      const fetchData = async () => {
        try {
          await fetchTasksById(selectedProject._id);
        } catch (error) {
          console.error('Error fetching tasks', error);
        }
      };
      fetchData();
    }
  }, [selectedProject]);
  // console.log("CANTIDAD DE TASK: ", myTasks.length);

  const filteredTasks = myTasks.filter((task) => {
    const taskDate = new Date(task.start);
    switch (filterOption) {
      case 'This week':
        return isInThisWeek(taskDate);
      case 'This month':
        return isInThisMonth(taskDate);
      case 'Today':
        return isToday(taskDate);
      default:
        'All';
        return true; // Si la opción de filtro es "All", mostrar todas las tareas
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Grid
        sx={{
          backgroundColor: '#ffffff',
          height: '572px',
          borderRadius: '20px',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          overflow: '-moz-hidden-unscrollable',
          overflowX: 'hidden',
        }}
      >
        {/* My Task Header */}
        <Grid
          item
          sx={{
            display: isMobile ? 'inline-table' : 'flex',
            justifyContent: 'space-between',
            padding: '10px 30px',
            alignItems: 'center',
          }}
        >
          <Grid
            item
            sx={{
              marginLeft: '20px',
              marginBottom: '17px',
              marginTop: '22px',
            }}
          >
            <Typography
              sx={{ fontSize: '20px', fontWeight: 500, fontFamily: 'Poppins' }}
            >
              My Tasks
            </Typography>
          </Grid>
          {/* Select Filter */}
          <Grid item>
            <Tooltip title='Filter'>
              <select
                value={filterOption}
                onChange={handleFilter}
                style={{
                  border: 'none',
                  outline: ' 1px solid #808080',
                  background: 'white',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  padding: '10px',
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
        <Suspense fallback={<div>Loading...</div>}>
          <MyTaskList
            tasks={filteredTasks}
            handleAddTask={() => handleAddTask('', '')}
          />
        </Suspense>
      </Grid>
    </ThemeProvider>
  );
}

export default MyTask;
