import React, { useState } from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import CircleIcon from "@mui/icons-material/Circle";
import avatar from "../../assets/Img/png/defaultUser.png";

import "./styles.css";

const TableRowComponent = ({
  isMobile,
  handleRowClick,
  handleCheckboxClick,
  handleDeleteClick,
  row,
  isSelected,
  columns,
}) => {
  const [deleteClicked, setDeleteClicked] = useState(false);
  const isItemSelected = isSelected(row.name);
  const isExpanded = isMobile && isItemSelected;

  return (
    <React.Fragment key={row.name}>
      <TableRow
        hover={!isMobile}
        style={{
          backgroundColor: isItemSelected ? "lightblue" : "inherit",
        }}
      >
        {!isMobile && (
          <TableCell className="checkbox-contact">
            <Checkbox
              checked={isItemSelected}
              onChange={() => handleCheckboxClick(row.name)}
              sx={{ color: "lightgray" }}
            />
          </TableCell>
        )}

        {columns.map((column) => {
          let cellContent = row[column.id];

          if (column.id === "ledStatus") {
            cellContent = (
              <div
                style={{
                  minWidth: "11rem",
                }}
              >
                <div
                  style={{
                    color:
                      row[column.id] === "Bad Timing"
                        ? "#F28C43"
                        : row[column.id] === "New"
                        ? "#7662EA"
                        : row[column.id] === "Contracted"
                        ? "#429482"
                        : row[column.id] === "Deal Unqualified"
                        ? "#E55D57"
                        : row[column.id] === "Good Timing"
                        ? "#2ECC71"
                        : row[column.id] === "Good"
                        ? "#2E86C1"
                        : "blue",
                    backgroundColor:
                      row[column.id] === "Bad Timing"
                        ? "#FDEEE3"
                        : row[column.id] === "New"
                        ? "#ECE9FF"
                        : row[column.id] === "Contracted"
                        ? "#E5F3DD"
                        : row[column.id] === "Deal Unqualified"
                        ? "#FFEBEA"
                        : row[column.id] === "Good Timing"
                        ? "#D5F5E3"
                        : row[column.id] === "Good"
                        ? "#D6EAF8"
                        : "cyan",

                    display: "inline-block",
                    borderRadius: "12px",
                    padding: "0.5rem 0.8rem",
                    fontSize: "14px",
                  }}
                >
                  <CircleIcon sx={{ fontSize: "13px", marginRight: "5px" }} />
                  <span>{row[column.id]}</span>
                </div>
              </div>
            );
          }

          return (
            <TableCell
              key={column.id}
              align="left"
              style={{
                fontWeight: "bold",
                width: "auto",
                fontSize: "14px",
                padding: !isMobile ? "0px" : "12px",
                backgroundColor:
                  column.id === "lead_status" ? "cyan" : "inherit",
              }}
              onClick={
                column.id === "name" ? () => handleRowClick(row.name) : null
              }
            >
              {column.id === "action" && !isMobile && (
                <DeleteIcon
                  style={{
                    marginLeft: "24px",
                    cursor: "pointer",
                    color: deleteClicked ? "blue" : "inherit",
                    transition: "color 0.2s ease-in-out",
                  }}
                  onMouseEnter="this.style.color='#0F0'"
                  onMouseOut="this.style.color='#00F'"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteClicked(true);
                    setTimeout(() => {
                      setDeleteClicked(false);
                      handleDeleteClick(row);
                    }, 200);
                  }}
                />
              )}
              {!isMobile &&
              (column.id === "name" || column.id === "leadOwner") ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {column.id === "name" && (
                    <img
                      style={{
                        width: "32px",
                        marginRight: "5px",
                        borderRadius: "50%",
                      }}
                      src={avatar}
                    />
                  )}
                  {column.id === "leadOwner" && (
                    <img
                      style={{
                        width: "32px",
                        marginRight: "5px",
                        borderRadius: "50%",
                      }}
                      src={avatar}
                    />
                  )}
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ flex: 1 }}>
                      {column.id === "name" ? cellContent : row["leadOwner"]}
                    </div>
                    {column.id === "name" && (
                      <div style={{ flex: 1, color: "gray" }}>
                        {row["email"]}
                      </div>
                    )}
                  </div>
                </div>
              ) : !isMobile &&
                column.id !== "photo" &&
                column.id !== "email" ? (
                column.id === "phone" ? (
                  <span>
                    ({row[column.id].substr(0, 3)}) {row[column.id].substr(3)}
                  </span>
                ) : (
                  cellContent
                )
              ) : column.id === "name" ? (
                <span
                  style={{
                    display: "flex",
                    minWidth: !isMobile ? "5rem" : "10rem",
                  }}
                >
                  {cellContent}
                </span>
              ) : (
                ""
              )}
            </TableCell>
          );
        })}
      </TableRow>
      {isExpanded && (
        <TableRow>
          <TableCell colSpan={6}>
            <Grid container spacing={1}>
              {columns.map((column) => (
                <Grid item xs={12} sm={6} key={column.id}>
                  <Typography
                    variant="body2"
                    component="div"
                    style={{
                      textAlign: "center",
                      marginRight: "20%",
                      fontWeight: "normal",
                    }}
                  >
                    <strong>{column.label !== "Name" && column.label} </strong>
                    {column.label !== "Name" && column.id !== "action" ? (
                      <React.Fragment>
                        {column.id === "photo" ? (
                          <img src={avatar} width="56px" alt="Photo" />
                        ) : (
                          <span style={{ fontWeight: "normal" }}>
                            {": " + row[column.id]}
                          </span>
                        )}
                      </React.Fragment>
                    ) : (
                      ""
                    )}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </TableCell>
        </TableRow>
      )}
    </React.Fragment>
  );
};

export default TableRowComponent;
