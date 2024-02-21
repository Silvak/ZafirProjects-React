import { useState } from "react";
import { styled } from "@mui/material/styles";
import ProjectSelect from "./CustomItems/projectSelect";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import {
  IconButton,
  Box,
  CssBaseline,
  Toolbar,
  Badge,
  InputBase,
} from "@mui/material";
import { useBoundStore } from "@/stores/index";
import { shallow } from "zustand/shallow";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import ItemMenu from "@/components/navBar/itemMenu";
import UserProfileButton from "./CustomItems/ProfileTab";
import Logo from "./CustomItems/logo";

//sizing variables
const drawerWidth = 258;
const sizeOnWeb = 80;
const sizeOnMobile = 64;

//styles
const openedMixin = (theme) => ({
  width: drawerWidth,
  backgroundColor: "#eceff3",
  overflowX: "hidden",
  borderRight: "1px solid #b5b5b5",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
});

const closedMixin = (theme) => ({
  backgroundColor: "#eceff3",
  borderRight: "1px solid #b5b5b5",
  overflowX: "hidden",
  width: `calc(${theme.spacing(sizeOnMobile + "px")} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(sizeOnWeb + "px")} + 1px)`,
  },
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: "0px 16px 0px 24px",
  height: sizeOnMobile,
  [theme.breakpoints.up("sm")]: {
    height: sizeOnWeb,
  },
}));

const CustomAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  backgroundColor: "#eceff3",
  borderBottom: "1px solid #b5b5b5",
  backgroundImage: "none",
  zIndex: theme.zIndex.drawer - 1,
  transition: theme.transitions.create(["width", "margin", "height"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  boxShadow: "none",
  // mobile screens
  height: sizeOnMobile,
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
  }),
  ...(!open && {
    width: `calc(100% - ${sizeOnMobile}px)`,
  }),
  //web screens
  [theme.breakpoints.up("sm")]: {
    ...(!open && {
      width: `calc(100% - ${sizeOnWeb}px)`,
    }),
    height: sizeOnWeb,
  },
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  backgroundColor: "#6366F1",
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "3.5em",
  backgroundColor: "transparent",
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "600px",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    fontSize: "14px",
    [theme.breakpoints.up("md")]: {
      width: "100%",
    },
  },
}));

/* MAIN COMPONENT */
export default function NavbarDrawer(props) {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const { stateOpen, ChangeStateOpen } = useBoundStore(
    (state) => state,
    shallow
  );

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleDrawerOpen = () => {
    ChangeStateOpen(!stateOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* NavBar */}
      <CustomAppBar position="fixed" open={stateOpen}>
        <Toolbar disableKeyboardFocus sx={{ height: "100%" }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          {/* Notification button */}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 5 new notifications"
              color="inherit"
              sx={{ marginRight: 2 }}
            >
              <Badge badgeContent={5} color="error">
                <NotificationsOutlinedIcon />
              </Badge>
            </IconButton>

            {/* Profile button */}
            <UserProfileButton />
          </Box>

          {/* Mobile Profile Button */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </CustomAppBar>

      {/* Sidebar Drawer */}
      <Drawer variant="permanent" open={stateOpen}>
        {/* Draw Header Logo & toggle open */}
        <DrawerHeader
          sx={{
            borderBottom: "1px solid #b5b5b5",
            display: "flex",
            justifyContent: stateOpen ? "space-between" : "center",
            cursor: "pointer",
          }}
          onClick={handleDrawerOpen}
        >
          {stateOpen && <Logo />}
          <IconButton sx={{ color: "#6B6E75", fontSize: "1rem" }}>
            {stateOpen ? <MdArrowBackIos /> : <MdArrowForwardIos />}
          </IconButton>
        </DrawerHeader>

        {/* Project Select */}
        <ProjectSelect open={stateOpen} />

        {/* Menu Items */}
        <ItemMenu open={stateOpen} />
      </Drawer>

      {/* content */}
      <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
        <DrawerHeader />
        {props.children}
      </Box>
    </Box>
  );
}
