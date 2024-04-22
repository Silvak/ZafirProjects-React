import React, { useState } from "react";
import {
  Grid,
  Select,
  MenuItem,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
  ThemeProvider,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import "./styles.css";

function FirstRow({ setProjectSelected, projectsData }) {
  const [selectedOption, setSelectedOption] = useState(projectsData[0] || "");
  const [menuOpen, setMenuOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");
  const theme = useTheme();

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    setProjectSelected(event.target.value);
  };

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
                fontSize: "14px",
                bgcolor: "#ffffff",
                display: "flex",
                justifyContent: !isMobile ? "flex-start" : "flex-end",
              }}
            >
              <Select
                className="MuiMenulist"
                sx={{
                  width: isMobile ? "calc(22vw + 50px)" : "22vw",
                  borderRadius: "12px",
                  color: "#1D1F24",
                  cursor: "pointer",
                  bgcolor: "#ffffff",
                }}
                size="small"
                value={selectedOption}
                name={selectedOption.name}
                onChange={handleChange}
                onFocus={() => setFocused(true)}
                variant="outlined"
                IconComponent={() => (
                  <IconButton onClick={handleMenuToggle}>
                    {menuOpen ? (
                      <ExpandLessIcon
                        style={{ color: "#6B6E75", fontSize: 28 }}
                      />
                    ) : (
                      <KeyboardArrowDownIcon
                        style={{ color: "#6B6E75", fontSize: 28 }}
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
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "#fff",
                      gap: 2,
                    }}
                  >
                    {value.name}
                  </Box>
                )}
              >
                {projectsData?.map((project, index) => {
                  return (
                    <MenuItem
                      key={index}
                      sx={{ bgcolor: "#ffffff" }}
                      value={project}
                    >
                      {project.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default FirstRow;
