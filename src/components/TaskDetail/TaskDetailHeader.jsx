import { Box } from '@mui/material';

const TaskDetailHeader = ({ taskId, taskTitle }) => {
  return (
    <Box
      component="header"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <h2
        style={{
          fontSize: 'clamp(13px,2vw, 20px)',
          fontWeight: 'bold',
          textBalance: 'balance',
          paddingRight: 8,
        }}
      >
        {taskTitle}
      </h2>
      <Box
        sx={{
          background: '#E0E3E8',
          padding: '8px',
          borderRadius: '8px',
        }}
      >
        <span
          style={{ fontSize: 'clamp(10px,2vw, 12px)', textAlign: 'center' }}
        >
          {taskId}
        </span>
      </Box>
    </Box>
  );
};
export default TaskDetailHeader;
