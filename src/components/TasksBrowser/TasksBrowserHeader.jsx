import TasksBrowserSearch from "./TasksBrowserSearch";
import { Box, Typography } from "@mui/material";

const TasksBrowserHeader = ({ searchTerm, setSearchTerm }) => {
  return (
    <Box>
      <Box>
        <h6
          style={{
            fontWeight: 500,
            fontSize: "24px",
          }}
        >
          Tasks
        </h6>
      </Box>
      <TasksBrowserSearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
    </Box>
  );
};
export default TasksBrowserHeader;
