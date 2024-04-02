import { createTheme, useMediaQuery } from "@mui/material";
import { useBoundStore } from "../stores";
import { useEffect } from "react";

export function useProjectsOverview() {
  const theme = createTheme();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const {
    projectsData,
    fetchProjects,
    ChangeStateModal,
    ChangeContentModal,
    ChangeTitleModal,
  } = useBoundStore();

  const handleEdit = (element) => {
    ChangeTitleModal("Edit Project");
    ChangeContentModal(element);
    ChangeStateModal(true);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projectsData,
    handleEdit,
    isMobile,
    theme,
  };
}
