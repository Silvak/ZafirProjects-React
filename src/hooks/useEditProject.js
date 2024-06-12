import { useEffect, useState } from 'react';
import { shallow } from 'zustand/shallow';
import { createTheme, useMediaQuery } from '@mui/material';
import useSuggestionUsers from './useSuggestionUsers';
import { useBoundStore } from '../stores';
import getUniqueUsers from '../utils/getUniqueUsers';

const INITIAL_FORM_DATA = {
  name: '',
  start: '',
  end: '',
  description: '',
};

export function useEditProject(project) {
  const theme = createTheme();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const {
    User,
    updateProject,
    updateProjects,
    ChangeStateModal,
    ChangeTitleAlert,
    ChangeStateAlert,
    ChangeTitleAlertError,
    ChangeStateAlertError,
  } = useBoundStore((state) => state, shallow);

  const { users } = useSuggestionUsers();

  const [isLoading, setIsLoading] = useState(false);

  //  filtro para mostrar en la lista
  const [filteredLeaders, setFilteredLeaders] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  //  detalles del miembro {}
  const [member, setMember] = useState('');
  // miembros a renderizar
  const [members, setMembers] = useState(project['members_id']);

  const [originalValues, setOriginalValues] = useState(INITIAL_FORM_DATA);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  useEffect(() => {
    setFormData({
      name: project.name,
      start: project.start
        ? new Date(project.start).toISOString().substring(0, 10) //format date
        : '',
      end: project.end
        ? new Date(project.end).toISOString().substring(0, 10) //format date
        : '',
      description: project.description,
      leaders: project.leaders,
    });
    setOriginalValues({
      name: project.name,
      start: project.start
        ? new Date(project.start).toISOString().substring(0, 10) //format date
        : '',
      end: project.end
        ? new Date(project.end).toISOString().substring(0, 10) //format date
        : '',
      description: project.description,
      leaders: project.leaders,
    });
    // reseteamos estados al desmontar componente
    return () => {
      setFormData(INITIAL_FORM_DATA);
      setOriginalValues(INITIAL_FORM_DATA);
    };
  }, []);

  const handleSuggestionChange = ({ inputValue }) => {
    if (inputValue === '') {
      setFilteredMembers([]);
    } else {
      const result = getUniqueUsers(users);
      const filter = result.filter((user) => {
        return user.name.toUpperCase().startsWith(inputValue.toUpperCase());
      });
      setFilteredMembers(filter);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const newValues = {
        ...formData,
        members_id: members,
      };
      const isEqual = {
        ...originalValues,
        members_id: project['members_id'],
      };
      // verificar si hay cambios
      if (JSON.stringify(newValues) === JSON.stringify(isEqual)) {
        ChangeStateAlertError(true);
        ChangeTitleAlertError('No changes were made');
        setIsLoading(false);
        setTimeout(() => {
          ChangeStateAlertError(false);
          ChangeTitleAlertError('');
        }, 1500);
        return;
      } else {
        await updateProject(project._id, newValues);
        await updateProjects(User?.uid);
        ChangeStateAlert(true);
        ChangeTitleAlert('Data has been updated successfully');
        ChangeStateModal(false);
        setTimeout(() => {
          ChangeStateAlert(false);
          ChangeTitleAlert('');
        }, 1500);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClose = () => {
    ChangeStateModal(false);
  };

  const handleSuggestionClick = (user) => {
    const alreadyExist = members.find(
      (member) => member._id._id.toString() === user._id.toString()
    );
    if (alreadyExist === undefined) {
      setMembers((prev) => [...prev, { _id: { ...user } }]);
      setFilteredMembers([]);
      setMember('');
    } else {
      return;
    }
  };

  const handleRemoveMember = (memberToRemove) => {
    const updatedMembers = members.filter(
      (member) =>
        member._id._id.toString() !== memberToRemove._id._id.toString()
    );
    setMembers(updatedMembers);
  };

  return {
    theme,
    isMobile,
    isLoading,
    member,
    setMember,
    members,
    filteredLeaders,
    filteredMembers,
    formData,
    handleSuggestionChange,
    handleSubmit,
    handleChange,
    handleSuggestionClick,
    handleRemoveMember,
    handleClose,
  };
}
