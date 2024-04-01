import { Table, TableBody, TableRow } from "@mui/material";

import ProjectsTableHeader from "@/components/projectsTable/ProjectsTableHeader";
import ProjectsTableItem from "@/components/projectsTable/ProjectsTableItem";
import TablePagination from "@/components/tableMembers/tablePagination";

import usePagination from "@/hooks/usePagination";
import { useBoundStore } from "../../stores";

const username = "John Doe";

const ProjectsTable = () => {
  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    usePagination({});

  const { projectsData } = useBoundStore();
  const totalProjects = projectsData?.length;

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
          {projectsData.length > 0 &&
            projectsData
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
        data={projectsData}
      />
    </Table>
  );
};
export default ProjectsTable;
