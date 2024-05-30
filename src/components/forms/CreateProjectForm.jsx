import CustomList from '@/components/CustomList/CustomList';
import {
  Avatar,
  Box,
  Button,
  Grid,
  ListItem,
  Paper,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
  useMediaQuery,
} from '@mui/material';
import { useState } from 'react';
import { shallow } from 'zustand/shallow';
import useSuggestionUsers from '../../hooks/useSuggestionUsers';
import { useBoundStore } from '../../stores';
import CustomAvatar from '@/components/CustomAvatar/CustomAvatar';

function CreateProjectForm() {
  const theme = createTheme();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const {
    User,
    addProject,
    updateProject,
    updateProjects,
    ChangeStateModal,
    ChangeTitleAlert,
    ChangeStateAlert,
    ChangeTitleAlertError,
    ChangeStateAlertError,
  } = useBoundStore((state) => state, shallow);
  const { users } = useSuggestionUsers();

  const [isLoading, setIsLoading] = useState(false);
  // total usuarios

  //  filtro para mostrar en la lista
  const [filteredLeaders, setFilteredLeaders] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  //  nombre del miembro
  const [member, setMember] = useState('');
  // miembros a renderizar
  const [members, setMembers] = useState([]);

  const [formData, setformData] = useState({
    name: '',
    start: '',
    end: '',
    description: '',
    leaders: '',
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log({
      ...formData,
      leaders: formData.leaders._id,
      members_id: members,
    });
    try {
      const data = {
        ...formData,
        leaders: formData.leaders._id,
        members_id: members,
      };
      //validamos que no se envie vacio
      if (Object.values(data).includes('')) {
        ChangeStateAlertError(true);
        ChangeTitleAlertError('All fields are required');
        setIsLoading(false);
        return;
      } else {
        await addProject(User._id, data);
        await updateProjects();
        ChangeStateAlert(true);
        ChangeTitleAlert('Project created successfully');
        setIsLoading(false);
        ChangeStateModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const handleClose = () => {
    ChangeStateModal(false);
  };

  const handleSuggestionClick = (user, type) => {
    if (type === 'leader') {
      setformData({ ...formData, leaders: user });
      setFilteredLeaders([]);
    } else {
      setMembers((prev) => [...prev, user]);
      setFilteredMembers([]);
      setMember(''); // Limpiar el campo de entrada después de seleccionar un miembro
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
      {/* row - colum */}
      <Paper
        elevation={1}
        component='form'
        onSubmit={handleSubmit}
        sx={{
          maxWidth: isMobile ? '90vw' : 'fit-content',
          padding: '39px',
          maxHeight: '90vh',
          height: isMobile ? '90vh' : '',
          borderTopLeftRadius: '0px',
          borderTopRightRadius: '0px',
          overflowY: 'auto',
          borderBottomLeftRadius: '16px',
          borderBottomRightRadius: '16px',
        }}
      >
        <Grid
          item
          sx={{
            marginBottom: '20px',
          }}
        >
          <Typography fontFamily={'Poppins'} color={'#6B6E75'}>
            Enter a project name
          </Typography>
          <TextField
            size='small'
            value={formData.name}
            placeholder='Project name...'
            name='name'
            onChange={handleChange}
            sx={{
              width: '100%',
            }}
          />
        </Grid>
        {/* flex */}
        <div
          style={{
            display: 'flex',
            marginBottom: '20px',
          }}
        >
          <Grid
            item
            sx={{
              marginRight: '12px',
            }}
          >
            <Typography fontFamily={'Poppins'} color={'#6B6E75'}>
              Start date
            </Typography>
            <TextField
              size='small'
              name='start'
              type='date'
              value={formData.start}
              onChange={handleChange}
              sx={{
                width: '100%',
              }}
            />
          </Grid>
          <Grid item>
            <Typography fontFamily={'Poppins'} color={'#6B6E75'}>
              End date
            </Typography>
            <TextField
              size='small'
              name='end'
              type='date'
              value={formData.end}
              onChange={handleChange}
              sx={{
                width: '100%',
              }}
            />
          </Grid>
        </div>

        <Grid
          item
          sx={{
            marginBottom: '20px',
          }}
        >
          <Typography fontFamily={'Poppins'} color={'#6B6E75'}>
            Add a description...
          </Typography>
          <TextField
            size='small'
            name='description'
            onChange={handleChange}
            value={formData.description}
            placeholder='...'
            sx={{
              width: '100%',
            }}
          />
        </Grid>

        {/* leader */}
        <Box sx={{ position: 'relative' }}>
          <Grid
            item
            sx={{
              marginBottom: '20px',
            }}
          >
            <Typography fontFamily={'Poppins'} color={'#6B6E75'}>
              Leader
            </Typography>
            <TextField
              size='small'
              name='leaders'
              value={formData.leaders.name}
              onChange={(e) => {
                handleChange(e);
                handleSuggestionChange({
                  inputValue: e.target.value,
                  type: 'leader',
                });
              }}
              sx={{
                width: '100%',
              }}
            />
          </Grid>
          <CustomList showme={filteredLeaders.length > 0}>
            {filteredLeaders.map((user) => (
              <ListItem
                key={user._id}
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    background: '#F6F7FA',
                  },
                }}
                onClick={() => {
                  handleSuggestionClick(user, 'leader');
                }}
              >
                {user.name}
              </ListItem>
            ))}
          </CustomList>
        </Box>

        {/* members */}
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
              size='small'
              name='members_id'
              value={member}
              onChange={(e) => {
                setMember(e.target.value);
                handleSuggestionChange({
                  inputValue: e.target.value,
                  type: 'member',
                });
              }}
              placeholder='Search a member'
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
              <CustomAvatar
                title={`Remove ${member.name}`}
                key={member._id}
                letter={member.name.charAt(0)}
                onClick={() => {
                  console.log(member);
                  handleRemoveMember(member);
                }}
              />
            ))}
          </Box>
        </Grid>
        {/* buttons */}
        <Grid
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '40px',
          }}
        >
          <Button
            title='Cancel'
            onClick={handleClose}
            sx={{
              textTransform: 'none',
              color: 'black',
              backgroundColor: 'white',
              height: '40px',
              width: '75px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 500,
              fontFamily: 'Poppins',
              border: '1px solid #D3D5DA',
            }}
          >
            Cancel
          </Button>
          <Button
            title='Save'
            onClick={handleSubmit}
            sx={{
              textTransform: 'none',
              color: 'white',
              backgroundColor: '#7662EA',
              height: '40px',
              width: '84px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 500,
              fontFamily: 'Poppins',
              '&:hover': { backgroundColor: 'black' },
            }}
          >
            {isLoading ? 'Updating...' : 'Save'}
          </Button>
        </Grid>
      </Paper>
    </ThemeProvider>
  );
}

export default CreateProjectForm;
