import {
  ListItem,
  ListItemButton,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import { capitalize } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useBoundStore } from "@/stores/index";
import { shallow } from "zustand/shallow";

// Styles
const listItemButtonSx = (isActive, open, bgColor = "#eceff3") => ({
  display: "flex",
  height: 48,
  px: "0px",
  borderRadius: "12px",
  overflow: "hidden",
  justifyContent: open ? "initial" : "space-between",
  backgroundColor: isActive ? "#ffffff" : bgColor,
  "&:hover": {
    backgroundColor: "#F6F7FA",
  },
});

const stackSx = {
  width: "100%",
  justifyContent: "start",
  px: { xs: "12px", sm: "16px" },
};

const iconBoxSx = (isActive) => ({
  display: "flex",
  fontSize: "1.5rem",
  color: isActive ? "#7662ea" : "#6B6E75",
});

const typographySx = (isActive, open) => ({
  fontWeight: "600",
  fontSize: "14px !important",
  ml: "14px",
  color: isActive ? "#3A3D44" : "#6B6E75",
  transition: "opacity 300ms ease, transform 300ms ease",
  opacity: open ? 1 : 0,
  transform: open ? "translateX(0)" : "translateX(-20px)",
  visibility: open ? "visible" : "hidden",
  height: open ? "auto" : "0",
  overflow: "hidden",
  whiteSpace: "nowrap",
});

const arrowBoxSx = (open) => ({
  display: open ? "flex" : "none",
  justifyContent: "end",
  width: "100%",
  pr: "14px",
  color: "rgb(118, 98, 234)",
});

//component
function ItemNav(props) {
  const location = useLocation();
  const isActive = location.pathname === props.to;

  const { stateOpen } = useBoundStore((state) => state, shallow);

  return (
    <NavLink to={props.to} style={{ textDecoration: "none", width: "100%" }}>
      <ListItemButton
        sx={listItemButtonSx(isActive, stateOpen, props.bgColor)}
        //disableRipple
      >
        <Stack direction="row" alignItems="center" sx={stackSx}>
          <Box sx={iconBoxSx(isActive)}>{props.icon}</Box>
          <Typography sx={typographySx(isActive, stateOpen)}>
            {capitalize(props.title)}
          </Typography>
        </Stack>

        <Box sx={arrowBoxSx(stateOpen)}>{props.arrow}</Box>
      </ListItemButton>
    </NavLink>
  );
}

export default ItemNav;
