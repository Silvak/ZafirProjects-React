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
import AddIcon from '@mui/icons-material/Add';
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

  const {
    selectedLeader,
    filteredLeaders,
    filteredMembers,
    selectedMember,
    teamMembers,
    teamLeaders,
    handleAddLeaders,
    handleAddMembers,
    handleRemoveLeader,
    handleRemoveMember,
    handleSuggestionChange,
    handleSuggestionClick,
  } = useProject({ project: null, isCreated: true });

  const { addTask, fetchTasksById, ChangeStateModal, selectedProject } =
    useBoundStore();

  const [taskData, setTaskData] = useState({
    taskName: '',
    start: '',
    end: '',
    state: '',
    priority: '',
    projectId,
  });

  const handleCreate = async () => {
    const data = {
      ...taskData,
      members: teamMembers,
    };
    console.log(data);

    if (
      !taskData.taskName ||
      !taskData.start ||
      !taskData.end ||
      !taskData.description ||
      !taskData.priority ||
      !taskData.state ||
      teamMembers.length === 0
    ) {
      // Si algún campo obligatorio está vacío, muestra un mensaje de error y no crees la tarea
      alert('Por favor, rellena todos los campos obligatorios.');
      return;
    }
    try {
      await addTask(data, projectId);
      await fetchTasksById(projectId);
    } catch (error) {
      alert('Error creating task', error);
    }
    handleClose();
  };

  const handleChange = (event) => {
    const eventName = event.target.name;
    const eventValue = event.target.value;
    setTaskData({
      ...taskData,
      [eventName]: eventValue,
    });
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
                value={taskData.taskName}
                onChange={handleChange}
                name='taskName'
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                name='description'
                value={taskData.description}
                onChange={handleChange}
                sx={{ fontSize: '2rem' }}
              />
            </Grid>
            {/* leader */}
            {/* <Grid item xs={12}>
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
            </Grid>
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
                {teamLeaders.map((member, index) => (
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
                    onClick={() => handleRemoveLeader(member)}
                    style={{ transition: 'opacity 0.3s ease-in-out' }}
                    onMouseOver={(e) => (e.currentTarget.style.opacity = '0.7')}
                    onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
                  />
                ))}
                {teamLeaders.length < 4 && (
                  <IconButton
                    title='Add Leader'
                    sx={{ bgcolor: 'lightgray' }}
                    onClick={handleAddLeaders}
                  >
                    <AddIcon />
                  </IconButton>
                )}
              </Box>
            </Grid> */}
            {/* members */}
            <Grid
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
                  value={selectedMember.name}
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
            </Grid>

            {/* icons members */}
            <Grid item xs={12}>
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
                    <AddIcon />
                  </IconButton>
                )}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Typography sx={{ fontSize: '0.85rem' }}>Priority</Typography>
              <FormControl fullWidth>
                <Select
                  required
                  value={taskData.priority}
                  variant='outlined'
                  size='small'
                  sx={{ fontSize: '2rem', bgcolor: 'white' }}
                  name='priority'
                  onChange={handleChange}
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
              <Typography sx={{ fontSize: '0.85rem' }}>State</Typography>
              <FormControl fullWidth>
                <Select
                  required
                  value={taskData.state}
                  variant='outlined'
                  size='small'
                  sx={{ fontSize: '2rem', bgcolor: 'white' }}
                  name='state'
                  onChange={handleChange}
                  displayEmpty
                  renderValue={(selected) =>
                    selected ? selected : 'Type: All'
                  }
                >
                  <CustomMenuItem value='In Progress'>
                    In Progress
                  </CustomMenuItem>
                  <CustomMenuItem value='Pending'>Pending</CustomMenuItem>
                  <CustomMenuItem value='Completed'>Completed</CustomMenuItem>
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
