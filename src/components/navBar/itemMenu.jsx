import { useState } from "react";
import { List, ListItemButton, Collapse } from "@mui/material";
import ItemNav from "@/components/navBar/itemNav";
import BrokenImageOutlinedIcon from "@mui/icons-material/BrokenImageOutlined";
import FolderCopyOutlinedIcon from "@mui/icons-material/FolderCopyOutlined";
import MultilineChartOutlinedIcon from "@mui/icons-material/MultilineChartOutlined";
import TaskOutlinedIcon from "@mui/icons-material/TaskOutlined";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ExpandLess from "@mui/icons-material/ExpandLess";

export const items = [
  {
    title: "overview",
    url: "/overview",
    icon: <BrokenImageOutlinedIcon />,
    submenu: [],
  },
  {
    title: "tasks",
    url: "/tasks",
    icon: <TaskOutlinedIcon />,
    submenu: [],
  },
  {
    title: "projects",
    url: "/projects",
    icon: <FolderCopyOutlinedIcon />,
    submenu: [
      {
        title: "Mi proyecto 1",
        url: "/projects/234234",
      },
      {
        title: "report",
        url: "/projects/report",
      },
    ],
  },
  {
    title: "performance",
    url: "/performance",
    icon: <MultilineChartOutlinedIcon />,
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
      key="listItem"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyItems: "center",
        justifyContent: "center",

        gap: "8px",
        px: "12px",
        width: "100%",
      }}
    >
      {items.map((element) => (
        <>
          {element.submenu.length > 0 ? (
            <>
              <ListItemButton
                key={element.title}
                onClick={handleClick}
                sx={{
                  m: 0,
                  p: 0,
                }}
                disableRipple
              >
                <ItemNav
                  to={element.url}
                  title={element.title}
                  icon={element.icon}
                  open={props.open}
                  arrow={open ? <ExpandLess /> : <KeyboardArrowRightIcon />}
                />
              </ListItemButton>

              <Collapse in={open} timeout="auto" unmountOnExit>
                {element.submenu.map((submenuItem) => (
                  <ItemNav
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
              to={element.url}
              title={element.title}
              icon={element.icon}
              open={props.open}
            />
          )}
        </>
      ))}
    </List>
  );
}

export default ItemMenu;
