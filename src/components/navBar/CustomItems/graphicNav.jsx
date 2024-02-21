import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
  Box,
  Stack,
} from "@mui/material";
import { capitalize } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useBoundStore } from "@/stores/index";
import { shallow } from "zustand/shallow";

function GraphicNav(props) {
  const location = useLocation();
  const isActive = location.pathname === props.to;
  const { stateOpen } = useBoundStore((state) => state, shallow);

  return (
    <NavLink to={props.to} style={{ textDecoration: "none", width: "100%" }}>
      <ListItem disablePadding>
        <ListItemButton
          sx={{
            height: 48,
            maxWidth: stateOpen ? "100%" : 48,
            display: "flex",
            width: "100%",
            justifyContent: stateOpen ? "initial" : "space-between",
            px: "12px",
            borderRadius: "12px",
            overflow: "hidden",
            backgroundColor: isActive ? "#ffffff" : "#eceff3",
            color: isActive ? "#3A3D44" : "#6B6E75",
          }}
        >
          {/* icon & text */}
          <Stack direction="row" spacing={2} alignItems="center">
            <ListItemIcon
              sx={{
                minWidth: "auto",
                color: isActive ? "#7662ea" : "#6B6E75",
              }}
            >
              {props.icon}
            </ListItemIcon>

            <Typography
              variant="body1"
              color="initial"
              sx={{
                fontWeight: "600",
                fontSize: "1.2rem",
                visibility: stateOpen ? "visible" : "hidden",
                color: isActive ? "#3A3D44" : "#6B6E75",
              }}
            >
              {capitalize(props.title)}
            </Typography>
          </Stack>

          {/* Arrow collapse */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              width: "100%",
              visibility: stateOpen ? "visible" : "hidden",
            }}
          >
            {props.arrow}
          </Box>
        </ListItemButton>
      </ListItem>
    </NavLink>
  );
}

export default GraphicNav;
