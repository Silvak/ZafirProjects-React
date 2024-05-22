import {
  Box,
  Avatar,
  Typography,
  useTheme,
  Tooltip,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
} from '@mui/material';
import { useState, useContext } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Logout, Settings } from '@mui/icons-material';
import { useBoundStore } from '@/stores/index';
import { shallow } from 'zustand/shallow';

import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../context/User/UserContext';

export default function UserProfileButton() {
  const { LogoutFunc } = useContext(UserContext);
  const { User, setDataPerfilUser, setUser, setAuthenticated } = useBoundStore(
    (state) => state,
    shallow
  );

  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await LogoutFunc();
    // setUser([]);
    // setDataPerfilUser([]);
    // setAuthenticated(false);
    // navigate("/sign-in");
  };

  return (
    <span className="PROFILE">
      <Tooltip title="Account settings">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#ffffff',
            padding: 1,
            borderRadius: 3.5,
            paddingLeft: 2,
            paddingRight: 2,
            maxHeight: '52px',
            cursor: 'pointer',
          }}
          id="fade-button"
          aria-controls={open ? 'fade-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleOpenUserMenu}
        >
          <Avatar
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
            srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
            sx={{ borderRadius: '50%' }}
          />

          <Box sx={{ ml: 1.5 }}>
            <Typography
              level="title-sm"
              variant="h7"
              color={theme.palette.text.fourth}
            >
              {User?.name}
            </Typography>
            <Typography level="body-xs">{User?.rol}</Typography>
          </Box>
          {open ? (
            <KeyboardArrowUpIcon sx={{ marginLeft: 2 }} />
          ) : (
            <KeyboardArrowDownIcon sx={{ marginLeft: 2 }} />
          )}
        </Box>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            background: 'white',
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              background: 'white',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem key="profile" onClick={handleClose}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem key="account" onClick={handleClose}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem key="settings" onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem key="logout" onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </span>
  );
}
