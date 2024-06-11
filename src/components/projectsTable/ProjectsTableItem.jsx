import { Box, TableCell } from '@mui/material';
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

const ProjectsTableItem = ({ project }) => {
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
    await updateProjects(User?.uid);
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
      }}
    >
      <BoxFlex sx={{ flex: 2 }}>
        <Link
          to={`/project/${project?._id}`}
          style={{ color: 'inherit', textDecoration: 'none' }}
          onClick={() => handleSelectProject(project)}
        >
          <h2 className={css.projectName}>{project?.name}</h2>
        </Link>
      </BoxFlex>
      <BoxFlex>
        <CustomAvatar
          member={leader}
          bgColor={leader.colorBg}
          textColor={leader.colorText}
          deleteMode={false}
        />
        <p className={css.username}>{leader.name}</p>
      </BoxFlex>
      <BoxFlex>
        <MdCalendarMonth color='#6B6E75' size='20px' />
        <p className='date'>{fixStart}</p>
      </BoxFlex>

      <BoxFlex sx={{ gap: '20px' }}>
        <BsPen
          style={{ cursor: 'pointer' }}
          onClick={() => handleEdit(<EditProjectForm project={project} />)}
        />
        <BsTrash3
          style={{ cursor: 'pointer' }}
          onClick={() => handleDeleteProject(project)}
        />
      </BoxFlex>

      <BoxFlex>
        <div
          style={{
            width: '86px',
            height: '8px',
            backgroundColor: '#ECEFF3',
            borderRadius: '4px',
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

      {/* <BoxFlex>
          <MdAttachFile color='#6B6E75' size='20px' />
          <p> {attachments.length} files</p>1 files
        </BoxFlex> */}
      {/* <BoxFlex>
        {status.name === "In progress" ? (
          <div
            style={{
              width: "86px",
              height: "8px",
              backgroundColor: "#ECEFF3",
              borderRadius: "4px",
            }}
          >
            <div
              style={{
                width: `${status.percentage}%`,
                height: "100%",
                backgroundColor: "#00913f",
                borderRadius: "inherit",
              }}
            />
          </div>
        ) : (
          <div
            style={{
              backgroundColor: "#FFEBEA",
              borderRadius: "10px",
              padding: "10px",
            }}
          >
            <span style={{ color: "#E55D57" }}>Issues</span>
          </div>
        )}
      </BoxFlex> */}
    </TableCell>
  );
};
export default ProjectsTableItem;
