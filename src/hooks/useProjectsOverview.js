import { createTheme, useMediaQuery } from '@mui/material';
import { useBoundStore } from '../stores';
import { shallow } from 'zustand/shallow';
import { useEffect } from 'react';
import ConfirmForm from '../components/forms/ConfirmForm';

export function useProjectsOverview() {
  const theme = createTheme();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const {
    User,
    projectsData,
    fetchProjects,
    updateProjects,
    deleteProject,
    ChangeStateModal,
    ChangeContentModal,
    ChangeTitleModal,
    ChangeTitleAlert,
    ChangeStateAlert,
  } = useBoundStore((state) => state, shallow);

  const handleEdit = (element) => {
    ChangeTitleModal('Edit Project');
    ChangeContentModal(element);
    ChangeStateModal(true);
  };

  return {
    projectsData,
    handleEdit,
    isMobile,
    theme,
  };
}
