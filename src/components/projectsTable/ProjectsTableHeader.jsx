import {
  TableHead,
  TableCell,
  Select,
  MenuItem,
  TableRow,
  Box,
  Typography,
  Tooltip,
  Toolbar,
} from "@mui/material";
import { useState } from "react";

const filtersData = [
  { id: 1, label: "This week", value: "week" },
  { id: 2, label: "This month", value: "month" },
  { id: 3, label: "This year", value: "year" },
];

const ProjectsTableHeader = ({ totalProjects }) => {
  const [filter, setFilter] = useState("");

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    alert("filtrando");
  };

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
      <Tooltip>
        <select
          value={filter}
          onChange={handleFilterChange}
          style={{
            padding: "15px",
            border: "none",
            outline: " 1px solid #E0E3E8",
            background: "none",
            borderRadius: "8px",
          }}
        >
          {filtersData.map((filter) => (
            <option value={filter.value} key={filter.id}>
              {filter.label}
            </option>
          ))}
        </select>
      </Tooltip>
    </Toolbar>
  );
};
export default ProjectsTableHeader;
