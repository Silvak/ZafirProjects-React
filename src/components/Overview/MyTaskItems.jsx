import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  ThemeProvider,
  createTheme,
  useMediaQuery,
  Tooltip,
} from '@mui/material';
import {
  AttachFile as AttachFileIcon,
  Circle,
  MarkUnreadChatAltOutlined as MarkUnreadChatAltOutlinedIcon,
} from '@mui/icons-material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';

import { priorityColors, statusColors } from '@/utils/colors';

function MyTaskItems({ tasks }) {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const formatDate = (dateString) => {
    const today = new Date();
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };

    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      return 'Today';
    } else {
      return date.toLocaleDateString('en-US', options);
    }
  };

  const handleClipIcon = () => {
    console.log('toqueé el icono del clip');
  };

  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Box
          sx={{
            display: !isMobile ? 'flex' : 'inherit',
            flexDirection: 'column',
            padding: '8px',
          }}
        >
          {tasks.map((task, index) => (
            <Box
              key={index}
              elevation={0}
              sx={{
                opacity: task.state === 'Completed' ? 1 : 1, // item opacity
                borderRadius: '12px',
                padding: '8px',
                ':hover': { background: '#F6F7FA', cursor: 'pointer' },
              }}
            >
              <Typography variant="h6" fontWeight="bold" noWrap>
                <span style={{ fontSize: '14px', color: '#1D1F24' }}>
                  {task.taskName}
                </span>
              </Typography>
              <Box
                container
                alignItems="center"
                sx={{ display: 'flex', justifyContent: 'space-between' }}
              >
                {!isMobile && (
                  <Box item sx={{ width: '80px' }}>
                    <Typography
                      variant="h6"
                      noWrap
                      style={{
                        fontSize: '12px',
                        fontWeight: 600,
                        padding: '2px 6px',
                        height: '20px',
                        borderRadius: '100px',
                        ...priorityColors[task.priority],
                      }}
                    >
                      <Circle
                        sx={{ fontSize: '10px', marginRight: '4px' }}
                      ></Circle>
                      {task.priority}
                    </Typography>
                  </Box>
                )}

                <Box item>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <div style={{ display: 'flex' }}>
                      <PeopleAltOutlinedIcon
                        sx={{
                          mr: '5px',
                          color: '#A3A5AB',
                          fontSize: '18px',
                        }}
                      />
                      <Typography
                        variant="body1"
                        noWrap
                        style={{
                          fontSize: '12px',
                          fontWeight: 'bold',
                        }}
                      >
                        {task?.members_id?.length}
                      </Typography>
                    </div>

                    {!isMobile && (
                      <div
                        style={{
                          display: 'flex',
                          marginLeft: 10,
                        }}
                      >
                        <AttachFileIcon
                          style={{
                            cursor: 'pointer',
                            color: '#A3A5AB',
                            fontSize: '18px',
                          }}
                          onClick={handleClipIcon}
                        />
                        <Typography
                          variant="body1"
                          noWrap
                          style={{
                            fontSize: '12px',
                            fontWeight: 'bold',
                            marginRight: '1rem',
                          }}
                        >
                          {'1'}
                        </Typography>
                      </div>
                    )}
                  </div>
                </Box>

                <Box
                  item
                  sx={{
                    mt: 0,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <CalendarTodayIcon
                      style={{
                        color: '#A3A5AB',
                        fontSize: '18px',
                      }}
                    />
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      noWrap
                      style={{
                        fontSize: '12px',
                        fontWeight: 400,
                        marginTop: '2px',
                        marginLeft: '10px',
                      }}
                    >
                      {formatDate(task.start)}
                    </Typography>
                  </div>
                </Box>

                <Box item>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    noWrap
                    sx={{
                      fontWeight: 600,
                      fontSize: '12px',
                      borderRadius: '8px',
                      padding: '4px 8px',
                      textAlign: 'center',
                      alignItems: 'center',
                      ...statusColors[task.state],
                    }}
                  >
                    {task.state}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default MyTaskItems;

/* 
//messa
div style={{ display: "flex" }}>
 <MarkUnreadChatAltOutlinedIcon
   sx={{ mr: "5px", color: "gray" }}
 />
 <Typography
   variant="body1"
   noWrap
   style={{
     fontSize: "14px",
     fontWeight: "bold",
   }}
 >
   {"5"}
 </Typography>
/div> 
*/
