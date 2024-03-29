import React, { useState } from 'react';
import { Grid, Select, MenuItem, Box, IconButton, useMediaQuery } from '@mui/material';
import CustomLogoIcon from '../../../assets/Img/png/Perc_logo.png';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import "./styles.css"

function FirstRow() {
  const [selectedOption, setSelectedOption] = useState('Perceland App Design');
  const [menuOpen, setMenuOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    alert(`Seleccionaste: ${event.target.value}`);
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={6} sx={{ padding: 0, ml: isMobile ? 10 : 2, fontSize: "14px", bgcolor: "#ffffff", display: "flex", justifyContent: !isMobile ? "flex-start" : "flex-end" }}>
            <Select
              className='MuiMenulist'
              sx={{
                width: isMobile ? "calc(22vw + 50px)" : "22vw",
                borderRadius: "12px",
                color: "#1D1F24",
                cursor: "pointer",
                bgcolor: '#ffffff',
              }}
              size='small'
              value={selectedOption}
              onChange={handleChange}
              onFocus={() => setFocused(true)}
              variant="outlined"
              IconComponent={() => (
                <IconButton onClick={handleMenuToggle}>
                  {menuOpen ? <ExpandLessIcon style={{ color: '#6B6E75', fontSize: 28 }} /> : <KeyboardArrowDownIcon style={{ color: '#6B6E75', fontSize: 28 }} />}
                </IconButton>
              )}
              displayEmpty
              open={menuOpen}
              onClose={() => setMenuOpen(false)}
              onOpen={() => setMenuOpen(true)}
              renderValue={(value) => (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <img src={CustomLogoIcon} alt="Custom Logo" style={{ width: "2.5vw", height: "auto" }} />
                  {value}
                </Box>
              )}
            >
              <MenuItem sx={{ bgcolor: "#ffffff" }} value="Peceland App Design">Peceland App Design</MenuItem>
              <MenuItem sx={{ bgcolor: "#ffffff" }} value="Opción 2">Opción 2</MenuItem>
              <MenuItem sx={{ bgcolor: "#ffffff" }} value="Opción 3">Opción 3</MenuItem>
              <MenuItem sx={{ bgcolor: "#ffffff" }} value="Opción 4">Opción 4</MenuItem>
            </Select>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default FirstRow;
