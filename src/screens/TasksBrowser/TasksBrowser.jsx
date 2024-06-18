import TasksBrowserHeader from '@/components/TasksBrowser/TasksBrowserHeader';
import LayoutPage from '../../layout/layoutPage';
import useFormatText from '@/hooks/useFormatText';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Box,
  useMediaQuery,
  ThemeProvider,
  createTheme,
  Skeleton,
} from '@mui/material';
import { Circle } from '@mui/icons-material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';

import { formatDate } from '../../utils/fixDate';
import { priorityColors, statusColors } from '../../utils/colors';
import { useBoundStore } from '../../stores';
import { shallow } from 'zustand/shallow';
import { useEffect, useState } from 'react';

const TasksBrowser = () => {
  const { task_subtasks, selectedProject, fetchTasksWithSubtasks } =
    useBoundStore((state) => state, shallow);

  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const filteredSearchData = task_subtasks
    .filter((task) =>
      task?.taskName?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.taskName.localeCompare(b.taskName));

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (selectedProject && selectedProject._id) {
          await fetchTasksWithSubtasks(selectedProject._id);
        }
      } catch (error) {
        console.error('Error fetching tasks', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedProject]);

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const theme = createTheme();

  return (
    <LayoutPage
      head={
        <TasksBrowserHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      }
    >
      <ThemeProvider theme={theme}>
        {loading ? (
          <Box sx={{ width: '100%' }}>
            {[...Array(task_subtasks.length)].map((_, index) => (
              <Skeleton key={index} height={80} sx={{ mb: '-30px' }} />
            ))}
          </Box>
        ) : (
          filteredSearchData?.map((task) => (
            <Accordion key={task._id} sx={{ minWidth: '250px' }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Box
                  sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}
                >
                  <Typography variant="h6">
                    {useFormatText(task?.taskName)}
                  </Typography>
                  <Box>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      noWrap
                      sx={{
                        fontWeight: 600,
                        fontSize: '12px',
                        borderRadius: '8px',
                        padding: '4px 8px',
                        textAlign: 'center',
                        alignItems: 'center',
                        ...statusColors[task?.state],
                      }}
                    >
                      {task?.state}
                    </Typography>
                  </Box>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                {task?.subtasks?.length > 0 &&
                  task.subtasks.map((subtask) => (
                    <Box
                      key={subtask._id}
                      elevation={0}
                      sx={{
                        opacity: subtask.state === 'Completed' ? 1 : 1, // item opacity
                        borderRadius: '12px',
                        padding: '8px',
                        ':hover': { background: '#F6F7FA', cursor: 'default' },
                      }}
                    >
                      <Typography variant="h6" fontWeight="bold" noWrap>
                        <span style={{ fontSize: '14px', color: '#1D1F24' }}>
                          {subtask.name}
                        </span>
                      </Typography>
                      <Box
                        container
                        alignItems="center"
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        {!isMobile && (
                          <Box item sx={{ width: '80px' }}>
                            <Typography
                              variant="h6"
                              noWrap
                              style={{
                                fontSize: '12px',
                                fontWeight: 600,
                                padding: '2px 6px',
                                height: '20px',
                                borderRadius: '100px',
                                ...priorityColors[subtask.priority],
                              }}
                            >
                              <Circle
                                sx={{ fontSize: '10px', marginRight: '4px' }}
                              />
                              {subtask.priority}
                            </Typography>
                          </Box>
                        )}

                        <Box item>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            <div style={{ display: 'flex' }}>
                              <PeopleAltOutlinedIcon
                                sx={{
                                  mr: '5px',
                                  color: '#A3A5AB',
                                  fontSize: '18px',
                                }}
                              />
                              <Typography
                                variant="body1"
                                noWrap
                                style={{
                                  fontSize: '12px',
                                  fontWeight: 'bold',
                                }}
                              >
                                {subtask?.members_id?.length}
                              </Typography>
                            </div>
                          </div>
                        </Box>

                        <Box
                          item
                          sx={{
                            mt: 0,
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            <CalendarTodayIcon
                              style={{
                                color: '#A3A5AB',
                                fontSize: '18px',
                              }}
                            />
                            <Typography
                              variant="body1"
                              color="textSecondary"
                              noWrap
                              style={{
                                fontSize: '12px',
                                fontWeight: 400,
                                marginTop: '2px',
                                marginLeft: '10px',
                              }}
                            >
                              {formatDate(subtask.start)}
                            </Typography>
                          </div>
                        </Box>

                        <Box item>
                          <Typography
                            variant="body1"
                            color="textSecondary"
                            noWrap
                            sx={{
                              fontWeight: 600,
                              fontSize: '12px',
                              borderRadius: '8px',
                              padding: '4px 8px',
                              textAlign: 'center',
                              alignItems: 'center',
                              ...statusColors[subtask.state],
                            }}
                          >
                            {subtask.state}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  ))}
              </AccordionDetails>
            </Accordion>
          ))
        )}
      </ThemeProvider>
    </LayoutPage>
  );
};

export default TasksBrowser;
