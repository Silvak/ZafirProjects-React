import UserAvatar from '@/assets/Img/png/userImageMan.png';
import { Box, TableCell } from '@mui/material';
import { RenderIconByCategory } from './RenderIconByCategory';
import { fixDate } from '@/utils/fixDate';
//styles
import css from './styles.module.css';
//icons
import { MdAttachFile, MdCalendarMonth } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { shallow } from 'zustand/shallow';
import { useBoundStore } from '../../stores';

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

const ProjectsTableItem = ({
  _id,
  name,
  status,
  start,
  username,
  // quantityTasks,
  // date,
  // attachments,
  // category,
}) => {
  const { fixStart } = fixDate(start);
  const { selectedProjectById } = useBoundStore((state) => state, shallow);
  const handleSelectProject = (id) => {
    selectedProjectById(id);
  };

  return (
    <Link
      to={`/project/${_id}`}
      style={{ color: 'inherit', textDecoration: 'none' }}
      onClick={() => handleSelectProject(_id)}
    >
      <TableCell
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            cursor: 'pointer',
          },
        }}
      >
        <BoxFlex sx={{ flex: 2 }}>
          {/* <div
          style={{
            display: "grid",
            placeContent: "center",
            backgroundColor: "#ECE9FF",
            borderRadius: "12px",
            padding: "10px",
          }}
        >
          <RenderIconByCategory category={category} />
        </div> */}
          <Box sx={{ marginLeft: '20px' }}>
            <h2 className={css.projectName}>{name}</h2>
            {/* <small className={css.quantityTasks}>{quantityTasks}</small> */}
          </Box>
        </BoxFlex>
        <BoxFlex>
          <img src={UserAvatar} alt="user avatar" width={40} height={40} />
          <p className={css.username}>{username}</p>
        </BoxFlex>
        <BoxFlex>
          <MdCalendarMonth color="#6B6E75" size="20px" />
          <p className="date">{fixStart}</p>
        </BoxFlex>
        <BoxFlex>
          <MdAttachFile color="#6B6E75" size="20px" />
          {/* <p> {attachments.length} files</p> */}1 files
        </BoxFlex>
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
                backgroundColor: "#429482",
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
    </Link>
  );
};
export default ProjectsTableItem;
