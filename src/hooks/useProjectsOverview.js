import { createTheme, useMediaQuery } from '@mui/material';
import { useBoundStore } from '../stores';
import { shallow } from 'zustand/shallow';
import { useEffect } from 'react';

export function useProjectsOverview() {
  const theme = createTheme();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const {
    projectsData,
    fetchProjects,
    updateProjects,
    deleteProject,
    ChangeStateModal,
    ChangeContentModal,
    ChangeTitleModal,
  } = useBoundStore((state) => state, shallow);

  const handleEdit = (element) => {
    ChangeTitleModal('Edit Project');
    ChangeContentModal(element);
    ChangeStateModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteProject(id);
      await updateProjects();
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {
  //   fetchProjects();
  // }, []);

  return {
    projectsData,
    handleEdit,
    handleDelete,
    isMobile,
    theme,
  };
}
