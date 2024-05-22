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
} from '@mui/material';
import { useBoundStore } from '../../stores/index';
import { shallow } from 'zustand/shallow';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useProject } from '@/hooks/useProject';

const SubTaskForm = ({ placeholderTaskName = 'Subtask 1', taskId }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const [taskName, setTaskName] = useState(placeholderTaskName);
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const {
    selectedLeader,
    filteredLeaders,
    handleSuggestionChange,
    handleSuggestionClick,
  } = useProject({ project: null, isCreated: true });

  const {
    addSubtask,
    ChangeStateModal,
    ChangeStateAlert,
    ChangeTitleAlert,
    ChangeStateAlertError,
    ChangeTitleAlertError,
  } = useBoundStore((state) => state, shallow);

  useEffect(() => {
    // Actualizamos el objeto taskData con los valores actuales de los estados
    setsubtaskData({
      name: taskName,
      start: selectedDate,
      end: selectedEndDate,
      description: description,
      status: tags,
      members: selectedLeader,
      taskId: taskId,
    });
  }, [
    taskName,
    selectedDate,
    selectedEndDate,
    description,
    tags,
    selectedLeader,
    taskId,
  ]);

  const [subtaskData, setsubtaskData] = useState({
    name: taskName,
    start: selectedDate,
    end: selectedEndDate,
    description: description,
    status: tags,
    members: selectedLeader,
    taskId: taskId,
  });

  const [selectedUser, setSelectedUser] = useState('');
  const [teamMembers, setTeamMembers] = useState([]);

  const handleCreate = async () => {
    if (
      !taskName ||
      !selectedDate ||
      !selectedEndDate ||
      !description ||
      !tags ||
      !selectedLeader
    ) {
      // Si algún campo obligatorio está vacío, muestra un mensaje de error y no crees la tarea
      // alert('Por favor, rellena todos los campos obligatorios.');
      ChangeTitleAlertError('Please complete all the data in the subtask');
      ChangeStateAlertError(true);
      return;
    }
    try {
      await addSubtask(subtaskData);
      ChangeTitleAlert('SubTask created');
      ChangeStateAlert(true);
      handleClose();
    } catch (error) {
      alert('Error creating task', error);
    }
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
                subTask name
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                size="small"
                required
                sx={{ fontSize: '2rem' }}
              />
            </Grid>

            <Grid item xs={6}>
              <Typography fontFamily={'Poppins'} color={'#6B6E75'}>
                Start date
              </Typography>
              <TextField
                size="small"
                name="start"
                type="date"
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
                size="small"
                name="end"
                type="date"
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
                size="small"
                variant="outlined"
                placeholder="..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                sx={{ fontSize: '2rem' }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{ fontSize: '0.85rem' }}>Assigne to</Typography>

              <TextField
                size="small"
                name="leaders"
                value={selectedLeader}
                onChange={(e) => handleSuggestionChange(e, 'leader')}
                placeholder="Search leader"
                sx={{
                  width: '100%',
                }}
              />
              <div
                style={{
                  marginLeft: 4,
                  cursor: 'pointer',
                  padding: 8,
                }}
              >
                {filteredLeaders.map((user) => (
                  <p
                    key={user.id}
                    onClick={() => handleSuggestionClick(user.name, 'leader')}
                  >
                    {user.name}
                  </p>
                ))}
              </div>
            </Grid>

            <Grid item xs={12}>
              <Typography sx={{ fontSize: '0.85rem' }}>Status</Typography>
              <FormControl fullWidth>
                <Select
                  required
                  value={tags}
                  variant="outlined"
                  size="small"
                  sx={{ fontSize: '2rem', bgcolor: 'white' }}
                  onChange={(e) => setTags(e.target.value)}
                  displayEmpty
                  renderValue={(selected) =>
                    selected ? selected : 'Type: Select'
                  }
                >
                  <CustomMenuItem value="In Progress">
                    In Progress
                  </CustomMenuItem>
                  <CustomMenuItem value="Pending">Pending</CustomMenuItem>
                  <CustomMenuItem value="Completed">Completed</CustomMenuItem>
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
              variant="outlined"
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
              variant="contained"
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

export default SubTaskForm;

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
