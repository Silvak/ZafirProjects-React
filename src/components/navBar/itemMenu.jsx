import { useState } from "react";
import { List, ListItemButton, Collapse } from "@mui/material";
import ItemNav from "@/components/navBar/itemNav";
import BrokenImageOutlinedIcon from "@mui/icons-material/BrokenImageOutlined";
import FolderCopyOutlinedIcon from "@mui/icons-material/FolderCopyOutlined";
import MultilineChartOutlinedIcon from "@mui/icons-material/MultilineChartOutlined";
import TaskOutlinedIcon from "@mui/icons-material/TaskOutlined";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ExpandLess from "@mui/icons-material/ExpandLess";
import { BiGroup } from "react-icons/bi";

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
    url: "/project",
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
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (props.open != false) {
      setOpen(!open);
    }
  };

  return (
    <List
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
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
                  key={`main-item-${index}`}
                  to={element.url}
                  title={element.title}
                  icon={element.icon}
                  open={props.open}
                  arrow={open ? <ExpandLess /> : <KeyboardArrowRightIcon />}
                />
              </ListItemButton>

              <Collapse in={open && props.open} timeout="auto" unmountOnExit>
                {element.submenu.map((submenuItem, submenuIndex) => (
                  <ItemNav
                    key={`submenu-item-${index}-${submenuIndex}`}
                    to={submenuItem.url}
                    title={submenuItem.title}
                    open={props.open}
                    sx={{ pl: 8 }}
                  />
                ))}
              </Collapse>
            </>
          ) : (
            <ItemNav
              key={`item-nav-${index}`}
              to={element.url}
              title={element.title}
              icon={element.icon}
              open={props.open}
            />
          )}
        </div>
      ))}
    </List>
  );
}

export default ItemMenu;
