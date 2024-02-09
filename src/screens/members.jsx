import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import { membersData } from "../mockData/membersData";
import useMediaQuery from "@mui/material/useMediaQuery";
import TableHeader from "../components/tableMembers/tableHeader.jsx";
import TableRowComponent from "../components/tableMembers/tableRow.jsx";
import TablePagination from "../components/tableMembers/tablePagination.jsx";
import Button from '@mui/material/Button';

const columns = [
  { id: "photo", label: "", minWidth: 0 },
  { id: "name", label: "Name", minWidth: 0 },
  { id: "phoneNumber", label: "Phone", minWidth: 0 },
  { id: "mail", label: "Email", minWidth: 0 },
  { id: "project", label: "Project", minWidth: 100 },
  { id: "ledStatus", label: "Lead Status", minWidth: 0 },
  { id: "leadOwner", label: "Lead Owner", minWidth: 0 },
  {id: "action", label: "Lead Owner", minWidth: 50 },
];

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      maxWidth: "75vw",
    },
  },
  container: {
    overflowY: "auto",
  },
}));

const MembersTable = () => {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState([]);
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleRowClick = (rowName) => {
    const selectedIndex = selectedRows.indexOf(rowName);
    let newSelected = [];
  
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedRows, rowName);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedRows.slice(1));
    } else if (selectedIndex === selectedRows.length - 1) {
      newSelected = newSelected.concat(selectedRows.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedRows.slice(0, selectedIndex),
        selectedRows.slice(selectedIndex + 1)
      );
    }
  
    setSelectedRows(newSelected);
  };
  

  const isSelected = (rowName) => selectedRows.indexOf(rowName) !== -1;

  return (
    <div style={{ backgroundColor: "#ECEFF3" }}>
      <div style={{display:"flex", justifyContent:"space-between", textAlign:"center", alignItems:"center", marginInline:"1rem"}}>
        <h6
          style={{
            fontWeight: "bold",
            fontSize: "24px",
            marginBottom: "2rem",
            marginTop: "2rem",
          }}
        >
          Equipo
        </h6>
        <Button variant="contained" sx={{ padding:"0.6rem", height:"min-content", borderRadius:"12px"}}>+ Add new contact</Button>
      </div>
      <Paper className={classes.root} style={{ borderRadius: "16px" }}>
        <TableContainer className={classes.container } >
          <Table stickyHeader aria-label="sticky table"  >
            <TableHeader
              isMobile={isMobile}
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows}
              membersData={membersData}
              columns={columns}
            />
            <TableBody>
              {membersData
                .slice(
                  (page - 1) * rowsPerPage,
                  (page - 1) * rowsPerPage + rowsPerPage
                )
                .map((row) => (
                  <TableRowComponent
                    key={row.name}
                    isMobile={isMobile}
                    handleRowClick={handleRowClick}
                    handleCheckboxClick={handleRowClick}
                    row={row}
                    isSelected={isSelected}
                    columns={columns}
                  />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <TablePagination
        rowsPerPage={rowsPerPage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        page={page}
        handleChangePage={handleChangePage}
        membersData={membersData}
      />
    </div>
  );
};

export default MembersTable;
