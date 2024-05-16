import React, { useEffect, useState } from 'react';
import {
  Avatar,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  Typography,
  Paper,
  useTheme,
  Grid,
  useMediaQuery,
  ThemeProvider,
  Box,
  IconButton,
} from '@mui/material';
import { useBoundStore } from '../../stores/index';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useProject } from '@/hooks/useProject';
import { AddCircleOutline } from '@mui/icons-material';
import SuggestionList from '../SuggestionList/SuggestionList';

const CreateTaskForm = ({ onCreate, placeholderTaskName = '', projectId }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const [taskName, setTaskName] = useState(placeholderTaskName);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [tags, setTags] = useState('');

  const {
    selectedLeader,
    filteredLeaders,
    filteredMembers,
    selectedMember,
    teamLeaders,
    teamMembers,
    handleAddLeaders,
    handleAddMembers,
    handleRemoveLeader,
    handleRemoveMember,
    handleSuggestionChange,
    handleSuggestionClick,
  } = useProject({ project: null, isCreated: true });

  const { addTask, fetchTasksById, ChangeStateModal, selectedProject } =
    useBoundStore();

  useEffect(() => {
    // Actualizamos el objeto taskData con los valores actuales de los estados
    setTaskData({
      data: [
        {
          name: taskName,
          description: description,
          tags: tags,
        },
      ],
      start: selectedDate,
      end: selectedEndDate,
      state: tags,
      members: selectedLeader,
      priority: priority,
      projectId: projectId,
    });
  }, [taskName, startDate, endDate, description, priority, tags]);

  const [taskData, setTaskData] = useState({
    data: [
      {
        name: taskName,
        description: description,
        tags: tags,
      },
    ],
    start: selectedDate,
    end: selectedEndDate,
    state: tags,
    members: selectedLeader,
    priority: priority,
    projectId: selectedProject._id,
  });

  const [selectedUser, setSelectedUser] = useState('');
  // const [teamMembers, setTeamMembers] = useState([]);

  const handleCreate = async () => {
    console.log('Leader que vamos a mandar al back: ', selectedLeader);

    if (
      !taskName ||
      !selectedDate ||
      !selectedEndDate ||
      !description ||
      !priority ||
      !tags ||
      !selectedLeader
    ) {
      // Si algún campo obligatorio está vacío, muestra un mensaje de error y no crees la tarea
      alert('Por favor, rellena todos los campos obligatorios.');
      return;
    }
    try {
      await addTask(taskData, projectId);
      await fetchTasksById(projectId);
    } catch (error) {
      alert('Error creating task', error);
    }
    handleClose();
  };

  const handleClose = () => {
    ChangeStateModal(false);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setSelectedEndDate(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Paper
          elevation={1}
          style={{
            paddingInline: '2rem',
            maxHeight: '90vh',
            width: isMobile ? '' : '35vw',
            margin: 'auto',
            background: 'white',
            overflowY: 'auto',
            borderBottomLeftRadius: '16px',
            borderBottomRightRadius: '16px',
            borderTopLeftRadius: '0px',
            borderTopRightRadius: '0px',
            paddingBottom: '15px',
          }}
        >
          <Grid container spacing={2} sx={{ marginTop: '13px' }}>
            <Grid item xs={12}>
              <Typography sx={{ fontSize: '0.2rem', fontWeight: 'normal' }}>
                Task name
              </Typography>
              <TextField
                variant='outlined'
                fullWidth
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                size='small'
                required
                sx={{ fontSize: '2rem' }}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography fontFamily={'Poppins'} color={'#6B6E75'}>
                Start date
              </Typography>
              <TextField
                size='small'
                name='start'
                type='date'
                onChange={handleDateChange}
                sx={{
                  width: '100%',
                }}
              />
            </Grid>
            <Grid xs={6} item>
              <Typography fontFamily={'Poppins'} color={'#6B6E75'}>
                End date
              </Typography>
              <TextField
                size='small'
                name='end'
                type='date'
                onChange={handleEndDateChange}
                sx={{
                  width: '100%',
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{ fontSize: '0.85rem' }}>
                Add a description
              </Typography>
              <TextField
                required
                fullWidth
                multiline
                rows={1}
                size='small'
                variant='outlined'
                placeholder='...'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                sx={{ fontSize: '2rem' }}
              />
            </Grid>
            {/* leader */}
            <Grid item xs={12}>
              <Box sx={{ position: 'relative' }}>
                <Typography sx={{ fontSize: '0.85rem' }}>Assigne to</Typography>
                <TextField
                  size='small'
                  name='leaders'
                  value={selectedLeader}
                  onChange={(e) => handleSuggestionChange(e, 'leader')}
                  placeholder='Search leader'
                  sx={{
                    width: '100%',
                  }}
                />
                <SuggestionList
                  usersList={filteredLeaders}
                  onClick={handleSuggestionClick}
                  type='leader'
                />
              </Box>
              {/* <div
                style={{
                  marginLeft: 4,
                  padding: 8,
                }}
              >
                {filteredLeaders.map((user) => (
                  <p
                    key={user.id}
                    onClick={() => handleSuggestionClick(user, 'leader')}
                    style={{ cursor: 'pointer' }}
                  >
                    {user.name}
                  </p>
                ))}
              </div> */}
            </Grid>
            {/* members */}
            {/* <Grid
              item
              xs={12}
              sx={{
                marginBottom: '12px',
              }}
            >
              <Box sx={{ position: 'relative' }}>
                <Typography fontFamily={'Poppins'} color={'#6B6E75'}>
                  Add members
                </Typography>
                <TextField
                  size='small'
                  name='members'
                  value={selectedMember}
                  onChange={(e) => handleSuggestionChange(e, 'member')}
                  placeholder='Search a member'
                  sx={{
                    width: '100%',
                  }}
                />
                <SuggestionList
                  usersList={filteredMembers}
                  onClick={handleSuggestionClick}
                  type='member'
                />
              </Box>
            </Grid> */}

            {/* icons members */}
            {/* <Grid item xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  gap: '8px',
                  marginBottom: '4px',
                  cursor: 'pointer',
                }}
              >
                {teamMembers.map((member, index) => (
                  <Avatar
                    title='Remove'
                    key={index}
                    alt={member}
                    src={
                      member === 'user1'
                        ? user1
                        : member === 'user2'
                        ? user2
                        : member === 'user3'
                        ? user3
                        : ''
                    }
                    onClick={() => handleRemoveMember(member)}
                    style={{ transition: 'opacity 0.3s ease-in-out' }}
                    onMouseOver={(e) => (e.currentTarget.style.opacity = '0.7')}
                    onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
                  />
                ))}
                {teamMembers.length < 4 && (
                  <IconButton
                    title='Add Leader'
                    sx={{ bgcolor: 'lightgray' }}
                    onClick={handleAddMembers}
                  >
                    <AddCircleOutline />
                  </IconButton>
                )}
              </Box>
            </Grid> */}

            <Grid item xs={12}>
              <Typography sx={{ fontSize: '0.85rem' }}>Priority</Typography>
              <FormControl fullWidth>
                <Select
                  required
                  value={priority}
                  variant='outlined'
                  size='small'
                  sx={{ fontSize: '2rem', bgcolor: 'white' }}
                  onChange={(e) => setPriority(e.target.value)}
                  displayEmpty
                  renderValue={(selected) =>
                    selected ? selected : 'Type: All'
                  }
                >
                  <CustomMenuItem value='High'>High</CustomMenuItem>
                  <CustomMenuItem value='Medium'>Medium</CustomMenuItem>
                  <CustomMenuItem value='Low'>Low</CustomMenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Typography sx={{ fontSize: '0.85rem' }}>Tags</Typography>
              <FormControl fullWidth>
                <Select
                  required
                  value={tags}
                  variant='outlined'
                  size='small'
                  sx={{ fontSize: '2rem', bgcolor: 'white' }}
                  onChange={(e) => setTags(e.target.value)}
                  displayEmpty
                  renderValue={(selected) =>
                    selected ? selected : 'Type: All'
                  }
                >
                  <CustomMenuItem value='In Progress'>
                    In Progress
                  </CustomMenuItem>
                  <CustomMenuItem value='Pending'>Pending</CustomMenuItem>
                  {/* <CustomMenuItem value="Issues">Issues</CustomMenuItem> */}
                  {/* <CustomMenuItem value="Review">Review</CustomMenuItem> */}
                  <CustomMenuItem value='Completed'>Completed</CustomMenuItem>
                  {/* <CustomMenuItem value='Backlog'>Backlog</CustomMenuItem> */}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          {/* botones */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBlock: '2rem',
            }}
          >
            <Button
              onClick={handleClose}
              variant='outlined'
              sx={{
                color: 'black',
                bgcolor: 'white',
                borderRadius: '0.5rem',
                border: '1px gray solid',
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreate}
              variant='contained'
              sx={{
                color: 'white',
                bgcolor: '#7662EA',
                borderRadius: '0.5rem',
              }}
            >
              Create
            </Button>
          </div>
        </Paper>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default CreateTaskForm;

const CustomMenuItem = ({ children, selected, ...props }) => {
  return (
    <MenuItem
      sx={{
        height: 'min-content',
        bgcolor: selected ? 'white' : '#B5B5B5',
        color: selected ? 'black' : 'white',
        '&:focus, &:hover': {
          bgcolor: 'cyan',
          color: 'blue',
        },
      }}
      {...props}
    >
      {children}
    </MenuItem>
  );
};
