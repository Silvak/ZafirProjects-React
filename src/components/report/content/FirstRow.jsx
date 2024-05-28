import React, { useState, useEffect } from 'react';
import {
  Grid,
  Select,
  MenuItem,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
  ThemeProvider,
  Typography,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import './styles.css';

function FirstRow({ setProjectSelected, projectsData, projectSelected }) {
  const [selectedOption, setSelectedOption] = useState(projectsData[0] || '');
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    setProjectSelected(event.target.value);
  };

  useEffect(() => {
    if (!projectSelected) {
      setProjectSelected(projectsData[0]);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid
              item
              xs={6}
              sx={{
                padding: 0,
                ml: isMobile ? 10 : 2,
                fontSize: '14px',
                bgcolor: '#ffffff',
                display: 'flex',
                justifyContent: !isMobile ? 'flex-start' : 'flex-end',
              }}
            >
              {projectSelected ? (
                <Select
                  className="MuiMenulist"
                  sx={{
                    width: isMobile ? 'calc(22vw + 50px)' : '22vw',
                    borderRadius: '12px',
                    color: '#1D1F24',
                    cursor: 'pointer',
                    bgcolor: '#ffffff',
                  }}
                  size="small"
                  value={selectedOption}
                  onChange={handleChange}
                  variant="outlined"
                  IconComponent={() => (
                    <IconButton onClick={handleMenuToggle}>
                      {menuOpen ? (
                        <ExpandLessIcon
                          style={{ color: '#6B6E75', fontSize: 28 }}
                        />
                      ) : (
                        <KeyboardArrowDownIcon
                          style={{ color: '#6B6E75', fontSize: 28 }}
                        />
                      )}
                    </IconButton>
                  )}
                  displayEmpty
                  open={menuOpen}
                  onClose={() => setMenuOpen(false)}
                  onOpen={() => setMenuOpen(true)}
                  renderValue={(value) => (
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                      }}
                    >
                      {value ? value.name : 'Select a project'}
                    </Box>
                  )}
                >
                  {projectsData?.map((project, index) => (
                    <MenuItem
                      key={index}
                      style={{ backgroundColor: 'white' }}
                      sx={{ fontWeight: 500 }}
                      value={project}
                      className="menu-item"
                    >
                      {project.name}
                    </MenuItem>
                  ))}
                </Select>
              ) : !isLoading ? (
                <Typography
                  variant="body1"
                  sx={{
                    width: '100%',
                    textAlign: 'center',
                    fontWeight: 500,
                    fontSize: 14,
                  }}
                >
                  "There are no projects to show"
                </Typography>
              ) : (
                <Typography
                  variant="body1"
                  sx={{
                    width: '100%',
                    textAlign: 'center',
                    fontWeight: 500,
                    fontSize: 14,
                  }}
                >
                  Loading...
                </Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default FirstRow;
