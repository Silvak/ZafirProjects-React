import React, { useState } from 'react';
import {
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  createTheme,
  ThemeProvider,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';
import { useBoundStore } from '@/stores';
import { shallow } from 'zustand/shallow';
import { axiosInstance } from '@/config/apiConfig';
import useFormatText from '@/hooks/useFormatText';
import roles from '@/utils/roles';

function CreateMember() {
  const {
    ChangeStateModal,
    ChangeStateAlert,
    ChangeTitleAlert,
    ChangeStateAlertError,
    ChangeTitleAlertError,
    updateProjects,
    selectedProject,
    setSelectedProject,
  } = useBoundStore((state) => state, shallow);

  const [newRol, setNewRol] = useState('Select Role');
  const [customRol, setCustomRol] = useState('');
  const theme = createTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
  });
  const [customRolEnabled, setCustomRolEnabled] = useState(false);

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
    formData.role = customRol || newRol;
    try {
      if (!formData.name || !formData.email || !formData.role) {
        ChangeTitleAlertError('Missing data');
        ChangeStateAlertError(true);
        return;
      }
      const { data } = await axiosInstance.post(`/members`, {
        name: formData.name,
        email: formData.email,
        rol: customRol || newRol,
      });

      formData.role = customRol || newRol;
      const projectUpdated = await addMemberToProject(data._id, formData.role);

      setSelectedProject(projectUpdated);
      await updateProjects();

      ChangeTitleAlert('New member added');
      ChangeStateAlert(true);
      handleClose();
    } catch (error) {
      console.error('Error saving data:', error.message);
    }
  };

  const handleChange = (event) => {
    const eventName = event.target.name;
    const eventValue = event.target.value;
    if (eventName === 'name') {
      setFormData({ ...formData, name: useFormatText(event.target.value) });
    } else {
      setFormData({
        ...formData,
        [eventName]: eventValue,
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper
        elevation={0}
        style={{
          padding: '20px',
          backgroundColor: '#fff',
          width: '30vw',
          borderBottomLeftRadius: '16px',
          borderBottomRightRadius: '16px',
          borderTopLeftRadius: '0px',
          borderTopRightRadius: '0px',
          paddingBottom: '25px',
          marginBottom: 100,
        }}
      >
        <Grid
          item
          sx={{
            marginBottom: '20px',
          }}
        >
          <Typography fontFamily={'Poppins'} color={'#6B6E75'}>
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
            marginBottom: '20px',
          }}
        >
          <Typography fontFamily={'Poppins'} color={'#6B6E75'}>
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
            marginBottom: '20px',
          }}
        >
          <Typography fontFamily={'Poppins'} color={'#6B6E75'}>
            Select Role
          </Typography>
          <Grid item xs={6}>
            <Select
              size="small"
              value={newRol}
              onChange={(e) => {
                const selectedRole = e.target.value;
                setNewRol(selectedRole);
                setCustomRolEnabled(selectedRole === 'Other');
              }}
              fullWidth
              style={{
                marginBottom: 8,
                borderRadius: 6,
                padding: 0,
              }}
              MenuProps={{
                PaperProps: {
                  style: {
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0,
                    backgroundColor: '#fff',
                    marginTop: 6,
                    padding: 0,
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
                  },
                },
              }}
            >
              {roles.map((role) => (
                <MenuItem
                  key={role}
                  value={role}
                  style={{ backgroundColor: '#fff', cursor: 'pointer' }}
                >
                  {role}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>

        {customRolEnabled && (
          <Grid
            item
            size="small"
            sx={{
              marginBottom: '20px',
            }}
          >
            <Typography fontFamily={'Poppins'} color={'#6B6E75'}>
              Custom Role
            </Typography>
            <TextField
              size="small"
              fullWidth
              placeholder="enter a custom role"
              value={customRol}
              onChange={(e) => setCustomRol(useFormatText(e.target.value))}
            />
          </Grid>
        )}

        <Grid container justifyContent="space-between" sx={{ mt: 2 }}>
          <Grid item>
            <Button
              disableRipple
              variant="outlined"
              sx={{
                color: 'black',
                bgcolor: 'white',
                borderRadius: '0.5rem',
                border: '1px gray solid',
                minWidth: '6rem',
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
                color: 'white',
                bgcolor: '#7662EA',
                borderRadius: '0.5rem',
                minWidth: '6rem',
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
