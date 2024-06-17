import { Box, TableCell, useMediaQuery } from '@mui/material';
import { RenderProjectItems } from './RenderProjectItems';
import { BsPen, BsTrash3 } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useBoundStore } from '../../stores';
import { shallow } from 'zustand/shallow';

const ProjectItemsOverview = ({
  handleEdit,
  handleDelete,
  project,
  // quantityTasks,
  // category,
}) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const { selectedProjectById, updateProjects, User, setSelectedProject } =
    useBoundStore((state) => state, shallow);

  const handleSelectProject = async (project) => {
    setSelectedProject(project);
  };

  return (
    <TableCell
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: 'none',
        '&:hover': {
          backgroundColor: '#F6F7FA',
          cursor: 'pointer',
        },
        height: 'auto',
        width: '100%',
        padding: '8px 8px 4px 8px',
        borderRadius: '8px',
      }}
    >
      {/* <div
          style={{
            display: isMobile ? "flex" : "grid",
            placeContent: "center",
            backgroundColor: "#ECE9FF",
            borderRadius: "12px",
            padding: "10px",
            width: isMobile ? "auto" : "",
            justifyContent: isMobile ? "center" : "",
          }}
          onClick={() => alert("ir al proyecto")}
        >
          <RenderProjectItems category={category} />
        </div> */}
      <Link
        to={`/project/${project?._id}/${
          project.membershipType === 'leader' ? 'tasks' : 'MyTasks'
        }`}
        style={{ color: 'inherit', textDecoration: 'none' }}
        onClick={() => handleSelectProject(project)}
      >
        <Box>
          <div
          // onClick={() => navigate(`/project/${id}`)}
          >
            <h2 style={{ fontSize: '14px', fontWeight: 600 }}>
              {project?.name}
            </h2>
          </div>
          <small
            className="quantityTasks"
            style={{ color: '#6B6E75', fontSize: '12px' }}
          >
            {/* {quantityTasks} | {item} */}
            {project?.description.length > 25
              ? `${project?.description.slice(0, 25)}...`
              : project?.description}
          </small>
        </Box>
      </Link>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: isMobile ? 'unset' : 'auto',
          gap: '16px',
        }}
      >
        <div
          style={{
            display: 'flex',
            color: '#6B6E75',
            justifyContent: 'center',
            borderRadius: '12px',
            width: isMobile ? 'auto' : '',
          }}
          onClick={handleEdit}
        >
          <BsPen />
        </div>
        <div
          style={{
            display: 'flex',
            color: '#6B6E75',
            justifyContent: isMobile ? 'center' : '',
            borderRadius: '12px',
            width: isMobile ? 'auto' : '',
          }}
          onClick={() => handleDelete(project)}
        >
          <BsTrash3 />
        </div>
      </Box>
    </TableCell>
  );
};
export default ProjectItemsOverview;
