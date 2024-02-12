import { useState } from "react";
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { List, ListItemButton, Collapse } from "@mui/material";
import GraphicNav from "@/components/navBar/CustomItems/graphicNav";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// constant


// ==============================|| MENU ITEMS ||============================== //

const items = [
  {
    id: "graphicList",
    title: "Graphicdunk",
    type: "collapse",
    icon: <CloudCircleIcon/>,
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
  console.log(open);

  const handleClick = () => {
    if (props.open != false) {
      setOpen(!open);
    }
  };

  return (
    <List
      key="graphicItem"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyItems: "center",
        justifyContent: "center",
        gap: "8px",
        px: "12px",
        width: "100%",
        marginTop: "24px"
      }}
    >
        {items.map((element) => (
          <>
            <ListItemButton
              key={element.title}
              onClick={handleClick}
              sx={{
                m: 0,
                p: 0,
                border: "2px solid #E0E3E8",
                width: "100%",
                borderRadius: "12px",
                backgroundColor: "#F6F7FA"
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

            <Collapse in={open} timeout="auto" unmountOnExit>
              {element.submenu.map((submenuItem) => (
                <GraphicNav
                  key={submenuItem.id}
                  to={submenuItem.url}
                  title={submenuItem.title}
                  open={true}
                  sx={{ pl: 8 }}
                />
              ))}
            </Collapse>
          </>
        ))}
    </List>
  );
}

export default GraphicdunkSelect;
