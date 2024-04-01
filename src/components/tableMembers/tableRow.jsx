import React, { useState } from "react";
import { TableRow, TableCell } from "@material-ui/core/";
import {
  Modal,
  Paper,
  TextField,
  Button,
  Typography,
  Checkbox,
  Grid,
} from "@mui/material/";
import DeleteIcon from "@mui/icons-material/Delete";
import CircleIcon from "@mui/icons-material/Circle";
import EditIcon from "@mui/icons-material/Edit";
import avatar from "../../assets/Img/png/defaultUser.png";
import { useBoundStore } from "@/stores/index";
import { axiosInstance } from "../../config/apiConfig";
import { useStore } from "@/stores/Projects/actualProject";

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
  const [deleteClicked, setDeleteClicked] = useState(false);
  const [editClicked, setEditClicked] = useState(false);
  const isItemSelected = isSelected(row.name);
  const isExpanded = isMobile && isItemSelected;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState(row.name);
  const [newRol, setNewRol] = useState(row.rol);
  const { updateProjects } = useStore();
  const { ChangeStateAlert, ChangeTitleAlert } = useBoundStore();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveData = async (rowData, newValues) => {
    console.log("Row data:", rowData);
    console.log("New values:", newValues);
    await axiosInstance.put(`/members/${rowData.id}`, {
      name: newValues.name,
      rol: newValues.rol,
    });
    const updatedAllMember = allMemberData.map((member) => {
      if (member._id === rowData._id) {
        return { ...member, name: newValues.name, rol: newValues.rol };
      } else {
        return member;
      }
    });

    setAllMemberData(updatedAllMember);
    await updateProjects();
    ChangeTitleAlert("Los datos han sido actualizados correctamente");
    ChangeStateAlert(true);
    closeModal();
  };

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
                        openModal();
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
      <Modal open={isModalOpen} onClose={closeModal}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Paper style={{ padding: "20px" }}>
            <h2>Editando {row.name}</h2>
            <form>
              <TextField
                label="Nombre"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                fullWidth
                style={{ marginBlock: 8 }}
              />
              <TextField
                label="Rol"
                value={newRol}
                onChange={(e) => setNewRol(e.target.value)}
                fullWidth
                style={{ marginBottom: 8 }}
              />
              <Grid container justifyContent="flex-end" gap={2}>
                <Grid item>
                  <Button
                    variant="contained"
                    sx={{
                      padding: "0.6rem",
                      height: "min-content",
                      borderRadius: "12px",
                    }}
                    onClick={closeModal}
                  >
                    Cerrar
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    sx={{
                      padding: "0.6rem",
                      height: "min-content",
                      borderRadius: "12px",
                    }}
                    onClick={() =>
                      handleSaveData(row, { name: newName, rol: newRol })
                    }
                  >
                    Guardar
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default TableRowComponent;
