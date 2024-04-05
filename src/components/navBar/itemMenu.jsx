import { useState } from "react";
import { List, ListItemButton, Collapse } from "@mui/material";
import ItemNav from "@/components/navBar/itemNav";
import BrokenImageOutlinedIcon from "@mui/icons-material/BrokenImageOutlined";
import FolderCopyOutlinedIcon from "@mui/icons-material/FolderCopyOutlined";
import TaskOutlinedIcon from "@mui/icons-material/TaskOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { BiGroup } from "react-icons/bi";
import { useBoundStore } from "../../stores";

export const items = [
  {
    title: "overview",
    url: "/",
    icon: <BrokenImageOutlinedIcon />,
    submenu: [],
  },
  {
    title: "My tasks",
    url: "/project/1111/tasks",
    icon: <TaskOutlinedIcon />,
    submenu: [],
  },
  {
    title: "project",
    url: "/",
    icon: <FolderCopyOutlinedIcon />,
    submenu: [
      {
        title: "My project",
        url: "/project/1111",
      },
      {
        title: "Project Tasks",
        url: "/project/1111/tasks",
      },
      {
        title: "report",
        url: "/project/1111/report",
      },
      {
        title: "gantt",
        url: "/project/1111/gantt",
      },
    ],
  },
  {
    title: "members",
    url: "/members",
    icon: <BiGroup />,
    submenu: [],
  },
];

function ItemMenu(props) {
  const [openIndex, setOpenIndex] = useState(null);
  const { selectedProject } = useBoundStore();

  const handleClick = (index) => {
    if (props.open !== false) {
      setOpenIndex(openIndex === index ? null : index);
    }
  };

  console.log("selectedProject", selectedProject._id);

  return (
    <List
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        py: 0,
        px: { xs: "8px", sm: "12px" },
        width: "100%",
        marginTop: "48px",
      }}
    >
      {items.map((element, index) => (
        <div key={`item-${index}`}>
          {element.submenu.length > 0 ? (
            <>
              <ListItemButton
                onClick={() => handleClick(index)}
                sx={{ m: 0, p: 0 }}
                disableRipple
              >
                <ItemNav
                  to={element.url}
                  title={element.title}
                  icon={element.icon}
                  arrow={
                    openIndex === index ? (
                      <ExpandLessIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )
                  }
                />
              </ListItemButton>

              <Collapse
                in={openIndex === index && props.open}
                timeout="auto"
                unmountOnExit
              >
                {/* {element.submenu.map((submenuItem, submenuIndex) => (
                  <ItemNav
                    key={`submenu-item-${index}-${submenuIndex}`}
                    to={submenuItem.url}
                    title={submenuItem.title}
                    sx={{ pl: 8 }}
                  />
                ))} */}
                <ItemNav
                  to={`project/${selectedProject._id}`}
                  title="My project"
                  sx={{ pl: 8 }}
                />
                <ItemNav
                  to={`/project/${selectedProject._id}/tasks`}
                  title="Project Tasks"
                  sx={{ pl: 8 }}
                />
                <ItemNav
                  to={`/project/${selectedProject._id}/report`}
                  title="report"
                  sx={{ pl: 8 }}
                />
                <ItemNav
                  to={`/project/1111/gantt`}
                  title="gantt"
                  sx={{ pl: 8 }}
                />
              </Collapse>
            </>
          ) : (
            <ItemNav
              key={`item-nav-${index}`}
              to={element.url}
              title={element.title}
              icon={element.icon}
            />
          )}
        </div>
      ))}
    </List>
  );
}

export default ItemMenu;
