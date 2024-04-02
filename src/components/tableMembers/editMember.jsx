import {
  TextField,
  Grid,
  Button,
  Paper,
  ThemeProvider,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useBoundStore } from "@/stores/index";
import { axiosInstance } from "../../config/apiConfig";
import { useStore } from "@/stores/Projects/actualProject";

function EditMember({ row, setAllMemberData, allMemberData }) {
  const [newName, setNewName] = useState(row.member.name);
  const [newRol, setNewRol] = useState(row.rolToProject);
  const { updateProjects } = useStore();
  const { ChangeStateModal, ChangeStateAlert, ChangeTitleAlert } =
    useBoundStore();

  const theme = useTheme();

  const closeModal = () => {
    ChangeStateModal(false);
  };

  const handleSaveData = async (rowData, newValues) => {
    try {
      await axiosInstance.put(`/members/${rowData.member.id}`, {
        name: newValues.name,
      });

      await axiosInstance.put(
        `/projects/${rowData.projectId}/change-member-role`,
        {
          memberId: rowData.member._id,
          newRole: newValues.rol,
        }
      );

      const updatedAllMember = allMemberData.map((member) => {
        if (member.member._id === rowData.member._id) {
          return {
            ...member,
            member: {
              ...member.member,
              name: newValues.name,
            },
            rolToProject: newValues.rol,
          };
        } else {
          return member;
        }
      });

      setAllMemberData(updatedAllMember);
      await updateProjects();
      ChangeTitleAlert("Los datos han sido actualizados correctamente");
      ChangeStateAlert(true);
      closeModal();
    } catch (error) {
      console.error("Error al guardar los datos:", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper elevation={3} style={{ padding: "20px", backgroundColor: "#fff" }}>
        <h2 style={{ marginBlock: 8 }}>Edit {row.member.name}</h2>
        <form>
          <TextField
            label="Email"
            value={row.member.email}
            fullWidth
            disabled
            style={{ marginBottom: 8 }}
          />
          <TextField
            label="Lead Owner"
            value={row.leadOwner}
            fullWidth
            disabled
            style={{ marginBottom: 8 }}
          />
          <TextField
            label="Nombre"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            fullWidth
            style={{ marginBottom: 8 }}
          />
          <TextField
            label="Rol"
            value={newRol}
            onChange={(e) => setNewRol(e.target.value)}
            fullWidth
            style={{ marginBottom: 8 }}
          />
          <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
            <Grid item>
              <Button
                disableRipple
                variant="outlined"
                sx={{
                  color: "black",
                  bgcolor: "white",
                  borderRadius: "0.5rem",
                  border: "1px gray solid",
                  minWidth: "6rem",
                }}
                onClick={closeModal}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                disableRipple
                style={{ marginLeft: 8 }}
                variant="contained"
                sx={{
                  color: "white",
                  bgcolor: "#7662EA",
                  borderRadius: "0.5rem",
                  minWidth: "6rem",
                }}
                onClick={() =>
                  handleSaveData(row, { name: newName, rol: newRol })
                }
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </ThemeProvider>
  );
}
export default EditMember;
