import { useState, useEffect } from "react";
import { List, ListItemButton, Collapse, Tooltip } from "@mui/material";
import CloudCircleIcon from "@mui/icons-material/CloudCircle";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ItemNav from "@/components/navBar/itemNav";
import { useBoundStore } from "../../../stores";

function ProjectSelect(props) {
  const [open, setOpen] = useState(false);
  const { fetchProjects, projectsData, selectedProject, setSelectedProject } =
    useBoundStore();

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleClick = () => {
    if (props.open) {
      setOpen(!open);
    }
  };

  const handleSelectProject = (project) => {
    setSelectedProject(project);
    setOpen(false);
  };

  useEffect(() => {
    if (props.open === false) {
      setOpen(false);
    }
  }, [props.open]);

  return (
    <List
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        py: 0,
        px: { xs: "8px", sm: "12px" },
        width: "100%",
        marginTop: "22px",
      }}
    >
      {/* btn project */}
      {selectedProject && (
        <Tooltip title={selectedProject.name} placement="right">
          <ListItemButton
            onClick={handleClick}
            sx={{
              m: 0,
              p: 0,
              border: "1px solid #E0E3E8",
              borderRadius: "12px",
            }}
            disableRipple
          >
            <ItemNav
              to="#"
              title={selectedProject.name.slice(0, 12) + "..."}
              icon={<CloudCircleIcon />}
              arrow={open ? <ExpandLessIcon /> : <KeyboardArrowDownIcon />}
              bgColor={"#F6F7FA"}
            />
          </ListItemButton>
        </Tooltip>
      )}

      {/* submenu */}
      {selectedProject && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          {projectsData.slice(0, 3).map((submenuItem) => (
            <ListItemButton
              key={submenuItem.id}
              onClick={() => handleSelectProject(submenuItem)}
              sx={{ m: 0, p: 0 }}
            >
              <ItemNav
                to={`/project/${submenuItem._id}`}
                title={submenuItem.name.slice(0, 20) + "..."}
                //icon={submenuItem.icon}
              />
            </ListItemButton>
          ))}
          <ListItemButton sx={{ m: 0, p: 0 }}>
            <ItemNav
              to={`/projects`}
              title={"View more"}
              //icon={submenuItem.icon}
            />
          </ListItemButton>
        </Collapse>
      )}
    </List>
  );
}

export default ProjectSelect;
