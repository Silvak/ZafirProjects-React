import React, { useState } from 'react';
import CustomList from '@/components/CustomList/CustomList';

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
  ListItem,
  Box,
  Avatar,
} from '@mui/material';
import { useBoundStore } from '@/stores';
import { shallow } from 'zustand/shallow';
import { axiosInstance } from '@/config/apiConfig';
import useFormatText from '@/hooks/useFormatText';
import rols from '../../utils/roles';
import useSuggestionUsers from '../../hooks/useSuggestionUsers';
import CustomAvatar from '../CustomAvatar/CustomAvatar';
import getUniqueUsers from '../../utils/getUniqueUsers';

function CreateMember() {
  const { users } = useSuggestionUsers();
  const {
    ChangeStateModal,
    ChangeStateAlert,
    ChangeTitleAlert,
    ChangeStateAlertError,
    ChangeTitleAlertError,
    updateProjects,
    selectedProject,
    User,
  } = useBoundStore((state) => state, shallow);

  const [newRol, setNewRol] = useState('Select rol');
  const [customRol, setCustomRol] = useState('');
  const theme = createTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rol: '',
  });

  const [filteredMembers, setFilteredMembers] = useState([]);

  const [customrolnabled, setCustomrolnabled] = useState(false);
  const [member, setMember] = useState('');
  const [members, setMembers] = useState([]);

  const handleClose = () => {
    ChangeStateModal(false);
  };

  const handleSubmit = async () => {
    formData.rol = customRol || newRol;

    const newMembers = members.map((member) => {
      return {
        name: member.name,
        id: member._id,
        rolToProject: formData.rol,
        projectId: selectedProject?._id,
      };
    });

    try {
      if (
        newMembers.length === 0 ||
        !newMembers[0].rolToProject ||
        !newMembers[0].name
      ) {
        ChangeTitleAlertError('Missing data');
        ChangeStateAlertError(true);
        return;
      }

      const promises = newMembers.map((member) => {
        return axiosInstance.post(`projects/${member.projectId}/add-member`, {
          memberId: member.id,
          newRole: member.rolToProject,
        });
      });

      // Utilizamos promise.all porque es un array de miembros
      await Promise.all(promises);

      // Actualizamos el estado del proyecto
      await updateProjects(User?.uid);

      // Mostramos mensaje satisfactorio
      ChangeStateModal(false);
      ChangeTitleAlert('News members added');
      ChangeStateAlert(true);
      handleClose();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSuggestionChange = ({ inputValue }) => {
    if (inputValue === '') {
      setFilteredMembers([]);
    } else {
      const result = getUniqueUsers(users);
      const filter = result.filter((user) => {
        return user.name.toUpperCase().startsWith(inputValue.toUpperCase());
      });
      setFilteredMembers(filter);
    }
  };

  const handleSuggestionClick = (user) => {
    const alreadyExist = members.find(
      (member) => member._id.toString() === user._id.toString()
    );
    if (alreadyExist === undefined) {
      setMembers((prev) => [...prev, user]);
      setFilteredMembers([]);
      setMember('');
    } else {
      return;
    }
  };

  const handleRemoveMember = (memberToRemove) => {
    const updatedMembers = members.filter(
      (member) => member._id.toString() !== memberToRemove._id.toString()
    );
    setMembers(updatedMembers);
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
          marginBottom: 200,
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <Grid
            item
            sx={{
              // width: "444px",
              marginBottom: '20px',
            }}
          >
            <Typography fontFamily={'Poppins'} color={'#6B6E75'}>
              Add members
            </Typography>
            <TextField
              size="small"
              name="members_id"
              value={member}
              onChange={(e) => {
                setMember(e.target.value);
                handleSuggestionChange({
                  inputValue: e.target.value,
                });
              }}
              placeholder="Search a member"
              sx={{
                width: '100%',
              }}
            />
          </Grid>
          <CustomList showme={filteredMembers.length > 0}>
            {filteredMembers.map((user) => (
              <ListItem
                key={user._id}
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    background: '#F6F7FA',
                  },
                }}
                onClick={() => {
                  handleSuggestionClick(user);
                }}
              >
                {user.name}
              </ListItem>
            ))}
          </CustomList>
        </Box>
        <Grid item xs={12}>
          <Box
            sx={{
              display: 'flex',
              gap: '8px',
              marginBottom: '20px',
              cursor: 'pointer',
              width: 'fit-content',
            }}
          >
            {members.map((member, key) => (
              <CustomAvatar
                key={member?._id}
                bgColor={member.colorBg}
                textColor={member.colorText}
                member={member}
                onClick={() => {
                  handleRemoveMember(member);
                }}
              />
            ))}
          </Box>
        </Grid>

        <Grid
          item
          sx={{
            marginBottom: '20px',
          }}
        >
          <Typography fontFamily={'Poppins'} color={'#6B6E75'}>
            Select rol
          </Typography>
          <Grid item xs={6}>
            <Select
              size="small"
              value={newRol}
              onChange={(e) => {
                const selectedrol = e.target.value;
                setNewRol(selectedrol);
                setCustomrolnabled(selectedrol === 'Other');
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
                    zIndex: 999999,
                    cursor: 'pointer',
                  },
                },
              }}
            >
              {rols.map((rol) => (
                <MenuItem
                  key={rol}
                  value={rol}
                  className="menu-item"
                  style={{
                    backgroundColor: '#fff',
                  }}
                >
                  {rol}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>

        {customrolnabled && (
          <Grid
            item
            size="small"
            sx={{
              marginBottom: '20px',
            }}
          >
            <Typography fontFamily={'Poppins'} color={'#6B6E75'}>
              Custom rol
            </Typography>
            <TextField
              size="small"
              fullWidth
              placeholder="enter a custom rol"
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
