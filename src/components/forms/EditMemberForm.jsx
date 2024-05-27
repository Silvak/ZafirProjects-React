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

function EditMember({ row, setAllMemberData, allMemberData }) {
  console.log(row);
  const [newName, setNewName] = useState(row.name);
  const [newRol, setNewRol] = useState(useFormatText(row.rol) || 'Select Role');
  const [customRol, setCustomRol] = useState('');
  const {
    ChangeStateModal,
    ChangeStateAlert,
    ChangeTitleAlert,
    updateProjects,
  } = useBoundStore((state) => state, shallow);

  console.log(row.projectId);

  const theme = useTheme();
  const [customRolEnabled, setCustomRolEnabled] = useState(false);

  const closeModal = () => {
    ChangeStateModal(false);
  };

  const handleSaveData = async (rowData, newValues) => {
    try {
      console.log(rowData);
      console.log(newValues);
      console.log(newRol);
      console.log(customRol);
      console.log(newValues.rol);

      setCustomRol('');

      if (!newValues.rol || !newValues.name) return;

      console.log('entre');
      try {
        const algo = await axiosInstance.put(
          `/projects/${row.projectId}/update-member`,
          {
            memberId: rowData,
            newRol: customRolEnabled
              ? customRol
              : newValues.rol !== 'Other'
              ? newValues.rol
              : row.rol,
            newName: newValues.name,
          }
        );
        console.log(algo);
      } catch (error) {
        console.log(error);
      }

      const updatedAllMember = allMemberData.map((member) => {
        if (member._id === rowData) {
          return {
            ...member,
            member: {
              ...member,
              name: newValues.name,
            },
            rol: customRolEnabled ? customRol : newValues.rol,
          };
        } else {
          return member;
        }
      });

      console.log(updatedAllMember);

      setAllMemberData(updatedAllMember);
      await updateProjects();
      ChangeTitleAlert('Data has been updated successfully');
      ChangeStateAlert(true);
      closeModal();
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        setNewName(useFormatText(value));
        break;
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
        <h2 style={{ marginBlock: 8 }}>Edit {row.name}</h2>
        <form>
          <TextField
            label="Email"
            value=""
            fullWidth
            disabled
            style={{ marginBottom: 8, display: 'none' }}
          />
          <TextField
            label="Email"
            value={row.email}
            fullWidth
            disabled
            style={{ marginBottom: 8, marginTop: 4 }}
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
            name="name"
            value={newName}
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
                    key={role}
                    value={role}
                    style={{ backgroundColor: '#fff', cursor: 'pointer' }}
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
                  handleSaveData(row._id, { name: newName, rol: newRol })
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
