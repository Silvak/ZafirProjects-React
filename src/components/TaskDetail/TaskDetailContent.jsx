import React, { useState, useEffect } from 'react';
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
  Box,
} from '@mui/material';
import { EditOutlined as EditOutlinedIcon } from '@mui/icons-material';
import 'react-datepicker/dist/react-datepicker.css';
import { useBoundStore } from '../../stores';
import { shallow } from 'zustand/shallow';
import useSuggestionUsers from '../../hooks/useSuggestionUsers';
import './dataPicker.css';
import { format } from 'date-fns';
import CustomList from '../CustomList/CustomList';
import CustomAvatar from '@/components/CustomAvatar/CustomAvatar';
import SuggestionList from '../SuggestionList/SuggestionList';
import getUniqueUsers from '../../utils/getUniqueUsers';

const TaskDetailContent = ({
  task = {},
  projectId,
  isSubtask = false,
  setFilterSubtask,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const { users } = useSuggestionUsers();

  //  nombre del miembro
  const [member, setMember] = useState('');
  // miembros a renderizar
  const [members, setMembers] = useState(task['members_id'] || []);
  const [filteredMembers, setFilteredMembers] = useState([]);

  const initialFormData = {
    taskName: task.taskName || '',
    subtaskName: task.name || '',
    description: task.description || '',
    start: task.start ? format(new Date(task.start), 'yyyy-MM-dd') : '',
    end: task.end ? format(new Date(task.end), 'yyyy-MM-dd') : '',
    state: task.state || '',
    priority: task.priority || '',
    members_id: task.members_id || [],
  };

  const [formData, setFormData] = useState(initialFormData);

  const {
    updateTask,
    updateSubtask,
    selectedProject,
    ChangeStateAlert,
    ChangeTitleAlert,
    ChangeStateAlertError,
    ChangeTitleAlertError,
    ChangeStateModal,
  } = useBoundStore((state) => state, shallow);

  useEffect(() => {
    setMembers(task['members_id'] || []);
    setFormData({
      taskName: task.taskName || '',
      subtaskName: task.name || '',
      description: task.description || '',
      start: task.start ? format(new Date(task.start), 'yyyy-MM-dd') : '',
      end: task.end ? format(new Date(task.end), 'yyyy-MM-dd') : '',
      state: task.state || '',
      priority: task.priority || '',
      members_id: task.members_id || [],
    });
  }, [task]);

  const handleSuggestionChange = ({ inputValue }) => {
    if (inputValue === '') {
      setFilteredMembers([]);
    } else {
      const result = getUniqueUsers(users);
      const filter = result.filter((user) =>
        user.name.toUpperCase().startsWith(inputValue.toUpperCase())
      );
      setFilteredMembers(filter);
    }
  };

  const handleSuggestionClick = (user) => {
    if (!members.find((member) => member._id === user._id)) {
      setMembers((prev) => [...prev, user]);
      setFilteredMembers([]);
      setMember('');
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(initialFormData);
    setMembers(task['members_id'] || []);
  };

  const handleSubmit = async () => {
    const newValues = { ...formData, members_id: members };

    try {
      if (JSON.stringify(newValues) === JSON.stringify(initialFormData)) {
        ChangeStateAlertError(true);
        ChangeTitleAlertError('No changes were made');
      } else {
        if (!isSubtask) {
          await updateTask({
            taskId: task._id,
            newData: newValues,
            projectId: projectId,
          });
        } else {
          const updatedSubtasks = await updateSubtask({
            ...newValues,
            name: newValues.subtaskName,
            _id: task._id,
            taskId: task.taskId._id,
          });
          setFilterSubtask(updatedSubtasks);
        }
        setIsEditing(false);
        ChangeTitleAlert('Data has been updated successfully');
        ChangeStateAlert(true);
      }
    } catch (error) {
      ChangeTitleAlertError('Error: ' + error.message);
      ChangeStateAlertError(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRemoveMember = (memberToRemove) => {
    setMembers((prev) =>
      prev.filter((member) => member._id !== memberToRemove._id)
    );
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box sx={{ position: 'relative' }}>
          <TextField
            size="small"
            label="Search Member"
            fullWidth
            disabled={!isEditing}
            value={member}
            onChange={(e) => {
              setMember(e.target.value);
              handleSuggestionChange({ inputValue: e.target.value });
            }}
            sx={{ mt: 4 }}
            InputLabelProps={{
              sx: {
                color: isEditing ? 'inherit' : 'blue',
              },
            }}
          />
          <SuggestionList
            type="member"
            usersList={filteredMembers}
            onClick={handleSuggestionClick}
            top="80px"
          />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box
          sx={{
            display: 'flex',
            gap: '8px',
            marginBottom: '20px',
            cursor: isEditing ? 'pointer' : 'not-allowed',
            width: 'fit-content',
          }}
        >
          {members.map((member, key) => (
            <CustomAvatar
              key={key}
              member={member}
              size="40px"
              fontSize="14px"
              deleteMode={false}
              name={member.name}
              onClick={() => {
                isEditing && handleRemoveMember(member);
              }}
            />
          ))}
        </Box>
      </Grid>
      <Grid item xs={12}>
        <span>Name</span>
        <TextField
          size="small"
          name={isSubtask ? 'subtaskName' : 'taskName'}
          onChange={handleChange}
          value={isSubtask ? formData.subtaskName : formData.taskName}
          fullWidth
          disabled={!isEditing}
          InputLabelProps={{
            sx: {
              color: isEditing ? 'inherit' : 'blue',
            },
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <span>Description</span>
        <TextField
          size="small"
          name="description"
          onChange={handleChange}
          value={formData.description}
          fullWidth
          disabled={!isEditing}
          InputLabelProps={{
            sx: {
              color: isEditing ? 'inherit' : 'blue',
            },
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography sx={{ fontSize: '0.85rem' }}>Priority</Typography>
        <FormControl fullWidth sx={{ bgcolor: 'white' }}>
          <Select
            required
            variant="outlined"
            size="small"
            sx={{ fontSize: '2rem', bgcolor: 'white' }}
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            displayEmpty
            renderValue={(selected) => (selected ? selected : 'Type: All')}
            disabled={!isEditing}
          >
            <CustomMenuItem value="High">High</CustomMenuItem>
            <CustomMenuItem value="Medium">Medium</CustomMenuItem>
            <CustomMenuItem value="Low">Low</CustomMenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Typography sx={{ fontSize: '0.85rem' }}>State</Typography>
        <FormControl fullWidth>
          <Select
            required
            variant="outlined"
            size="small"
            sx={{ fontSize: '2rem', backgroundColor: 'white' }}
            name="state"
            value={formData.state}
            onChange={handleChange}
            displayEmpty
            renderValue={(selected) => (selected ? selected : 'Type: All')}
            disabled={!isEditing}
          >
            <CustomMenuItem value="In Progress">In Progress</CustomMenuItem>
            <CustomMenuItem value="Pending">Pending</CustomMenuItem>
            <CustomMenuItem value="Completed">Completed</CustomMenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Typography
          variant="h6"
          style={{
            fontSize: 14,
            fontWeight: 'normal',
            color: isEditing ? 'black' : 'darkgray',
          }}
        >
          Start date
        </Typography>
        <TextField
          size="small"
          name="start"
          type="date"
          value={formData.start}
          onChange={handleChange}
          disabled={!isEditing}
          sx={{
            width: '100%',
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography
          variant="h6"
          style={{
            fontSize: 14,
            fontWeight: 'normal',
            color: isEditing ? 'black' : 'darkgray',
          }}
        >
          End date
        </Typography>
        <TextField
          size="small"
          name="end"
          type="date"
          disabled={!isEditing}
          value={formData.end}
          onChange={handleChange}
          sx={{
            width: '100%',
          }}
        />
      </Grid>
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
              variant="outlined"
              color="primary"
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
              variant="contained"
              color="primary"
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
              color="primary"
              size="small"
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
    <MenuItem className="menu-item" sx={{ height: 'min-content' }} {...props}>
      {children}
    </MenuItem>
  );
};
