import { useState } from "react";
import {
  Button,
  Grid,
  Paper,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { useBoundStore } from "../../stores";
import { axiosInstance } from "../../config/apiConfig";

function CreateMember() {
  const {
    ChangeStateModal,
    ChangeStateAlert,
    ChangeTitleAlert,
    updateProjects,
    selectedProject,
    setSelectedProject,
  } = useBoundStore();

  const theme = createTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
  });

  const handleClose = () => {
    ChangeStateModal(false);
  };

  const addMemberToProject = async (memberId, rolToProject) => {
    const projectId = selectedProject.id;
    const project_Id = selectedProject._id;
    await axiosInstance.post(`/projects/${projectId}/add-member`, {
      memberId,
      rolToProject,
    });
    const { data } = await axiosInstance.get(`/projects/${project_Id}`);
    return data;
  };

  const handleSubmit = async () => {
    try {
      const { data } = await axiosInstance.post(`/members`, {
        name: formData.name,
        email: formData.email,
        rol: formData.role,
      });

      const projectUpdated = await addMemberToProject(data._id, formData.role);

      setSelectedProject(projectUpdated);
      await updateProjects();

      ChangeTitleAlert("Nuevo miembro agregado");
      ChangeStateAlert(true);
      handleClose();
    } catch (error) {
      console.error("Error al guardar los datos:", error.message);
    }
  };

  const handleChange = (event) => {
    const eventName = event.target.name;
    const eventValue = event.target.value;
    setFormData({
      ...formData,
      [eventName]: eventValue,
    });
  };

  return (
    <ThemeProvider theme={theme}>
      {/* row - colum */}
      <Paper
        elevation={0}
        style={{
          padding: "20px",
          backgroundColor: "#fff",
          width: "35vw",
        }}
      >
        <Grid
          item
          sx={{
            marginBottom: "20px",
          }}
        >
          <Typography fontFamily={"Poppins"} color={"#6B6E75"}>
            Email
          </Typography>
          <TextField
            size="small"
            fullWidth
            placeholder="example@mail.com"
            name="email"
            onChange={handleChange}
          />
        </Grid>
        <Grid
          item
          sx={{
            marginBottom: "20px",
          }}
        >
          <Typography fontFamily={"Poppins"} color={"#6B6E75"}>
            Name
          </Typography>
          <TextField
            size="small"
            fullWidth
            placeholder="enter a member name..."
            name="name"
            onChange={handleChange}
          />
        </Grid>
        <Grid
          item
          sx={{
            marginBottom: "20px",
          }}
        >
          <Typography fontFamily={"Poppins"} color={"#6B6E75"}>
            Role
          </Typography>
          <TextField
            size="small"
            fullWidth
            placeholder="enter a role"
            name="role"
            onChange={handleChange}
          />
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
              onClick={handleClose}
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
              onClick={handleSubmit}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </ThemeProvider>
  );
}

export default CreateMember;
