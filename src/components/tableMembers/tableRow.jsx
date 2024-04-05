import React, { useState } from "react";
import { TableRow, TableCell, Grid } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";
import avatar from "@/assets/Img/png/defaultUser.png";
import { useBoundStore } from "@/stores/index";
import EditMember from "@/components/forms/EditMemberForm";
import "./styles.css";

const TableRowComponent = ({
  isMobile,
  handleRowClick,
  handleCheckboxClick,
  handleDeleteClick,
  row,
  isSelected,
  columns,
  setAllMemberData,
  allMemberData,
}) => {
  const isItemSelected = isSelected(row.member.name);
  const [deleteClicked, setDeleteClicked] = useState(false);
  const [editClicked, setEditClicked] = useState(false);
  const isExpanded = isMobile && isItemSelected;
  const { ChangeStateModal, ChangeTitleModal, ChangeContentModal } =
    useBoundStore();

  const openModal = (row) => {
    ChangeTitleModal("");
    ChangeContentModal(
      <EditMember
        row={row}
        setAllMemberData={setAllMemberData}
        allMemberData={allMemberData}
      />
    );
    ChangeStateModal(true);
  };

  return (
    <React.Fragment key={row.member._id}>
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
              onChange={() => handleCheckboxClick(row.member.name)}
              sx={{ color: "lightgray" }}
            />
          </TableCell>
        )}

        {columns.map((column, index) => {
          let cellContent = row.member[column.id];

          return (
            <TableCell
              key={index}
              align="left"
              style={{
                fontWeight: "bold",
                width: "auto",
                fontSize: "14px",
                padding: !isMobile ? "0px" : "12px",
                backgroundColor:
                  column.id === "lead_status" ? "cyan" : "inherit",
                cursor: column.id === "name" ? "pointer" : "inherit",
              }}
              onClick={
                column.id === "name"
                  ? () => handleRowClick(row.member.name)
                  : null
              }
            >
              {column.id === "project" && !isMobile && (
                <span style={{ marginLeft: 10 }}>{row.project}</span>
              )}

              {column.id === "action" && !isMobile && (
                <div>
                  <DeleteIcon
                    style={{
                      marginLeft: "24px",
                      cursor: "pointer",
                      color: deleteClicked ? "blue" : "inherit",
                      transition: "color 0.2s ease-in-out",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteClicked(true);
                      setTimeout(() => {
                        setDeleteClicked(false);
                        handleDeleteClick(row);
                      }, 200);
                    }}
                  />
                  <EditIcon
                    style={{
                      cursor: "pointer",
                      marginLeft: "10px",
                      color: editClicked ? "blue" : "inherit",
                      transition: "color 0.2s ease-in-out",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditClicked(true);
                      setTimeout(() => {
                        setEditClicked(false);
                        openModal(row);
                      }, 200);
                    }}
                  />
                </div>
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
                        width: 32,
                        marginRight: "10px",
                        borderRadius: "50%",
                      }}
                      src={avatar}
                    />
                  )}
                  {column.id === "leadOwner" && (
                    <img
                      style={{
                        width: 24,
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
                        {row.member["email"]}
                      </div>
                    )}
                  </div>
                </div>
              ) : !isMobile &&
                column.id !== "photo" &&
                column.id !== "email" ? (
                column.id === "rol" ? (
                  <span>{row.rolToProject}</span>
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
              {columns.map((column, index) => (
                <Grid item xs={12} sm={6} key={index}>
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
                        ) : column.label !== "Rol" ? (
                          <span style={{ fontWeight: "normal" }}>
                            {": " + row[column.id]}
                          </span>
                        ) : (
                          <span style={{ fontWeight: "normal" }}>
                            {": " + row.rolToProject}
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
