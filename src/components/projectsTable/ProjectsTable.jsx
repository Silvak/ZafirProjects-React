import { Table, TableBody, TableCell, TableRow } from "@mui/material";

import ProjectsTableHeader from "./ProjectsTableHeader";
import { projectsData } from "../../mockData/projectsData";
import ProjectsTableItem from "./ProjectsTableItem";
import TablePagination from "../tableMembers/tablePagination";
import { useState } from "react";

const username = "John Doe";

const ProjectsTable = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const totalProjects = projectsData.length;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };
  return (
    <Table
      sx={{
        mt: "30px",
        background: "#FFFFFF",
        borderRadius: "20px",
        display: "block",
        padding: "20px",
      }}
    >
      <ProjectsTableHeader totalProjects={totalProjects} />

      <TableBody sx={{ display: "grid" }}>
        <TableRow
          sx={{
            overflowX: "auto",
            "&>*": {
              borderBottom: "none",
              width: "max(900px, 100%)",
            },
          }}
        >
          {projectsData
            .slice(
              (page - 1) * rowsPerPage,
              (page - 1) * rowsPerPage + rowsPerPage
            )
            .map((project) => (
              <ProjectsTableItem
                {...project}
                key={project.id}
                username={username}
              />
            ))}
        </TableRow>
      </TableBody>

      <TablePagination
        rowsPerPage={rowsPerPage}
        page={page}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        membersData={projectsData}
      />
    </Table>
  );
};
export default ProjectsTable;
