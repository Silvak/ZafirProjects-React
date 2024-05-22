import validateCreateProject from '@/utils/validateCreateProject';
import useSuggestionUsers from '@/hooks/useSuggestionUsers';
import { createTheme, useMediaQuery } from '@mui/material';
import { useState } from 'react';
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
    INITIAL_SELECTED_MEMBER,
  } = useSuggestionUsers();

  const [isLoading, setIsLoading] = useState(false);
  const [teamMembers, setTeamMembers] = useState(project?.['members_id'] || []);
  const [teamLeaders, setLeaders] = useState(
    typeof project?.responsible === 'string'
      ? [project?.responsible]
      : project?.responsible || []
  );
  const [formData, setFormData] = useState({
    name: project?.name || '',
    start: project?.start
      ? new Date(project.start).toISOString().substring(0, 10) //format date
      : '',
    end: project?.end
      ? new Date(project.end).toISOString().substring(0, 10) //format date
      : '',
    description: project?.description || '',
    link: project?.link || '',
    github: project?.github || '',
    leaders: teamLeaders,
    members: teamMembers,
  });

  const handleClose = () => {
    ChangeStateModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isCreated) {
        const isValid = validateCreateProject(formData);

        if (!isValid) {
          ChangeTitleAlertError('Faltan ingresar datos');
          ChangeStateAlertError(true);
        } else {
          await addProject(User.uid, formData);
          await updateProjects();
          setIsLoading(false);
          handleClose();
        }
      } else {
        setIsLoading(true);

        await updateProject(project?._id, formData);
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const handleMemberToChange = (e) => {
    setSelectedMember(e.target.value);
  };

  const handleAddLeaders = () => {
    if (selectedLeader && !teamLeaders.includes(selectedLeader)) {
      setLeaders([...teamLeaders, selectedLeader]);
      setSelectedLeader(INITIAL_SELECTED_MEMBER);
      resetSuggestions('leader');
    }
  };

  const handleAddMembers = () => {
    if (selectedMember && !teamMembers.includes(selectedMember)) {
      setTeamMembers([...teamMembers, selectedMember._id]);
      setSelectedMember(INITIAL_SELECTED_MEMBER);
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
    const updatedMembers = teamMembers.filter(
      (member) => member !== memberToRemove
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
  };
}
