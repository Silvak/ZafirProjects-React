import { useState, useEffect } from 'react';
import { List, ListItemButton, Collapse, Tooltip } from '@mui/material';
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ItemNav from '@/components/navBar/itemNav';
import { useBoundStore } from '../../../stores';
import { shallow } from 'zustand/shallow';

function ProjectSelect(props) {
  const [open, setOpen] = useState(false);
  const [navItemTitle, setNavItemTitle] = useState('No project selected');
  const [tooltipTitle, setTooltipTitle] = useState('Select a Project');

  const {
    fetchProjects,
    projectsData,
    selectedProject,
    setSelectedProject,
    User,
    clearProjects,
  } = useBoundStore((state) => state, shallow);

  const handleClick = () => {
    if (props.open) {
      setOpen(!open);
    }
  };

  const handleSelectProject = async (project) => {
    await setSelectedProject(project);
  };

  useEffect(() => {
    fetchProjects(User?.uid);
  }, []);

  useEffect(() => {
    if (props.open === false) {
      setOpen(false);
    }
  }, [props.open]);

  useEffect(() => {
    if (projectsData.length > 0) {
      setNavItemTitle(selectedProject?.name.slice(0, 12) + '...');
      setTooltipTitle(selectedProject?.name);
    } else {
      setNavItemTitle('No project selected');
      setTooltipTitle('Select a Project');
    }
  }, [projectsData, selectedProject]);

  return (
    <List
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        py: 0,
        px: { xs: '8px', sm: '12px' },
        width: '100%',
        marginTop: '22px',
      }}
    >
      <Tooltip title={tooltipTitle} placement='right'>
        <ListItemButton
          onClick={handleClick}
          sx={{
            m: 0,
            p: 0,
            border: '1px solid #E0E3E8',
            borderRadius: '12px',
          }}
          disableRipple
        >
          <ItemNav
            to='#'
            title={navItemTitle}
            icon={<CloudCircleIcon />}
            arrow={open ? <ExpandLessIcon /> : <KeyboardArrowDownIcon />}
            bgColor={'#F6F7FA'}
          />
        </ListItemButton>
      </Tooltip>

      <Collapse in={open} timeout='auto' unmountOnExit>
        {projectsData?.slice(0, 3).map((submenuItem) => (
          <ListItemButton
            key={submenuItem.id}
            onClick={() => handleSelectProject(submenuItem)}
            sx={{ m: 0, p: 0 }}
          >
            <ItemNav
              to={`/project/${submenuItem._id}/tasks`}
              title={submenuItem.name.slice(0, 20) + '...'}
              //icon={submenuItem.icon}
            />
          </ListItemButton>
        ))}
        <ListItemButton sx={{ m: 0, p: 0 }}>
          <ItemNav
            to={`/projects`}
            title={'View more'}
            //icon={submenuItem.icon}
          />
        </ListItemButton>
      </Collapse>
    </List>
  );
}

export default ProjectSelect;
