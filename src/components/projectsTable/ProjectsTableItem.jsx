import { Box, TableCell, Tooltip } from '@mui/material';
import { fixDate } from '@/utils/fixDate';
import { BsPen, BsTrash3 } from 'react-icons/bs';
//styles
import css from './styles.module.css';
//icons
import { MdAttachFile, MdCalendarMonth } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { useBoundStore } from '../../stores';
import { shallow } from 'zustand/shallow';
import CustomAvatar from '../CustomAvatar/CustomAvatar';
import { useProjectsOverview } from '../../hooks/useProjectsOverview';
import EditProjectForm from '../forms/EditProjectForm';
import ConfirmForm from '../forms/ConfirmForm';

const BoxFlex = ({ children, sx }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: '10px',
        flex: 1,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

const ProjectsTableItem = ({ project, isJoined }) => {
  const {
    selectedProjectById,
    updateProjects,
    User,
    setSelectedProject,
    ChangeStateModal,
    ChangeTitleAlert,
    ChangeStateAlert,
    ChangeTitleModal,
    ChangeContentModal,
    deleteProject,
  } = useBoundStore((state) => state, shallow);
  const { handleEdit } = useProjectsOverview();

  const handleSelectProject = async (project) => {
    setSelectedProject(project);
  };

  const { fixStart } = fixDate(project?.start);
  const leader = project?.leaders;
  const percentage = 0;

  const handleConfirmDelete = async (projectToDelete) => {
    try {
      await deleteProject(projectToDelete?._id);
      await updateProjects(User?.uid);
      ChangeStateModal(false);
      ChangeTitleAlert('Project successfully removed');
      ChangeStateAlert(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelDelete = () => {
    ChangeStateModal(false);
  };

  const handleDeleteProject = (projectToDelete) => {
    ChangeTitleModal('');
    ChangeContentModal(
      <ConfirmForm
        handleCancelDelete={handleCancelDelete}
        handleConfirmDelete={handleConfirmDelete}
        itemToDelete={projectToDelete}
      />
    );
    ChangeStateModal(true);
  };

  return (
    <TableCell
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: '10px',
        paddingLeft: 0,
        borderRadius: '12px',
        ':hover': {
          background: '#F6F7FA',
        },
      }}
    >
      <BoxFlex sx={{ flex: 1 }}>
        <Link
          to={`/project/${project?._id}/${
            project.membershipType === 'leader' ? 'tasks' : 'MyTasks'
          }`}
          style={{ color: 'inherit', textDecoration: 'none', width: '20rem' }}
          onClick={() => handleSelectProject(project)}
        >
          <Tooltip title={project?.description} placement="bottom-start">
            <h2 className={css.projectName}>
              {project?.name.slice(0, 30)}
              {project?.name.length > 30 ? '...' : ''}
            </h2>
          </Tooltip>
        </Link>
      </BoxFlex>
      <BoxFlex sx={{ minWidth: 'max-content' }}>
        <CustomAvatar
          member={leader}
          bgColor={leader?.colorBg}
          textColor={leader?.colorText}
          deleteMode={false}
          size="38px"
        />
        <p className={css.username} style={{ width: '14rem' }}>
          {leader?.name.slice(0, 24)}
          {leader?.name.length > 24 ? '...' : ''}
        </p>
      </BoxFlex>
      <BoxFlex sx={{ mr: 3 }}>
        <MdCalendarMonth color="#6B6E75" size="20px" />
        <p className="date">{fixStart}</p>
      </BoxFlex>

      {!isJoined && (
        <BoxFlex sx={{ gap: 2, mr: 3 }}>
          <BsPen
            title="Edit project"
            style={{ cursor: 'pointer' }}
            onClick={() => handleEdit(<EditProjectForm project={project} />)}
          />

          <BsTrash3
            title="Delete project"
            style={{ cursor: 'pointer' }}
            onClick={() => handleDeleteProject(project)}
          />
        </BoxFlex>
      )}

      <BoxFlex>
        <div
          style={{
            width: '86px',
            height: '8px',
            backgroundColor: '#ECEFF3',
            borderRadius: '4px',
            marginRight: 2,
          }}
        >
          <div
            style={{
              width: `${percentage}%`,
              height: '100%',
              backgroundColor: '#00913f',
              borderRadius: 'inherit',
            }}
          />
        </div>
      </BoxFlex>
    </TableCell>
  );
};
export default ProjectsTableItem;
