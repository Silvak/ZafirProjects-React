import { Box, Grid, useMediaQuery } from '@mui/material';
import TaskDetailContent from './TaskDetailContent';
import TaskDetailHeader from './TaskDetailHeader';
import TaskDetailSubstasks from './TaskDetailSubstasks';
import ChatMessage from '../chatSeccion/chat';
import { useBoundStore } from '../../stores';
import { shallow } from 'zustand/shallow';
import { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';

const TaskDetail = ({
  task,
  projectId,
  isSubtask = false,
  setFilterSubtask,
}) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [loading, setLoading] = useState(true);
  const { fetchTaskDetailsById, singleTask, fetchSubtasks, fetchSubtasksById } =
    useBoundStore((state) => state, shallow);

  useEffect(() => {
    setLoading(true);
    fetchTaskDetailsById(task._id, false);
    fetchSubtasksById(task._id);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, [task._id]);

  return (
    <>
      {loading ? (
        <Box
          sx={{
            width: '95vw',
            height: '80vh',
            backgroundColor: 'white',
            display: 'grid',
            borderEndStartRadius: '16px',
            borderEndEndRadius: '16px',
            placeContent: 'center',
          }}
        >
          <Loader />
        </Box>
      ) : (
        <Grid
          container
          sx={{
            background: '#FFFF',
            margin: 0,
            height: '80vh',
            borderBottomRightRadius: '14px',
            borderBottomLeftRadius: '14px',
            width: '100%',
            '& > .MuiGrid-item': {
              padding: '0px',
            },
            '& > .MuiGrid-item:nth-of-type(1)': {
              padding: `10px  ${isMobile ? '10px' : '30px'}`,
            },
          }}
          spacing={4}
        >
          {!singleTask ? (
            <>
              <Grid
                item
                xs={12}
                md={7}
                sx={{
                  color: '#1D1F24',
                  height: '100%',
                  overflowY: isMobile ? 'none' : 'scroll',
                }}
              >
                <TaskDetailHeader
                  isSubtask={isSubtask}
                  taskId={task._id}
                  taskTitle={task.name}
                />
                <TaskDetailContent
                  task={task}
                  projectId={projectId}
                  isSubtask={isSubtask}
                  setFilterSubtask={setFilterSubtask}
                />
                {/* <TaskDetailSubstasks taskId={task._id} /> */}
              </Grid>
              <Grid item xs={12} md={5}>
                <ChatMessage />
              </Grid>
            </>
          ) : (
            <>
              <Grid
                item
                xs={12}
                md={7}
                sx={{
                  color: '#1D1F24',
                  height: '100%',
                  overflowY: isMobile ? 'none' : 'scroll',
                }}
              >
                <TaskDetailHeader
                  taskId={singleTask._id}
                  taskTitle={task?.name || singleTask?.taskName}
                  isSubtask={isSubtask}
                />
                <TaskDetailContent
                  setFilterSubtask={setFilterSubtask}
                  task={singleTask}
                  projectId={projectId}
                />
                {!isSubtask && <TaskDetailSubstasks taskId={singleTask._id} />}
              </Grid>
              <Grid item xs={12} md={5}>
                <ChatMessage />
              </Grid>
            </>
          )}
        </Grid>
      )}
    </>
  );
};
export default TaskDetail;
