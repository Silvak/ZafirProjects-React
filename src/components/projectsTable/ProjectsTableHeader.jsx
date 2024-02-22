import FilterSelect from "@/components/Selects/FilterSelect";
import { Toolbar, Typography } from "@mui/material";

const filtersData = [
  { id: 1, label: "This week", value: "week" },
  { id: 2, label: "This month", value: "month" },
  { id: 3, label: "Today", value: "today" },
];

const ProjectsTableHeader = ({ totalProjects }) => {
  return (
    <Toolbar
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mb: "20px",
      }}
    >
      <Typography variant="h2">{totalProjects} projects</Typography>
      <FilterSelect data={filtersData} padding="10px" />
    </Toolbar>
  );
};
export default ProjectsTableHeader;
