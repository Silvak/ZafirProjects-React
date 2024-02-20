import { useState } from "react";
import { styled } from "@mui/material/styles";
import GraphicdunkSelect from "./CustomItems/graphicdunk";
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
  useTheme,
  InputBase,
} from "@mui/material";
import { Menu, MenuOpen } from "@mui/icons-material";
import ItemMenu from "@/components/navBar/itemMenu";
import UserProfileButton from "./CustomItems/ProfileTab";
import Logo from "./CustomItems/logo";

const drawerWidth = 258;

//styles
const openedMixin = (theme) => ({
  width: drawerWidth,
  backgroundColor: "#eceff3",
  border: "2px solid #b5b5b5",
  borderTop: "none",
  borderLeft: "none",
  overflowX: "hidden",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
});

const closedMixin = (theme) => ({
  backgroundColor: "#eceff3",
  borderRight: "2px solid #b5b5b5",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing("64px")} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing("80px")} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const CustomAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  backgroundColor: "#eceff3",
  // backgroundColor: theme.palette.background.paper,
  backgroundImage: "none",
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
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
  // "&:hover": {
  //   backgroundColor: alpha(theme.palette.common.white, 0.25),
  // },
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
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

/* MAIN COMPONENT */
export default function NavbarDrawer(props) {
  //const [expanded, setExpanded] = React.useState("panel1");
  //const handleChange = (panel) => (event, newExpanded) => {
  //  setExpanded(newExpanded ? panel : false);
  //};
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  //const [anchorEl, setAnchorEl] = useState(null);
  //const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  //const [anchorElUser, setAnchorElUser] = React.useState(null);
  //const isMenuOpen = Boolean(anchorEl);

  //const handleMobileMenuClose = () => {
  //  setMobileMoreAnchorEl(null);
  //};

  //const handleMenuClose = () => {
  //  setAnchorEl(null);
  //  handleMobileMenuClose();
  //};

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* NavBar */}
      <CustomAppBar position="fixed" open={open}>
        <Toolbar
          disableKeyboardFocus
          sx={{
            border: "2px solid #b5b5b5",
            borderBlockStart: "none",
            borderLeft: "none",
            height: "80px",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 2,
              ...(open && { display: "none" }),
            }}
          >
            <Menu />
          </IconButton>

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
      <Drawer variant="permanent" open={open}>
        {/* Draw Header Logo & toggle open */}
        <DrawerHeader
          sx={{
            borderBlockEnd: "2px solid #b5b5b5",
            display: "flex",
            justifyContent: "start",
            height: "80px",
          }}
        >
          <Logo />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <MenuOpen />
            ) : (
              <MenuOpen sx={{ color: "#393d44" }} />
            )}
          </IconButton>
        </DrawerHeader>

        {/* Project Select */}
        <GraphicdunkSelect />

        {/* Menu Items */}
        <ItemMenu open={open} />
      </Drawer>

      {/* content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {props.children}
      </Box>
    </Box>
  );
}
