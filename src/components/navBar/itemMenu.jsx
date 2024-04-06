import { useState, useEffect } from "react";
import { List, ListItemButton, Collapse } from "@mui/material";
import ItemNav from "@/components/navBar/itemNav";
import BrokenImageOutlinedIcon from "@mui/icons-material/BrokenImageOutlined";
import FolderCopyOutlinedIcon from "@mui/icons-material/FolderCopyOutlined";
import TaskOutlinedIcon from "@mui/icons-material/TaskOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { BiGroup } from "react-icons/bi";
import { useBoundStore } from "../../stores";

function ItemMenu(props) {
  const [openIndex, setOpenIndex] = useState(null);
  const { selectedProject } = useBoundStore();
  const [itemsActual, setItemsActual] = useState();
  let items = [];
  if (selectedProject) {
    items = [
      {
        title: "overview",
        url: "/",
        icon: <BrokenImageOutlinedIcon />,
        submenu: [],
      },
      {
        title: "My tasks",
        url: `/project/${selectedProject._id}/tasks`,
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
            url: `/project/${selectedProject._id}`,
          },
          {
            title: "Project Tasks",
            url: `/project/${selectedProject._id}/tasks`,
          },
          {
            title: "report",
            url: `/project/${selectedProject._id}/report`,
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
  }

  useEffect(() => {
    if (selectedProject) {
      setItemsActual(items);
    }
  }, []);

  const handleClick = (index) => {
    if (props.open !== false) {
      setOpenIndex(openIndex === index ? null : index);
    }
  };

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
      {itemsActual?.map((element, index) => (
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
                  to={`/project/${selectedProject._id}/gantt`}
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
