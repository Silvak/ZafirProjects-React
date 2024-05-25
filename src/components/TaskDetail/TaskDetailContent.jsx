import React, { useState, useRef, useEffect } from 'react';
import {
  Grid,
  IconButton,
  Avatar,
  Button,
  TextField,
  Typography,
  FormControl,
  Select,
  MenuItem,
  ListItem,
  Box,
} from '@mui/material';
import { EditOutlined as EditOutlinedIcon } from '@mui/icons-material';
import 'react-datepicker/dist/react-datepicker.css';
import { useBoundStore } from '../../stores';
import { shallow } from 'zustand/shallow';
import useSuggestionUsers from '../../hooks/useSuggestionUsers';
import './dataPicker.css';
import { useProject } from '@/hooks/useProject';
import { format } from 'date-fns';
import CustomList from '../CustomList/CustomList';
import user1 from '../../assets/Img/png/userImageMan.png';

const TaskDetailContent = ({ task = {} }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { users } = useSuggestionUsers();
  //  filtro para mostrar en la lista
  const [filteredMembers, setFilteredMembers] = useState([]);
  //  nombre del miembro
  const [member, setMember] = useState('');
  // miembros a renderizar
  const [members, setMembers] = useState(task['members_id']);
  const [formData, setFormData] = useState(task);

  const {
    updateTask,
    selectedProject,
    ChangeStateAlert,
    ChangeTitleAlert,
    ChangeStateAlertError,
    ChangeTitleAlertError,
    ChangeStateModal,
  } = useBoundStore((state) => state, shallow);

  useEffect(() => {
    // setOriginalValues({
    //   taskName: task.taskName,
    //   description: task.description,
    //   start: format(new Date(task.start), 'yyyy/MM/dd'),
    //   end: format(new Date(task.end), 'yyyy/MM/dd'),
    //   state: task.state,
    //   priority: task.priority,
    // });
    // setSelectedMember(task.members[0]);
    // console.log('TASK', task);
    // return () => {
    //   setOriginalValues(INITIAL_SELECTED_MEMBER);
    // };
  }, [task._id]);

  const handleSuggestionChange = ({ inputValue }) => {
    // for input member

    if (inputValue === '') {
      setFilteredMembers([]);
    } else {
      const filter = users.filter((user) => {
        return user.name.toUpperCase().startsWith(inputValue.toUpperCase());
      });
      setFilteredMembers(filter);
    }
  };

  const handleSuggestionClick = (user) => {
    setMembers((prev) => [...prev, user]);
    setFilteredMembers([]);
    setMember(''); // Limpiar el campo de entrada después de seleccionar un miembro
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(task);
  };

  const handleSubmit = async () => {
    console.log(formData);
    // const members = [selectedMember._id];
    // const newValues = { ...originalValues, members };
    // const params = selectedProject?._id;
    // console.log('newvalues', newValues);
    // setIsEditing(false);
    // try {
    //   await updateTask({
    //     taskId: task._id,
    //     newData: newValues,
    //     projectId: params,
    //   });
    //   setTimeout(() => {
    //     ChangeTitleAlert('Data has been updated successfully');
    //     ChangeStateAlert(true);
    //     ChangeStateModal(false);
    //   }, 1000);
    // } catch (error) {
    //   ChangeTitleAlertError('Error:', error.message);
    //   ChangeStateAlertError(true);
    // }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRemoveMember = (memberToRemove) => {
    const updatedMembers = members.filter(
      (member) => member._id.toString() !== memberToRemove._id.toString()
    );
    setMembers(updatedMembers);
  };

  return (
    <Grid container spacing={3}>
      {/* MEMBER */}
      <Grid item xs={12}>
        <Box sx={{ position: 'relative' }}>
          {isEditing ? (
            <TextField
              size='small'
              label='Search Member'
              fullWidth
              disabled={!isEditing}
              value={member}
              onChange={(e) => {
                setMember(e.target.value);
                handleSuggestionChange({
                  inputValue: e.target.value,
                });
              }}
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
              label='Search Member'
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
          {members.map((member) => (
            <Avatar
              title='Remove'
              key={member._id}
              src={user1}
              onClick={() => {
                console.log('member', member);
                handleRemoveMember(member);
              }}
              style={{ transition: 'opacity 0.3s ease-in-out' }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = '0.7')}
              onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
            />
          ))}
        </Box>
      </Grid>
      {/* TASK NAME */}
      <Grid item xs={12}>
        <TextField
          size='small'
          label='Task Name'
          name='taskName'
          value={formData.taskName}
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
          onChange={handleChange}
          value={formData.description}
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
            variant='outlined'
            size='small'
            sx={{ fontSize: '2rem', bgcolor: 'white' }}
            name='priority'
            value={formData.priority}
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
            variant='outlined'
            size='small'
            sx={{ fontSize: '2rem', backgroundColor: 'white' }}
            name='state'
            value={formData.state}
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
          value={formData.start}
          onChange={handleChange}
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
          disabled={!isEditing}
          value={formData.end}
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
              onClick={handleSubmit}
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
