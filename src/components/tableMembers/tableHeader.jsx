import React, { useEffect, useState } from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";

const TableHeader = ({
  isMobile,
  selectedRows,
  setSelectedRows,
  membersData,
  columns,
  filteredSearchData,
  searchTerm,
  setSearchTerm,
  selectedOption,
  setSelectedOption,
  filteredData,
}) => {
  const [leadOwners, setLeadOwners] = useState([]);

  useEffect(() => {
    const uniqueLeadOwners = [
      ...new Set(filteredData.map((member) => member.leadOwner)),
    ];
    setLeadOwners(uniqueLeadOwners.sort());
  }, [filteredData]);

  const headers = [
    {
      id: "",
      label: "",
    },
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
    alert("Apreté el botón de Filter");
  };

  return (
    <>
      <TableRow>
        <TableCell colSpan={columns.length + 1}>
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
                  {totalRows} Contacts
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
            <Grid item>
              <Grid container spacing={2} alignItems="center">
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
                      <Select
                        value={selectedOption}
                        onChange={(event) =>
                          setSelectedOption(event.target.value)
                        }
                        variant="outlined"
                        style={{
                          borderRadius: "12px",
                          width: "180px",
                          height: "44px",
                          border: "1px solid lightgray",
                        }}
                        MenuProps={{
                          PaperProps: {
                            style: {
                              borderTopLeftRadius: 0,
                              borderTopRightRadius: 0,
                              backgroundColor: "#fff",
                              marginTop: 2,
                              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
                            },
                          },
                        }}
                      >
                        <MenuItem
                          value="All"
                          style={{ fontSize: "12px", fontWeight: 600 }}
                          sx={{
                            "&:hover": {
                              backgroundColor: "lightgray",
                              color: "#000",
                            },
                          }}
                        >
                          All
                        </MenuItem>
                        {leadOwners.map((leadOwner, index) => (
                          <MenuItem
                            key={index}
                            value={leadOwner}
                            style={{ fontSize: "12px", fontWeight: 600 }}
                            sx={{
                              "&:hover": {
                                backgroundColor: "lightgray",
                                color: "#000",
                              },
                            }}
                          >
                            {leadOwner}
                          </MenuItem>
                        ))}
                      </Select>
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
                    : filteredSearchData.map((data) => data.member.name)
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
                // minWidth:
                //   header.id === "name"
                //     ? "10rem"
                //     : header.id === "phone"
                //     ? "8rem"
                //     : header.id === "lead_status"
                //     ? "15rem"
                //     : "5rem",
                // marginInline: "5rem",
                fontWeight: "bold",
                color: "gray",
                // textAlign: header.id === "name" ? "left" : "center",
              }}
            >
              {header.label}
            </TableCell>
          ))}
      </TableRow>
    </>
  );
};

export default TableHeader;
