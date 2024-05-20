import { Grid, useMediaQuery } from '@mui/material';
import TaskDetailContent from './TaskDetailContent';
import TaskDetailHeader from './TaskDetailHeader';
import TaskDetailSubstasks from './TaskDetailSubstasks';
import ChatMessage from '../chatSeccion/chat';
import { useBoundStore } from '../../stores';
import { useEffect, useState } from 'react';

const TaskDetail = ({ task }) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const { fetchTaskDetailsById, singleTask } = useBoundStore((state) => state);

  useEffect(() => {
    fetchTaskDetailsById(task._id);
  }, [task._id]);

  if (singleTask === null) {
    return <p>no details</p>;
  }

  return (
    <Grid
      container
      sx={{
        background: '#FFFF',
        margin: 0,
        height: '100vh',
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
          taskTitle={singleTask.taskName}
        />
        <TaskDetailContent task={singleTask} />
        <TaskDetailSubstasks taskId={singleTask._id} />
      </Grid>
      <Grid item xs={12} md={5}>
        <ChatMessage />
      </Grid>
    </Grid>
  );
};
export default TaskDetail;
