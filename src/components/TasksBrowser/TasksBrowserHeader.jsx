import TasksBrowserSearch from "./TasksBrowserSearch";
import { Box, Typography } from "@mui/material";

const TasksBrowserHeader = ({ searchTerm, setSearchTerm }) => {
  return (
    <Box>
      <Box>
        <Typography variant="h2">Tasks</Typography>
      </Box>
      <TasksBrowserSearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
    </Box>
  );
};
export default TasksBrowserHeader;
