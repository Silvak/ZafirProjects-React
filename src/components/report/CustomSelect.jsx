import React, { useState, useRef, useEffect } from 'react';
import { Box, MenuItem, IconButton, Typography, useMediaQuery } from '@mui/material';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

function CustomSelect({ options }) {
    const [selectedOption, setSelectedOption] = useState('');
    const [open, setOpen] = useState(false);
    const [focused, setFocused] = useState(false);
    const isSmallScreen = useMediaQuery('(max-width: 480px)');

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
        setOpen(false);
        alert(`You selected: ${event.target.value}`);
    };

    const handleToggle = () => {
        setOpen(!open);
    };

    const handleFocus = () => {
        setFocused(true);
    };

    const handleBlur = () => {
        setFocused(false);
    };


    return (
        <div>

            <Box
                sx={{
                    display: 'inline-block',
                    position: 'absolute',
                    right: isSmallScreen ? "0px" : "30px",
                    left: isSmallScreen ? "50%" : "auto",
                    transform: isSmallScreen ? "translateX(-50%)" : "none",
                }}
            >

                <Typography
                    onClick={handleToggle}
                    sx={{
                        color: "#1D1F24",
                        fontSize: '14px',
                        fontWeight: 500,
                        fontFamily: 'Arial',
                        lineHeight: '1.5',
                        cursor: 'pointer',
                        borderRadius: '8px',
                        border: "1px solid lightgray",
                        backgroundColor: "#ffffff",
                        padding: '8px 32px 8px 16px',
                        minWidth: "15vw",
                        maxWidth: "47vw",
                        display: 'flex',
                        alignItems: 'center',
                    }}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                >
                    {selectedOption || 'This Month'}
                    <IconButton
                        size="small"
                        onClick={handleToggle}
                        sx={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', color: "#6B6E75" }}
                    >
                        {open ? <ExpandLessIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </Typography>
                {open && (
                    <Box
                        sx={{
                            position: 'absolute',

                            left: 0,
                            width: '100%',
                            backgroundColor: '#ffffff',
                            borderRadius: '8px',
                            border: '1px solid lightgray',
                            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                            zIndex: 999,
                            maxHeight: '200px',
                            overflowY: 'auto',
                        }}
                    >
                        {options.map((option) => (
                            <MenuItem
                                key={option}
                                value={option}
                                onClick={() => handleChange({ target: { value: option } })}
                                onMouseEnter={handleFocus}
                                onMouseLeave={handleBlur}
                                sx={{
                                    fontSize: '14px',
                                    padding: '8px 16px',
                                    lineHeight: '1.5',
                                    cursor: 'pointer',
                                    backgroundColor: focused ? '#eeeeee' : '#ffffff',
                                }}
                            >
                                {option}
                            </MenuItem>
                        ))}
                    </Box>
                )}
            </Box>
        </div>
    );
}

export default CustomSelect;
