import { useEffect, useState } from 'react';
import { shallow } from 'zustand/shallow';
import { createTheme, useMediaQuery } from '@mui/material';
import useSuggestionUsers from './useSuggestionUsers';
import { useBoundStore } from '../stores';

const INITIAL_FORM_DATA = {
  name: '',
  start: '',
  end: '',
  description: '',
  leaders: '',
};

export function useEditProject(project) {
  const theme = createTheme();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const {
    User,
    addProject,
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
  }, [project._id]);

  const handleSuggestionChange = ({ inputValue, type }) => {
    // for input leader
    if (type === 'leader') {
      if (inputValue === '') {
        setFilteredLeaders([]);
      } else {
        const filter = users.filter((user) => {
          return user.name.toUpperCase().startsWith(inputValue.toUpperCase());
        });
        setFilteredLeaders(filter);
      }
    } // for input member
    else if (type === 'member') {
      if (inputValue === '') {
        setFilteredMembers([]);
      } else {
        const filter = users.filter((user) => {
          return user.name.toUpperCase().startsWith(inputValue.toUpperCase());
        });
        setFilteredMembers(filter);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const newValues = {
        ...formData,
        leaders: formData.leaders._id,
        members_id: members,
      };

      const isEqual = {
        ...originalValues,
        leaders: formData.leaders._id,
        members_id: project['members_id'],
      };
      console.log(newValues, isEqual);
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
        await updateProjects();
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

  const handleSuggestionClick = (user, type) => {
    if (type === 'leader') {
      setFormData({ ...formData, leaders: user });
      setFilteredLeaders([]);
    } else {
      setMembers((prev) => [...prev, { _id: { ...user } }]);
      setFilteredMembers([]);
      setMember(''); // Limpiar el campo de entrada después de seleccionar un miembro
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
    members,
    filteredLeaders,
    filteredMembers,
    formData,
    handleSuggestionChange,
    handleSubmit,
    handleChange,
    handleSuggestionClick,
    handleRemoveMember,
    handleClose
  };
}
