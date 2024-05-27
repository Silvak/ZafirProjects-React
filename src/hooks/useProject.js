import validateCreateProject from '@/utils/validateCreateProject';
import useSuggestionUsers from '@/hooks/useSuggestionUsers';
import { createTheme, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { useBoundStore } from '../stores';
import { shallow } from 'zustand/shallow';

export function useProject({ project, isCreated = false }) {
  const theme = createTheme();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const {
    User,
    addProject,
    updateProject,
    updateProjects,
    ChangeStateModal,
    ChangeTitleAlertError,
    ChangeStateAlertError,
  } = useBoundStore((state) => state, shallow);

  const {
    selectedLeader,
    setSelectedLeader,
    selectedMember,
    setSelectedMember,
    filteredLeaders,
    filteredMembers,
    handleSuggestionChange,
    handleSuggestionClick,
    resetSuggestions,
    INITIAL_SELECTED_USER,
  } = useSuggestionUsers();

  const [isLoading, setIsLoading] = useState(false);
  // para renderizar los iconos
  const [teamMembers, setTeamMembers] = useState(
    project?.['members_id'].map((member) => member._id) || []
  );
  const [teamLeaders, setLeaders] = useState(project.leaders);
  
  const [formData, setFormData] = useState({
    name: project?.name || '',
    start: project?.start
      ? new Date(project.start).toISOString().substring(0, 10) //format date
      : '',
    end: project?.end
      ? new Date(project.end).toISOString().substring(0, 10) //format date
      : '',
    description: project?.description || '',
  });

  const handleClose = () => {
    ChangeStateModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setIsLoading(true);
    console.log({
      ...formData,
      members_id: teamMembers,
      leaders: selectedLeader._id,
    });

    // try {
    //   if (isCreated) {
    //     const isValid = validateCreateProject(formData);

    //     if (!isValid) {
    //       ChangeTitleAlertError('Faltan ingresar datos');
    //       ChangeStateAlertError(true);
    //     } else {
    //       const data = {
    //         ...formData,
    //         members_id: teamMembers,
    //         leaders: selectedLeader._id,
    //       };
    //       await addProject(User.uid, data);
    //       await updateProjects();
    //     }
    //   } else {
    //     const data = {
    //       ...formData,
    //       members_id: teamMembers,
    //       leaders: teamLeaders._id,
    //     };
    //     await updateProject(project?._id, data);
    //     await updateProjects();
    //   }
    // } catch (error) {
    //   console.error(error);
    // } finally {
    //   setIsLoading(false);
    //   handleClose();
    // }
  };

  const handleMemberToChange = (e) => {
    setSelectedMember(e.target.value);
  };

  const handleAddLeaders = () => {
    console.log('selectedLeader', selectedLeader);
    if (selectedLeader && !teamLeaders.includes(selectedLeader)) {
      setLeaders([...teamLeaders, selectedLeader]);
      setSelectedLeader(INITIAL_SELECTED_USER);
      resetSuggestions('leader');
    }
  };

  const handleAddMembers = () => {
    console.log('selectedmember', selectedMember);
    if (selectedMember && !teamMembers.includes(selectedMember._id)) {
      setTeamMembers([...teamMembers, selectedMember._id]);
      setSelectedMember(INITIAL_SELECTED_USER);
      resetSuggestions('member');
    }
  };

  const handleRemoveLeader = (memberToRemove) => {
    const updatedMembers = teamLeaders.filter(
      (member) => member !== memberToRemove
    );
    setLeaders(updatedMembers);
  };

  const handleRemoveMember = (memberToRemove) => {
    console.log(
      'memberToRemove:',
      memberToRemove,
      'type:',
      typeof memberToRemove
    );

    const updatedMembers = teamMembers.filter(
      (member) => member.toString() !== memberToRemove.toString()
    );
    setTeamMembers(updatedMembers);
  };

  const handleChange = (event) => {
    const eventName = event.target.name;
    const eventValue = event.target.value;

    setFormData({
      ...formData,
      [eventName]: eventValue,
    });

    // console.log(formData);
  };

  return {
    theme,
    isMobile,
    formData,
    handleChange,
    handleSubmit,
    handleMemberToChange,
    handleAddLeaders,
    handleAddMembers,
    handleRemoveLeader,
    handleRemoveMember,
    isLoading,
    handleClose,
    selectedMember,
    teamMembers,
    teamLeaders,
    selectedLeader,
    setSelectedLeader,
    selectedMember,
    setSelectedMember,
    filteredLeaders,
    filteredMembers,
    handleSuggestionChange,
    handleSuggestionClick,
    INITIAL_SELECTED_USER,
  };
}
