import TasksBrowserHeader from '@/components/TasksBrowser/TasksBrowserHeader';
import LayoutPage from '../../layout/layoutPage';

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
import {
  AttachFile as AttachFileIcon,
  Circle,
  MarkUnreadChatAltOutlined as MarkUnreadChatAltOutlinedIcon,
} from '@mui/icons-material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';

import { formatDate } from '../../utils/fixDate';
import { priorityColors, statusColors } from '../../utils/colors';
import { useBoundStore } from '../../stores';
import { shallow } from 'zustand/shallow';
import { useEffect, useState } from 'react';

const TasksBrowser = () => {
  const {
    myTasks,
    subtasks,
    selectedProject,
    User,
    fetchTasksById,
    fetchTasksWithSubtasks,
  } = useBoundStore((state) => state, shallow);

  const [openedAccordionIds, setOpenedAccordionIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSearchData = myTasks
    .filter((task) =>
      task?.taskName?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.taskName.localeCompare(b.taskName)); //la ordenamos alfabéticamente

  useEffect(() => {
    if (User) {
      const fetchData = async () => {
        try {
          if (selectedProject && selectedProject._id) {
            await fetchTasksById(selectedProject._id);
          }
        } catch (error) {
          console.error('Error fetching tasks', error);
        }
      };
      fetchData();
    }
  }, []);

  const handleAccordionChange = (task) => (event, isExpanded) => {
    if (isExpanded) {
      //solo haremos el fetch si estoy abriendo un determinado acordión
      if (!openedAccordionIds.includes(task._id)) {
        fetchTasksWithSubtasks(task._id);
        setOpenedAccordionIds((prev) => [...prev, task._id]);
      }
    } else {
      setOpenedAccordionIds((prev) => prev.filter((id) => id !== task._id));
    }
  };

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const theme = createTheme();

  const handleClipIcon = () => {
    console.log('toqué el icono del clip en TasksBrowser');
  };

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
        {filteredSearchData?.map((task, index) => (
          <Accordion
            key={task.id}
            sx={{ minWidth: '250px' }}
            expanded={openedAccordionIds.includes(task._id)}
            onChange={handleAccordionChange(task)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <Typography variant="h6">{task?.taskName}</Typography>
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
              {subtasks?.length > 0 &&
                subtasks
                  .filter((subtask) => subtask.taskId === task._id)
                  .map((subtask) => (
                    <Box
                      key={subtask._id}
                      elevation={0}
                      sx={{
                        opacity: subtask.state === 'Completed' ? 1 : 1, // item opacity
                        borderRadius: '12px',
                        padding: '8px',
                        ':hover': { background: '#F6F7FA', cursor: 'pointer' },
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

                            {/* {!isMobile && (
                              <div
                                style={{
                                  display: 'flex',
                                  marginLeft: 10,
                                }}
                              >
                                <AttachFileIcon
                                  style={{
                                    cursor: 'pointer',
                                    color: '#A3A5AB',
                                    fontSize: '18px',
                                  }}
                                  onClick={handleClipIcon}
                                />
                                <Typography
                                  variant="body1"
                                  noWrap
                                  style={{
                                    fontSize: '12px',
                                    fontWeight: 'bold',
                                    marginRight: '1rem',
                                  }}
                                >
                                  {subtask?.attachment?.length || 'x'}
                                </Typography>
                              </div>
                            )} */}
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
        ))}
      </ThemeProvider>
    </LayoutPage>
  );
};
export default TasksBrowser;
