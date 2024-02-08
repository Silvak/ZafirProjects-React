import * as React from "react";
import { styled, alpha } from '@mui/material/styles';
import { NavLink, useLocation } from "react-router-dom";
import TaskOutlinedIcon from '@mui/icons-material/TaskOutlined';
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Collapse from '@mui/material/Collapse';
import Fade from '@mui/material/Fade';
import Tooltip from '@mui/material/Tooltip';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import BrokenImageOutlinedIcon from '@mui/icons-material/BrokenImageOutlined';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import FolderCopyOutlinedIcon from '@mui/icons-material/FolderCopyOutlined';
import MultilineChartOutlinedIcon from '@mui/icons-material/MultilineChartOutlined';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import {
  List,
  ListItemText,
  ListItemIcon,
  ListItem,
  ListItemButton,
  IconButton,
  Typography,
  Box,
  CssBaseline,
  Toolbar,
  Badge,
  Avatar,
  useTheme,
  MenuItem,
  InputBase,
  AccordionActions,
  AccordionSummary,
  AccordionDetails,
  Button
} from "@mui/material";
import {
  Menu,
  MenuOpen,
} from "@mui/icons-material";
const drawerWidth = 240;

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
  borderTop: "none",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(7)} + 1px)`,
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

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: "3.5em",
  backgroundColor: "transparent",
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));




export default function NavbarDrawer(props) {
  const [expanded, setExpanded] = React.useState('panel1');
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [open2, setOpen2] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorUser, setAnchorUser] = React.useState(false);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorUser(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorUser(false);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const open3 = Boolean(anchorEl);
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClick2 = () => {
    setOpen2(!open2);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&::before': {
      display: 'none',
    },
  }));

  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, .05)'
        : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
    },
  }));

  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
  }));


  function ItemNav(props) {

    return (
      <NavLink
        to={props.to}
        style={({ isActive }) => {
          return {
            textDecoration: "none",
            color: isActive
              ? theme.palette.text.secondary
              : theme.palette.text.primary,
            backgroundColor: "#ffffff",
            borderRadius: "1em"
          };
        }}
      >
        <ListItem disablePadding>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 1,
              borderRadius: "1rem",
              marginLeft: "5px",
              marginRight: "5px"
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 2 : "auto",
                justifyContent: "center",
                color:  theme.palette.action.active ,
              }}
            >
              {props.children}
            </ListItemIcon>
            <ListItemText
              disableTypography
              primary={<Typography variant="body2">{props.title}</Typography>}
              sx={{ opacity: open ? 1 : 0 }}
            />
          </ListItemButton>
        </ListItem>
      </NavLink>
    );
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <CustomAppBar position="fixed" open={open} >
        <Toolbar sx={{ border: "2px solid #b5b5b5", borderBlockStart: "none", borderLeft: "none", height: "80px" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
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
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              aria-label="show 5 new notifications"
              color="inherit"
            >
              <Badge badgeContent={5} color="error">
                <NotificationsOutlinedIcon />
              </Badge>
            </IconButton>

            <MenuItem sx={{
              height: "70px",
              marginTop: 1,
              marginBottom: 1
            }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
                id="fade-button"
                aria-controls={open3 ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open3 ? 'true' : undefined}
                onClick={handleOpenUserMenu}
              >
                <Avatar
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
                  srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
                  sx={{ borderRadius: '50%' }}
                />
                <Box sx={{ ml: 1.5 }}>
                  <Typography level="title-sm" color="text.primary">
                    Alexander
                  </Typography>
                  <Typography level="body-xs" color="text.tertiary">
                    Admin
                  </Typography>
                </Box>
                <KeyboardArrowDownIcon sx={{marginLeft: 1}}/>
              </Box>
            </MenuItem>
          </Box>


      

          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </CustomAppBar>
      <Drawer variant="permanent" open={open} >
        <DrawerHeader sx={{ borderBlockEnd: "2px solid #b5b5b5", display: "flex", justifyContent: "start", height: "80px" }}>
          <StopCircleIcon style={{ color: "#7662ea" }} />
          <Typography variant="h6" noWrap component="div" color="black" sx={{ marginLeft: 1, marginRight: 3 }}>
            Sunstone
          </Typography>
          <IconButton onClick={handleDrawerClose} >
            {theme.direction === "rtl" ? (
              <MenuOpen />
            ) : (
              <MenuOpen sx={{ color: "#393d44" }} />
            )}
          </IconButton>
        </DrawerHeader>
        <List
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "10%",
            justifyContent: "flex-start",
            marginTop: "1rem",
          }}
        >
          <Accordion sx={{ m: 1, minWidth: 120 }} style={{ borderRadius: "10px", backgroundColor: "#f6f7fa", marginLeft: "5px", marginRight: "5px", borderColor: "#e0e3e8" }}>
            <AccordionSummary
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <CloudCircleIcon value={1} /> Graphicdunk
            </AccordionSummary>
            <AccordionActions>
              <MenuItem>
                <CloudCircleIcon value={2} /> Graphicdunk
              </MenuItem>
            </AccordionActions>
          </Accordion>
        </List>

        <List>
          <ItemNav to="" title="Overview">
            <BrokenImageOutlinedIcon sx={{ color: "icon.primary" }} />
          </ItemNav>

          <ItemNav to="/tasks" title="My Tasks">
            <TaskOutlinedIcon sx={{ color: "icon.primary" }} />
          </ItemNav>

          <ListItemButton onClick={handleClick2}  >
            <ListItemIcon sx={{ color: "icon.primary" }} >
              <FolderCopyOutlinedIcon sx={{ marginRight: 1.6, color: "icon.primary" }} />
              <ListItemText primary="Projects" />
            </ListItemIcon>
            {open2 ? <ExpandLess sx={{ marginLeft: 3 }} /> : <KeyboardArrowRightIcon sx={{ marginLeft: 3 }} />}
          </ListItemButton>
          <Collapse in={open2} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Starred" />
              </ListItemButton>
            </List>
          </Collapse>

          <ItemNav to="/tracker" title="Time Tracker">
            <TimerOutlinedIcon sx={{ color: "icon.primary" }} />
          </ItemNav>

          <ItemNav to="/performance" title="Performance">
            <MultilineChartOutlinedIcon sx={{ color: "icon.primary" }} />
          </ItemNav>

          <ItemNav to="/messages" title="Messages">
            <QuestionAnswerOutlinedIcon sx={{ color: "icon.primary" }} />
          </ItemNav>
        </List>

      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, }}>
        <DrawerHeader />
        {props.children}
      </Box>
    </Box>
  );
}