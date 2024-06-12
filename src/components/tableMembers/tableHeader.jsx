import React, { useEffect, useState } from "react";

import { TableHead, TableRow, TableCell } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";

const columns = [
  { id: "photo", label: "" },
  { id: "name", label: "Name" },
  { id: "project", label: "Project" },
  { id: "rol", label: "Rol" },
  { id: "leadOwner", label: "Lead Owner" },
  { id: "action", label: "" },
];

const TableHeader = ({
  isMobile,
  selectedRows,
  setSelectedRows,
  membersData,
  // columns,
  filteredSearchData,
  searchTerm,
  setSearchTerm,
  selectedOption,
  setSelectedOption,
  filteredData,
}) => {
  const headers = [
    // {
    //   id: '',
    //   label: '',
    // },
    {
      id: "name",
      label: "NAME",
    },
    {
      id: "project",
      label: "PROJECT",
    },
    {
      id: "rol",
      label: "ROL",
    },
    {
      id: "lead_owner",
      label: "LEAD OWNER",
    },
    {
      id: "action",
      label: "ACTION",
    },
  ];

  const totalRows = filteredData.length;

  const handleFilterClick = () => {
    console.log("Apreté el botón de Filter");
  };

  return (
    <TableHead style={{ backgroundColor: "white" }}>
      <TableRow style={{ backgroundColor: "white" }}>
        <TableCell
          colSpan={columns.length + 1}
          style={{ backgroundColor: "white" }}
        >
          <Grid container justifyContent="space-between" alignItems="center">
            <div>
              <Grid item sx={{ textAlign: "center" }}>
                <h2
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    marginBottom: isMobile ? "8px" : "0px",
                  }}
                >
                  Members: {totalRows}
                </h2>
                {isMobile && (
                  <Grid style={{ position: "relative" }}>
                    <div style={{ position: "relative" }}>
                      <input
                        type="text"
                        placeholder="Search contact..."
                        style={{
                          height: "2.8rem",
                          width: "max-content",
                          borderRadius: "12px",
                          padding: "12px",
                          border: "1px solid lightgray",
                          fontSize: "14px",
                          fontFamily:
                            '"Poppins", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
                          paddingLeft: "40px",
                        }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <SearchIcon
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "10px",
                          transform: "translateY(-50%)",
                          color: "gray",
                        }}
                      />
                    </div>
                  </Grid>
                )}
              </Grid>
            </div>
            <Grid item style={{ backgroundColor: "white" }}>
              <Grid
                container
                spacing={2}
                alignItems="center"
                style={{ backgroundColor: "white" }}
              >
                {!isMobile && (
                  <>
                    <Grid item style={{ position: "relative" }}>
                      <div style={{ position: "relative" }}>
                        <input
                          type="text"
                          placeholder="Search contact..."
                          style={{
                            height: "2.8rem",
                            width: "max-content",
                            borderRadius: "12px",
                            padding: "12px",
                            border: "1px solid lightgray",
                            fontSize: "14px",
                            fontFamily:
                              '"Poppins", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
                            paddingLeft: "40px",
                          }}
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <SearchIcon
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "10px",
                            transform: "translateY(-50%)",
                            color: "gray",
                            cursor: "pointer",
                          }}
                        />
                      </div>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="outlined"
                        startIcon={<FilterListIcon />}
                        style={{
                          backgroundColor: "white",
                          color: "black",
                          border: "1px solid lightgray",
                          borderRadius: "12px",
                        }}
                        onClick={handleFilterClick}
                      >
                        Filter
                      </Button>
                    </Grid>
                  </>
                )}
              </Grid>
            </Grid>
          </Grid>
        </TableCell>
      </TableRow>
      <TableRow>
        {!isMobile && (
          <TableCell style={{ width: "5px" }}>
            <Checkbox
              style={{
                color: "lightgray",
                width: "min-content",
              }}
              indeterminate={
                selectedRows.length > 0 &&
                selectedRows.length < filteredSearchData.length
              }
              checked={selectedRows.length === filteredSearchData.length}
              onChange={() =>
                setSelectedRows(
                  selectedRows.length === filteredSearchData.length
                    ? []
                    : filteredSearchData.map((data) => data.name)
                )
              }
            />
          </TableCell>
        )}
        {!isMobile &&
          headers.map((header) => (
            <TableCell
              key={header.id}
              align="left"
              style={{
                fontWeight: "bold",
                color: "gray",
              }}
            >
              {header.label}
            </TableCell>
          ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
