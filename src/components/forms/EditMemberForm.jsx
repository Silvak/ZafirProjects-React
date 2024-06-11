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
} from '@mui/material';
import { useState } from 'react';
import { useBoundStore } from '@/stores';
import { shallow } from 'zustand/shallow';
import { axiosInstance } from '@/config/apiConfig';
import roles from '@/utils/roles';
import useFormatText from '@/hooks/useFormatText';

function EditMember({ row }) {
  const [newName, setNewName] = useState(row._id.name);
  const [newRol, setNewRol] = useState(
    useFormatText(row.rolToProject) || 'Select Role'
  );
  const [customRol, setCustomRol] = useState('');
  const {
    User,
    ChangeStateModal,
    ChangeStateAlert,
    ChangeTitleAlert,
    ChangeStateAlertError,
    ChangeTitleAlertError,
    updateProjects,
  } = useBoundStore((state) => state, shallow);

  const theme = useTheme();
  const [customRolEnabled, setCustomRolEnabled] = useState(false);

  const closeModal = () => {
    ChangeStateModal(false);
  };

  const handleSaveData = async (rowData, newValues) => {
    try {
      if (!newValues.rol || !newValues.name) return;

      await axiosInstance.put(`/projects/${row.projectId}/update-member`, {
        memberId: rowData,
        newRol: customRolEnabled
          ? customRol
          : newValues.rol !== 'Other'
          ? newValues.rol
          : row.rol,
        newName: newValues.name,
      });

      await updateProjects(User?.uid);
      ChangeStateModal(false);
      ChangeTitleAlert('Member updated');
      ChangeStateAlert(true);
      closeModal();
    } catch (error) {
      ChangeStateAlertError(true);
      ChangeTitleAlertError(error.message);
      console.error('Error saving data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'rol':
        setNewRol(value);
        setCustomRolEnabled(value === 'Other');
        break;
      case 'customRol':
        setCustomRol(useFormatText(value));
        break;
      default:
        break;
    }
  };

  const getName = () => {
    return useFormatText(row._id.name);
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper
        elevation={3}
        style={{
          padding: '20px',
          backgroundColor: '#fff',
          maxWidth: '35vw',
          borderRadius: '16px',
          paddingBottom: '25px',
          marginBottom: 150,
        }}
      >
        <h2 style={{ marginBlock: 8 }}>
          Edit
          <span style={{ fontWeight: 800, marginLeft: 6 }}>{getName()}</span>
        </h2>
        <form>
          <TextField
            label="Email"
            size="small"
            value={row._id.email}
            fullWidth
            disabled
            style={{ marginBottom: 8, marginTop: 4 }}
          />
          <TextField
            label="Email"
            size="small"
            value={row._id.email}
            fullWidth
            disabled
            style={{ display: 'none' }}
          />
          {/* <TextField
            size="small"
            label="Lead Owner"
            value={row.leadOwner}
            fullWidth
            disabled
            style={{ marginBottom: 8 }}
          /> */}
          <TextField
            label="Name"
            name="name"
            disabled
            value={useFormatText(newName)}
            onChange={handleChange}
            fullWidth
            style={{ marginBottom: 8 }}
          />
          <InputLabel
            id="select-role-label"
            sx={{ color: 'black', ml: 1, mt: 1, mb: 0.5, fontWeight: 400 }}
          >
            Select Role
          </InputLabel>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={6}>
              <Select
                name="rol"
                value={newRol}
                onChange={handleChange}
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
                    className="menu-item"
                    key={role}
                    value={role}
                    style={{
                      backgroundColor: '#fff',
                      cursor: 'pointer',
                      fontWeight: 600,
                    }}
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
                  name="customRol"
                  value={customRol}
                  onChange={handleChange}
                  fullWidth
                  style={{ marginBottom: 8, width: 'auto', borderRadius: 12 }}
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
                  color: 'black',
                  bgcolor: 'white',
                  borderRadius: '0.5rem',
                  border: '1px gray solid',
                  minWidth: '6rem',
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
                  color: 'white',
                  bgcolor: '#7662EA',
                  borderRadius: '0.5rem',
                  minWidth: '6rem',
                }}
                onClick={() =>
                  handleSaveData(row._id._id, { name: newName, rol: newRol })
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
