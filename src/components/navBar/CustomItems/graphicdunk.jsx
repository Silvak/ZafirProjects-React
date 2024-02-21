import { useState } from "react";
import CloudCircleIcon from "@mui/icons-material/CloudCircle";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { List, ListItemButton, Collapse } from "@mui/material";
import GraphicNav from "@/components/navBar/CustomItems/graphicNav";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const items = [
  {
    id: "graphicList",
    title: "Graphicdunk",
    type: "collapse",
    icon: <CloudCircleIcon />,
    submenu: [
      {
        id: "item1",
        title: "Item 1",
        type: "item",
        url: "/items/1",
        target: true,
      },
      {
        id: "item2",
        title: "Item 2",
        type: "item",
        url: "/items/2",
        target: true,
      },
    ],
  },
];

function GraphicdunkSelect(props) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (props.open !== false) {
      setOpen(!open);
    }
  };

  //submenu
  const Submenu = ({ submenuItems }) => (
    <Collapse in={open} timeout="auto" unmountOnExit>
      {submenuItems.map((submenuItem) => (
        <GraphicNav
          key={submenuItem.id}
          to={submenuItem.url}
          title={submenuItem.title}
          open={true}
          sx={{ pl: 8 }}
        />
      ))}
    </Collapse>
  );

  return (
    <List
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyItems: "center",
        justifyContent: "center",
        gap: "8px",
        px: { xs: "8px", sm: "12px" },
        width: "100%",
        marginTop: "24px",
      }}
    >
      {items.map((element) => (
        <div key={element.id}>
          <ListItemButton
            onClick={handleClick}
            sx={{
              m: 0,
              p: 0,
              border: "1px solid #E0E3E8",
              width: "100%",
              borderRadius: "12px",
              "&:hover": {
                backgroundColor: "white",
              },
            }}
            disableRipple
          >
            <GraphicNav
              to={element.url}
              title={element.title}
              icon={element.icon}
              open={true}
              arrow={open ? <ExpandLessIcon /> : <KeyboardArrowDownIcon />}
            />
          </ListItemButton>
          <Submenu submenuItems={element.submenu} />
        </div>
      ))}
    </List>
  );
}

export default GraphicdunkSelect;
