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
    fetchProjects,
    setSelectedProject,
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
        projectId: selectedProject._id,
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
      await fetchProjects(selectedProject._id);
      // const { data } = await axiosInstance.get(
      //   `projects/${selectedProject._id}`
      // );
      // setSelectedProject(data);
      // await updateProjects();

      // Mostramos mensaje satisfactorio
      ChangeStateModal(false);
      ChangeTitleAlert('News members added');
      ChangeStateAlert(true);
      handleClose();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSuggestionChange = ({ inputValue, type }) => {
    // for input leader
    if (type === 'leader') {
      if (inputValue === '') {
        setFilteredLeaders([]);
      } else {
        const filter = users.filter((user) => {
          return user.name.toUpperCase().startsWith(inputValue.toUpperCase());
        });
        setFilteredLeaders(filter);
      }
    } // for input member
    else if (type === 'member') {
      if (inputValue === '') {
        setFilteredMembers([]);
      } else {
        const filter = users.filter((user) => {
          return user.name.toUpperCase().startsWith(inputValue.toUpperCase());
        });
        setFilteredMembers(filter);
      }
    }
  };

  const handleSuggestionClick = (user, type) => {
    if (type === 'leader') {
      setformData({ ...formData, leaders: user });
      setFilteredLeaders([]);
    } else {
      setMembers((prev) => [...prev, user]);
      setFilteredMembers([]);
      setMember('');
    }
  };

  const handleRemoveMember = (memberToRemove) => {
    const updatedMembers = members.filter(
      (member) => member._id.toString() !== memberToRemove._id.toString()
    );
    setMembers(updatedMembers);
  };

  console.log(members);
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
                  type: 'member',
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
                  handleSuggestionClick(user, 'member');
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
            {members.map((member) => (
              <Avatar
                title={`Remove ${member.name}`}
                key={member._id}
                onClick={() => {
                  handleRemoveMember(member);
                }}
                style={{ transition: 'opacity 0.3s ease-in-out' }}
                onMouseOver={(e) => (e.currentTarget.style.opacity = '0.7')}
                onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
                sx={{
                  borderRadius: '50%',
                  bgcolor: `${member.colorbg}`,
                  color: `${member.colorText}`,
                  marginRight: 1,
                  padding: 3,
                  width: 16,
                  height: 16,
                }}
              >
                {member?.name?.split(' ')[0][0].toUpperCase()}
                {member.name?.split(' ').length > 1
                  ? member.name?.split(' ')[1][0].toUpperCase()
                  : ''}
              </Avatar>

              // <Avatar
              //   title="Remove"
              //   key={member._id}
              //   src={user1}
              //   onClick={() => {
              //     handleRemoveMember(member);
              //   }}
              //   style={{ transition: 'opacity 0.3s ease-in-out' }}
              //   onMouseOver={(e) => (e.currentTarget.style.opacity = '0.7')}
              //   onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
              // />
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
                  },
                },
              }}
            >
              {rols.map((rol) => (
                <MenuItem
                  key={rol}
                  value={rol}
                  className="menu-item"
                  style={{ backgroundColor: '#fff', cursor: 'pointer' }}
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
