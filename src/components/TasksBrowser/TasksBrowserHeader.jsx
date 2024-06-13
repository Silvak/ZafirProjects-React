import TasksBrowserSearch from './TasksBrowserSearch';
import { Box, Typography } from '@mui/material';

const TasksBrowserHeader = () => {
  return (
    <Box>
      <Box>
        <Typography variant='h2'>Tasks</Typography>
      </Box>
      <TasksBrowserSearch />
    </Box>
  );
};
export default TasksBrowserHeader;
