import React, { useState } from "react";
import {
  TableRow,
  TableCell,
  Grid,
  Avatar,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";
import avatar from "@/assets/Img/png/defaultUser.png";
import { useBoundStore } from "@/stores/index";
import { shallow } from "zustand/shallow";
import useFormatText from "@/hooks/useFormatText";
import EditMember from "@/components/forms/EditMemberForm";
import "./styles.css";

const columns = [
  // { id: "photo", label: "" },
  { id: "name", label: "Name" },
  { id: "project", label: "Project" },
  { id: "rol", label: "Rol" },
  { id: "leadOwner", label: "Lead Owner" },
  { id: "action", label: "" },
];

const TableRowComponent = ({
  isMobile,
  handleDeleteClick,
  row,
  isSelected,
  setAllMemberData,
  allMemberData,
}) => {
  const isItemSelected = isSelected(row?.name);
  const [deleteClicked, setDeleteClicked] = useState(false);
  const [editClicked, setEditClicked] = useState(false);
  const isExpanded = isMobile && isItemSelected;
  const { ChangeStateModal, ChangeTitleModal, ChangeContentModal } =
    useBoundStore((state) => state, shallow);

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
    <React.Fragment key={row?._id?._id}>
      <TableRow hover={!isMobile}>
        {!isMobile && (
          <TableCell className="checkbox-contact">
            <Checkbox sx={{ color: "lightgray" }} />
          </TableCell>
        )}

        {columns.length > 0 &&
          row &&
          columns.map((column) => {
            let cellContent = row[column.id];

            return (
              <TableCell
                key={column.id}
                align="left"
                style={{
                  fontWeight: "normal",
                  width: "auto",
                  fontSize: "14px",
                  padding: !isMobile ? "0px" : "12px",
                }}
              >
                {column.id === "action" && !isMobile && (
                  <div style={{ marginTop: "20%" }}>
                    <Tooltip title="Delete member">
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
                    </Tooltip>
                    <Tooltip title="Edit member">
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
                    </Tooltip>
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
                    {column.id === "name" &&
                      (row._id ? (
                        <Avatar
                          sx={{
                            borderRadius: "50%",
                            bgcolor: `${row && row._id?.colorbg}`,
                            color: `${row && row._id?.colorText}`,
                          }}
                        >
                          {row._id.name && row._id.name.split(" ")[0]?.[0]}
                          {row._id.name &&
                            row._id.name.split(" ").length > 1 &&
                            row._id.name.split(" ")[1]?.[0]}
                        </Avatar>
                      ) : (
                        <CircularProgress
                          style={{ color: "#C02327" }}
                          sx={{ m: 2 }}
                          size="32px"
                        />
                      ))}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginLeft: "10px",
                      }}
                    >
                      <div
                        style={{
                          flex: 1,
                          color: "#1D1F24",
                          fontWeight: 500,
                          fontFamily: "Poppins",
                          fontSize: 14,
                        }}
                      >
                        {column.id === "name" ? (
                          useFormatText(row._id.name)
                        ) : (
                          <Tooltip title={row?.leadOwner}>
                            <div
                              style={{
                                // marginLeft: 20,
                                display: "flex", //
                                alignItems: "center", //
                                gap: 10, //
                              }}
                            >
                              <Avatar
                                sx={{
                                  borderRadius: "50%",
                                  bgcolor: "lightgray",
                                  color: "white",
                                  border: "1px solid darkgray",
                                }}
                              >
                                {row.leadOwner &&
                                  row.leadOwner.split(" ")[0]?.[0]}
                                {row.leadOwner &&
                                  row.leadOwner.split(" ").length > 0 &&
                                  row.leadOwner.split(" ")[1]?.[0]}
                              </Avatar>
                              <span
                                style={{
                                  color: "#1D1F24",
                                  fontWeight: 500,
                                  fontFamily: "Poppins",
                                  fontSize: 14,
                                }}
                              >
                                {row.leadOwner}
                              </span>
                            </div>
                          </Tooltip>
                        )}
                      </div>
                      {column.id === "name" && (
                        <div
                          style={{
                            flex: 1,
                            color: "gray",
                            fontFamily: "Poppins",
                            fontWeight: "400px",
                            fontSize: "12px",
                          }}
                        >
                          {row._id.email}
                        </div>
                      )}
                    </div>
                  </div>
                ) : !isMobile &&
                  column.id !== "photo" &&
                  column.id !== "email" ? (
                  column.id === "rol" ? (
                    <span
                      style={{
                        marginLeft: 5,
                        color: "grey",
                        fontWeight: 500,
                        fontFamily: "Poppins",
                        fontSize: 14,
                      }}
                    >
                      {row.rolToProject}
                    </span>
                  ) : (
                    <span
                      style={{
                        marginLeft: 10,
                        color: "#1D1F24",
                        fontWeight: 500,
                        fontFamily: "Poppins",
                        fontSize: 14,
                      }}
                    >
                      {useFormatText(cellContent)}
                    </span>
                  )
                ) : (
                  column.id === "name" && ""
                )}
              </TableCell>
            );
          })}
      </TableRow>
      {isExpanded && (
        <TableRow>
          <TableCell colSpan={5}>
            <Grid container spacing={1}>
              {columns.map((column, index) => (
                <Grid item xs={10} sm={5} key={index}>
                  <Typography
                    variant="body2"
                    component="div"
                    style={{
                      textAlign: "center",
                      marginRight: "20%",
                      fontWeight: "normal",
                    }}
                  >
                    <p style={{ fontWeight: 700 }}>
                      {column.label !== "Name" && column.label}{" "}
                    </p>
                    {column.label !== "Name" && column.id !== "action" ? (
                      <React.Fragment>
                        {column.label !== "Rol" ? (
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
