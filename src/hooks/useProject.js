import { useState } from "react";
import { createTheme, useMediaQuery } from "@mui/material";
import { useBoundStore } from "../stores";

export function useProject({ project, isCreated = false }) {
  const theme = createTheme();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const { User, addProject, updateProject, updateProjects, ChangeStateModal } =
    useBoundStore();

  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedMember, setSelectedMember] = useState("");
  const [teamMembers, setTeamMembers] = useState(project?.["members_id"] || []);
  const [teamLeaders, setLeaders] = useState(
    typeof project?.responsible === "string"
      ? [project?.responsible]
      : project?.responsible || []
  );
  const [formData, setFormData] = useState({
    name: project?.name || "",
    start: project?.start
      ? new Date(project.start).toISOString().substring(0, 10)
      : "",
    end: project?.end
      ? new Date(project.end).toISOString().substring(0, 10)
      : "",
    description: project?.description || "",
    link: project?.link || "",
    github: project?.github || "",
    leaders: teamLeaders,
    members: teamMembers,
  });

  const handleClose = () => {
    ChangeStateModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isCreated) {
        await addProject(User.uid, formData);
      } else {
        await updateProject(project?._id, formData);
      }
      // Después de que ambas operaciones asincrónicas se completen, cierra el modal
      await updateProjects();
      setIsLoading(false);
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLeaderToChange = (e) => {
    setSelectedUser(e.target.value);
  };
  const handleMemberToChange = (e) => {
    setSelectedMember(e.target.value);
  };

  const handleAddLeaders = () => {
    if (selectedUser && !teamLeaders.includes(selectedUser)) {
      setLeaders([...teamLeaders, selectedUser]);
      setSelectedUser("");
    }
  };
  const handleAddMembers = () => {
    if (selectedMember && !teamMembers.includes(selectedMember)) {
      setTeamMembers([...teamMembers, selectedMember]);
      setSelectedMember("");
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
    handleLeaderToChange,
    handleMemberToChange,
    handleAddLeaders,
    handleAddMembers,
    handleRemoveLeader,
    handleRemoveMember,
    isLoading,
    handleClose,
    selectedUser,
    selectedMember,
    teamMembers,
    teamLeaders,
  };
}
