import { Box, TableCell, useMediaQuery } from '@mui/material';
import { BsPen, BsTrash3 } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useBoundStore } from '../../stores';
import { shallow } from 'zustand/shallow';

const ProjectItemsOverview = ({
  _id,
  name,
  description,
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
    await updateProjects(User?.uid);
  };

  return (
    <TableCell
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: 'none',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          cursor: 'pointer',
        },
        height: 'auto',
        width: '100%',
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
        to={`/project/${_id}`}
        style={{ color: 'inherit', textDecoration: 'none' }}
        onClick={() => handleSelectProject(project)}
      >
        <Box>
          <div
            // onClick={() => navigate(`/project/${id}`)}
            style={{ fontFamily: 'Poppins' }}
          >
            <h2 className="projectName">{name}</h2>
          </div>
          <small className="quantityTasks" style={{ fontFamily: 'Poppins' }}>
            {/* {quantityTasks} | {item} */}
            {description.length > 25
              ? `${description.slice(0, 25)}...`
              : description}
          </small>
        </Box>
      </Link>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '80px',
          marginLeft: isMobile ? 'unset' : 'auto',
          gap: '20px',
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
          onClick={() => handleDelete(_id)}
        >
          <BsTrash3 />
        </div>
      </Box>
    </TableCell>
  );
};
export default ProjectItemsOverview;
