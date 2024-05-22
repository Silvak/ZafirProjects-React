import React, { useState, useRef, useEffect } from 'react';
import {
  Grid,
  IconButton,
  Button,
  TextField,
  Typography,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import { EditOutlined as EditOutlinedIcon } from '@mui/icons-material';
import 'react-datepicker/dist/react-datepicker.css';
import { useBoundStore } from '../../stores';
import './dataPicker.css';
import { useProject } from '@/hooks/useProject';
import { format } from 'date-fns';

const TaskDetailContent = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [originalValues, setOriginalValues] = useState({
    taskName: '',
    description: '',
    start: '',
    end: '',
    state: '',
    priority: '',
  });

  const {
    updateTask,
    selectedProject,
    ChangeStateAlert,
    ChangeTitleAlert,
    ChangeStateAlertError,
    ChangeTitleAlertError,
    ChangeStateModal,
  } = useBoundStore();

  const {
    selectedMember,
    setSelectedMember,
    filteredMembers,
    handleSuggestionChange,
    handleSuggestionClick,
    INITIAL_SELECTED_MEMBER,
  } = useProject({ project: null, isCreated: true });

  useEffect(() => {
    setOriginalValues({
      taskName: task.taskName,
      description: task.description,
      start: format(new Date(task.start), 'yyyy/MM/dd'),
      end: format(new Date(task.end), 'yyyy/MM/dd'),
      state: task.state,
      priority: task.priority,
    });
    setSelectedMember(task.members[0]);
    console.log('TASK', task);

    return () => {
      setOriginalValues(INITIAL_SELECTED_MEMBER);
    };
  }, [task._id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setOriginalValues({
      taskName: task.taskName,
      description: task.description,
      end: task.end,
      state: task.state,
      priority: task.priority,
    });
    setIsEditing(false);
    // reset to original value from task
    setSelectedMember(task.members[0]);
  };

  const handleSave = async () => {
    const members = [selectedMember._id];
    const newValues = { ...originalValues, members };
    const params = selectedProject._id;

    console.log('newvalues', newValues);
    setIsEditing(false);
    try {
      await updateTask({
        taskId: task._id,
        newData: newValues,
        projectId: params,
      });
      setTimeout(() => {
        ChangeTitleAlert('Data has been updated successfully');
        ChangeStateAlert(true);
        ChangeStateModal(false);
      }, 1000);
    } catch (error) {
      ChangeTitleAlertError('Error:', error.message);
      ChangeStateAlertError(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOriginalValues({ ...originalValues, [name]: value });
  };

  return (
    <Grid container spacing={3}>
      {/* MEMBER */}
      <Grid item xs={12}>
        {isEditing ? (
          <TextField
            size='small'
            label='Member'
            value={selectedMember && selectedMember.name}
            placeholder={task.members[0].name}
            onChange={(e) => handleSuggestionChange(e, 'member')}
            fullWidth
            disabled={!isEditing}
            sx={{ mt: 4 }}
            InputLabelProps={{
              sx: {
                color: isEditing ? 'inherit' : 'blue',
              },
            }}
          />
        ) : (
          <TextField
            size='small'
            label='Member'
            value={task.members[0].name}
            onChange={(e) => handleSuggestionChange(e, 'member')}
            fullWidth
            disabled={!isEditing}
            sx={{ mt: 4 }}
            InputLabelProps={{
              sx: {
                color: isEditing ? 'inherit' : 'blue',
              },
            }}
          />
        )}

        <div
          style={{
            marginLeft: 4,
            cursor: 'pointer',
            backgroundColor: 'white',
            borderRadius: 12,
          }}
        >
          {filteredMembers.slice(0, 3).map((user) => (
            <p
              key={user.id}
              style={{ marginTop: 4 }}
              onClick={() => handleSuggestionClick(user, 'member')}
            >
              {user.name}
            </p>
          ))}
        </div>
      </Grid>
      {/* TASK NAME */}
      <Grid item xs={12}>
        <TextField
          size='small'
          label='Task Name'
          value={originalValues.taskName}
          name='taskName'
          fullWidth
          autoFocus
          onChange={handleChange}
          disabled={!isEditing}
          InputLabelProps={{
            sx: {
              color: isEditing ? 'inherit' : 'blue',
            },
          }}
        />
      </Grid>
      {/* DESCRIPTION */}
      <Grid item xs={12}>
        <TextField
          size='small'
          label='Task description'
          name='description'
          value={originalValues.description}
          onChange={handleChange}
          fullWidth
          autoFocus
          disabled={!isEditing}
          InputLabelProps={{
            sx: {
              color: isEditing ? 'inherit' : 'blue',
            },
          }}
        />
      </Grid>
      {/* PRIORITY*/}
      <Grid item xs={12}>
        <Typography sx={{ fontSize: '0.85rem' }}>Priority</Typography>
        <FormControl fullWidth sx={{ bgcolor: 'white' }}>
          <Select
            required
            value={originalValues.priority}
            variant='outlined'
            size='small'
            sx={{ fontSize: '2rem', bgcolor: 'white' }}
            name='priority'
            onChange={handleChange}
            displayEmpty
            renderValue={(selected) => (selected ? selected : 'Type: All')}
            disabled={!isEditing}
          >
            <CustomMenuItem value='High'>High</CustomMenuItem>
            <CustomMenuItem value='Medium'>Medium</CustomMenuItem>
            <CustomMenuItem value='Low'>Low</CustomMenuItem>
          </Select>
        </FormControl>
      </Grid>
      {/* STATE */}
      <Grid item xs={12}>
        <Typography sx={{ fontSize: '0.85rem' }}>State</Typography>
        <FormControl fullWidth>
          <Select
            required
            value={originalValues.state}
            variant='outlined'
            size='small'
            sx={{ fontSize: '2rem', backgroundColor: 'white' }}
            name='state'
            onChange={handleChange}
            displayEmpty
            renderValue={(selected) => (selected ? selected : 'Type: All')}
            disabled={!isEditing}
          >
            <CustomMenuItem value='In Progress'>In Progress</CustomMenuItem>
            <CustomMenuItem value='Pending'>Pending</CustomMenuItem>
            <CustomMenuItem value='Completed'>Completed</CustomMenuItem>
          </Select>
        </FormControl>
      </Grid>
      {/* START */}
      <Grid item xs={12}>
        <Typography
          variant='h6'
          style={{
            fontSize: 14,
            fontWeight: 'normal',
            color: isEditing ? 'black' : 'darkgray',
          }}
        >
          Start date
        </Typography>
        <TextField
          size='small'
          name='start'
          type={isEditing ? 'date' : 'text'}
          onChange={handleChange}
          value={originalValues.start}
          disabled={!isEditing}
          sx={{
            width: '100%',
          }}
        />
      </Grid>
      {/* END */}
      <Grid item xs={12}>
        <Typography
          variant='h6'
          style={{
            fontSize: 14,
            fontWeight: 'normal',
            color: isEditing ? 'black' : 'darkgray',
          }}
        >
          End date
        </Typography>
        <TextField
          size='small'
          name='end'
          type={isEditing ? 'date' : 'text'}
          value={originalValues.end}
          disabled={!isEditing}
          onChange={handleChange}
          sx={{
            width: '100%',
          }}
        />
      </Grid>
      {/* BUTTONS */}
      <Grid item xs={12}>
        {isEditing ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              justifyContent: 'space-around',
            }}
          >
            <Button
              variant='outlined'
              color='primary'
              onClick={handleCancel}
              disableRipple
              style={{
                paddingInline: '1.5rem',
                borderRadius: 10,
              }}
            >
              Cancel
            </Button>
            <Button
              variant='contained'
              color='primary'
              onClick={handleSave}
              disableRipple
              style={{
                color: 'white',
                paddingInline: '2rem',
                borderRadius: 10,
              }}
            >
              Save
            </Button>
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              justifyContent: 'center',
            }}
          >
            <IconButton
              disableRipple
              color='primary'
              size='small'
              sx={{
                '&:hover': {
                  color: 'blue',
                  transition: 'color 0.1s',
                },
              }}
              style={{
                cursor: 'pointer',
                gap: 8,
              }}
              onClick={handleEdit}
            >
              <EditOutlinedIcon />
              Edit Task
            </IconButton>
          </div>
        )}
      </Grid>
    </Grid>
  );
};

export default TaskDetailContent;

const CustomMenuItem = ({ children, selected, ...props }) => {
  return (
    <MenuItem
      sx={{
        height: 'min-content',
        bgcolor: 'white',
        color: selected ? 'black' : 'gray',
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
