import {
  Box,
  FormControl,
  List,
  NativeSelect,
  Typography,
} from "@mui/material";
import { projectsData } from "@/mockData/projectsData";

//components
import ProjectItem from "./ProjectItem";
//styles
import { tableStyles } from "./styles";

const total = 24;

const ProjectsTable = () => {
  return (
    <Box sx={tableStyles.container}>
      <Box sx={tableStyles.head}>
        <Typography variant="h6">{total} Projects</Typography>
        <FormControl sx={{ minWidth: 120 }} size="medium">
          <NativeSelect
            defaultValue={1}
            inputProps={{
              name: "filter",
              id: "uncontrolled-native",
            }}
          >
            <option value={1}>This week</option>
            <option value={2}>This month</option>
            <option value={3}>This year</option>
          </NativeSelect>
        </FormControl>
      </Box>
      {/* data */}
      <List sx={tableStyles.list}>
        {projectsData.map((item) => (
          <ProjectItem {...item} key={item.id} username={"John Doe"} />
        ))}
      </List>
    </Box>
  );
};
export default ProjectsTable;
