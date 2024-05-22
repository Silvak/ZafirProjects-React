import { useState } from 'react';
import { createTheme, useMediaQuery, useTheme } from '@mui/material';
import { useBoundStore } from '../stores';
import { shallow } from 'zustand/shallow';

export function useCreateTask(task, id) {
  const theme = useTheme();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const {
    addTask,
    setTask,
    removeTask,
    updateTask,
    fetchTask,
    ChangeStateModal,
  } = useBoundStore((state) => state, shallow);
  const [selectedDate, setSelectedDate] = useState(null);

  const [taskName, setTaskName] = useState(placeholderTaskName);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [tags, setTags] = useState('');

  const [taskData, setTaskData] = useState({
    data: {
      taskName: taskName,
      description: description,
      priority: priority,
      tags: tags,
    },
    start: startDate,
    end: endDate,
    state: tags,
    projectId: id,
  });

  const [selectedUser, setSelectedUser] = useState('');
  const [teamMembers, setTeamMembers] = useState([]);

  const handleCreate = async () => {
    try {
      await addTask(taskData);
    } catch (error) {
      console.error('Error creating task', error);
    }
    handleClose();
  };

  const handleClose = () => {
    ChangeStateModal(false);
  };

  const handleAssignToChange = (e) => {
    setSelectedUser(e.target.value);
  };

  const handleAddMember = () => {
    if (selectedUser && !teamMembers.includes(selectedUser)) {
      setTeamMembers([...teamMembers, selectedUser]);
      setSelectedUser('');
    }
  };

  const handleRemoveMember = (memberToRemove) => {
    const updatedMembers = teamMembers.filter(
      (member) => member !== memberToRemove
    );
    setTeamMembers(updatedMembers);
  };

  return {
    theme,
    isMobile,
    selectedDate,
    taskName,
    startDate,
    endDate,
    description,
    priority,
    tags,
    taskData,
    selectedUser,
    teamMembers,
    handleCreate,
    handleClose,
    handleAssignToChange,
    handleAddMember,
    handleRemoveMember,
  };
}
