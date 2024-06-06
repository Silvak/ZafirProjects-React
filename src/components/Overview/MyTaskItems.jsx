import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from '@mui/material';
import {
  AttachFile as AttachFileIcon,
  Circle,
  MarkUnreadChatAltOutlined as MarkUnreadChatAltOutlinedIcon,
} from '@mui/icons-material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

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
            padding: '0',
          }}
        >
          {!isMobile ? (
            tasks.map((task, index) => (
              <Box
                key={index}
                elevation={0}
                sx={{
                  opacity: task.state === 'Completed' ? 0.5 : 1,
                  borderRadius: '18px',
                  width: '99%',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  overflowY: 'auto',
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  noWrap
                  style={{ fontSize: '14px', marginTop: '16px' }}
                >
                  {task.taskName}
                </Typography>
                <Box
                  container
                  alignItems="center"
                  padding={2}
                  sx={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <Box item sx={{ width: '80px' }}>
                    <Typography
                      variant="h6"
                      noWrap
                      sx={{
                        p: 0.2,
                      }}
                      style={{
                        fontSize: '12px',
                        width: '80px',
                        fontWeight: 'bold',
                        paddingInline: '8px',
                        borderRadius: '6px',
                        ...priorityColors[task.priority],
                      }}
                    >
                      <Circle
                        sx={{ fontSize: '10px', marginRight: '2px' }}
                      ></Circle>
                      {task.priority}
                    </Typography>
                  </Box>

                  <Box item>
                    <div
                      style={{
                        display: 'flex',
                        color: 'darkslategray',
                        alignItems: 'center',
                        // marginLeft: 50,
                      }}
                    >
                      <div style={{ display: 'flex' }}>
                        <MarkUnreadChatAltOutlinedIcon
                          sx={{ mr: '5px', color: 'gray' }}
                        />
                        <Typography
                          variant="body1"
                          noWrap
                          style={{
                            fontSize: '14px',
                            fontWeight: 'bold',
                          }}
                        >
                          {'5'}
                        </Typography>
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          marginLeft: 30,
                        }}
                      >
                        <AttachFileIcon
                          style={{ cursor: 'pointer', color: 'gray' }}
                          onClick={handleClipIcon}
                        />
                        <Typography
                          variant="body1"
                          noWrap
                          style={{
                            fontSize: '14px',
                            fontWeight: 'bold',
                            marginRight: '1rem',
                          }}
                        >
                          {' '}
                          {'1'}
                        </Typography>
                      </div>
                    </div>
                  </Box>
                  <Box
                    item
                    sx={{
                      mt: 0,
                      // marginInline: 2,
                      // minWidth: "max-content",
                      width: '200px',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginLeft: 80,
                      }}
                    >
                      <CalendarTodayIcon
                        style={{
                          color: 'gray',
                        }}
                      />
                      <Typography
                        variant="body1"
                        color="textSecondary"
                        noWrap
                        style={{ fontSize: '14px', fontWeight: 'bold' }}
                      >
                        {formatDate(task.start)}
                      </Typography>
                    </div>
                  </Box>
                  <Box
                    item
                    sx={{
                      mt: 0,
                      // marginInline: 5,
                      width: '140px',
                      display: 'flex',
                      justifyContent: 'end',
                      borderRadius: '6px', // *
                    }}
                  >
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      noWrap
                      sx={{
                        width: '140px',
                        fontWeight: 'bold',
                        fontSize: '14px',
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
            ))
          ) : (
            /////// MOBILE VIEW
            <Box sx={{ minWidth: '208px' }}>
              {tasks.map((task, index) => (
                <Box
                  item
                  key={index}
                  elevation={0}
                  sx={{
                    opacity: task.state === 'Completed' ? 0.5 : 1,
                    overflowY: 'auto',
                    borderBottom: '1px solid #E0E3E8',
                    marginBottom: '5px',
                    padding: 1,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    noWrap
                    style={{ fontSize: '15px', marginTop: '16px' }}
                  >
                    {task.taskName}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      marginTop: '10px',
                      marginBottom: '20px',
                    }}
                  >
                    <Typography
                      variant="h6"
                      noWrap
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: '14px',
                        width: '179px',
                        fontWeight: 'bold',
                        paddingInline: '8px',
                        borderRadius: '6px',
                        padding: '4px',
                        ...priorityColors[task.priority],
                      }}
                    >
                      <Circle
                        sx={{ fontSize: '10px', marginRight: '4px' }}
                      ></Circle>
                      {task.priority}
                      <Circle
                        sx={{ fontSize: '10px', marginLeft: '4px' }}
                      ></Circle>
                    </Typography>
                  </Box>

                  <Box item>
                    <div
                      style={{
                        display: 'flex',
                        color: 'darkslategray',
                        alignItems: 'center',
                        marginLeft: 50,
                      }}
                    >
                      <div style={{ display: 'flex' }}>
                        <MarkUnreadChatAltOutlinedIcon
                          sx={{ mr: '5px', color: 'gray' }}
                        />
                        <Typography
                          variant="body1"
                          noWrap
                          style={{
                            fontSize: '14px',
                            fontWeight: 'bold',
                          }}
                        >
                          {'5'}
                        </Typography>
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          marginLeft: 30,
                        }}
                      >
                        <AttachFileIcon
                          style={{ cursor: 'pointer', color: 'gray' }}
                          onClick={handleClipIcon}
                        />
                        <Typography
                          variant="body1"
                          noWrap
                          style={{
                            fontSize: '14px',
                            fontWeight: 'bold',
                            marginRight: '1rem',
                          }}
                        >
                          {' '}
                          {'1'}
                        </Typography>
                      </div>
                    </div>
                  </Box>

                  {/* Calendar and Status */}
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      marginTop: '10px',
                    }}
                  >
                    <Box
                      item
                      sx={{
                        mt: 0,
                        marginInline: 2,
                        minWidth: 'max-content',
                        marginTop: '10px',
                        marginBottom: '10px',
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
                            color: 'gray',
                          }}
                        />
                        <Typography
                          variant="body1"
                          color="textSecondary"
                          noWrap
                          style={{
                            fontSize: '14px',
                            fontWeight: 'bold',
                          }}
                        >
                          {formatDate(task.start)}
                        </Typography>
                      </div>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      marginTop: '10px',
                    }}
                  >
                    <Box
                      item
                      sx={{
                        mt: 0,
                        marginInline: 2,
                        minWidth: 'min-content',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography
                        variant="body1"
                        color="textSecondary"
                        noWrap
                        sx={{
                          fontWeight: 'bold',
                          fontSize: '14px',
                          borderRadius: '8px',
                          padding: '4px 8px',
                          textAlign: 'center',
                          alignItems: 'center',
                          ...statusColors[task.state],
                          width: '100%',
                        }}
                      >
                        {task.state}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default MyTaskItems;
