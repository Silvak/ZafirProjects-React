import {
  TextField,
  Grid,
  Button,
  Paper,
  ThemeProvider,
  useTheme,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useBoundStore } from "@/stores";
import { axiosInstance } from "@/config/apiConfig";
import roles from "@/utils/roles";
import useFormatText from "@/hooks/useFormatText";

function EditMember({ row, setAllMemberData, allMemberData }) {
  const [newName, setNewName] = useState(row.member.name);
  const [newRol, setNewRol] = useState(row.rolToProject || "Select Role");
  const [customRol, setCustomRol] = useState("");
  const {
    ChangeStateModal,
    ChangeStateAlert,
    ChangeTitleAlert,
    updateProjects,
  } = useBoundStore();

  const theme = useTheme();
  const [customRolEnabled, setCustomRolEnabled] = useState(false);

  useEffect(() => {
    setNewRol(row.rolToProject);
  }, [row.rolToProject]);

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
          newRole: customRolEnabled ? customRol : newValues.rol,
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
            rolToProject: customRolEnabled ? customRol : newValues.rol,
          };
        } else {
          return member;
        }
      });

      setAllMemberData(updatedAllMember);
      await updateProjects();
      ChangeTitleAlert("Data has been updated successfully");
      ChangeStateAlert(true);
      closeModal();
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper
        elevation={3}
        style={{
          padding: "20px",
          backgroundColor: "#fff",
          maxWidth: "35vw",
          borderRadius: "16px",
          paddingBottom: "25px",
          marginBottom: 150,
        }}
      >
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
            onChange={(e) => setNewName(useFormatText(e.target.value))}
            fullWidth
            style={{ marginBottom: 8 }}
          />
          <InputLabel
            id="select-role-label"
            sx={{ color: "black", ml: 1, mt: 1, mb: 0.5, fontWeight: 400 }}
          >
            Select Role
          </InputLabel>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={6}>
              <Select
                value={newRol}
                onChange={(e) => {
                  const selectedRole = e.target.value;
                  setNewRol(selectedRole);
                  setCustomRolEnabled(selectedRole === "Other");
                }}
                fullWidth
                style={{
                  marginBottom: 8,
                  borderRadius: 12,
                  padding: 0,
                }}
                MenuProps={{
                  PaperProps: {
                    style: {
                      borderTopLeftRadius: 0,
                      borderTopRightRadius: 0,
                      backgroundColor: "#fff",
                      marginTop: 6,
                      padding: 0,
                      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
                    },
                  },
                }}
              >
                {roles.map((role) => (
                  <MenuItem
                    key={role}
                    value={role}
                    style={{ backgroundColor: "#fff", cursor: "pointer" }}
                  >
                    {role}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={6}>
              {customRolEnabled && (
                <TextField
                  label="Custom Role"
                  value={customRol}
                  onChange={(e) => setCustomRol(useFormatText(e.target.value))}
                  fullWidth
                  style={{ marginBottom: 8, width: "auto", borderRadius: 12 }}
                />
              )}
            </Grid>
          </Grid>
          <Grid container justifyContent="space-between" sx={{ mt: 2 }}>
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
