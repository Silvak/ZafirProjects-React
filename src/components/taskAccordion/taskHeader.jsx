import React, { useState } from 'react';
import {
  CalendarToday as CalendarTodayIcon,
  FormatListBulletedRounded as FormatListBulletedRoundedIcon,
  ViewKanbanOutlined as ViewKanbanOutlinedIcon,
} from '@mui/icons-material';
import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  MenuItem,
  Select,
  ThemeProvider,
  Typography,
  createTheme,
  useMediaQuery,
} from '@mui/material';
import Header from '@/components/Header/Header';
import FilterSelect from '@/components/Selects/FilterSelect';

const filtersData = [
  { id: 1, label: 'All Tasks', value: 'All Tasks' },
  { id: 2, label: 'In Progress', value: 'In Progress' },
  { id: 3, label: 'Pending', value: 'Pending' },
  { id: 4, label: 'Completed', value: 'Completed' },
];

const TaskHeader = ({ title, handleButton, handleAddTask }) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const theme = createTheme();
  const [selectedValue, setSelectedValue] = useState('All Tasks');
  const [selectedIcon, setSelectedIcon] = useState('Format List');

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleIconButtonClick = (buttonName) => {
    setSelectedIcon(buttonName);
    handleButton(buttonName);
  };

  return (
    <ThemeProvider theme={theme}>
      <Header title={title}>
        <ButtonGroup
          variant="outlined"
          aria-label="Loading button group"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'normal',
            borderRadius: '8px',
            border: '1px solid gray',
            cursor: 'pointer',
            backgroundColor: 'white',
          }}
        >
          <FormatListBulletedRoundedIcon
            sx={{
              marginRight: '10px',
              backgroundColor:
                selectedIcon === 'Format List' ? 'rgb(118, 98, 234)' : '',
              color: selectedIcon === 'Format List' ? 'white' : 'gray',
              borderRadius: '8px',
              padding: '2px',
            }}
            onClick={() => handleIconButtonClick('Format List')}
          />
          <ViewKanbanOutlinedIcon
            sx={{
              marginRight: '10px',
              backgroundColor:
                selectedIcon === 'View Kanban' ? 'rgb(118, 98, 234)' : '',
              color: selectedIcon === 'View Kanban' ? 'white' : 'gray',
              borderRadius: '8px',
              padding: '2px',
              display: isMobile ? 'none' : '',
            }}
            onClick={() => handleIconButtonClick('View Kanban')}
          />
          <CalendarTodayIcon
            sx={{
              backgroundColor:
                selectedIcon === 'Calendar' ? 'rgb(118, 98, 234)' : '',
              color: selectedIcon === 'Calendar' ? 'white' : 'gray',
              borderRadius: '8px',
              padding: '2px',
            }}
            onClick={() => handleIconButtonClick('Calendar')}
          />
        </ButtonGroup>
        {/* <Select
          value={selectedValue}
          onChange={handleSelectChange}
          sx={{
            color: "black",
            backgroundColor: "white",
            border: "1px solid gray",
            fontSize: "16px",
          }}
        >
          <MenuItem
            value="All Tasks"
            sx={{
              backgroundColor: "white",
              fontSize: "12px",
            }}
          >
            All Tasks
          </MenuItem>
          <MenuItem
            value="Item1"
            sx={{
              backgroundColor: "white",
              fontSize: "12px",
            }}
          >
            Item1
          </MenuItem>
        </Select> */}
        <FilterSelect data={filtersData} padding="10px" />
        <Button
          variant="contained"
          sx={{
            fontSize: '12px',
            fontWeight: 'bold',
            borderRadius: '12px',
            background: 'rgb(118, 98, 234)',
          }}
          onClick={handleAddTask}
        >
          + Create new task
        </Button>
      </Header>
    </ThemeProvider>
  );
};

export default TaskHeader;
