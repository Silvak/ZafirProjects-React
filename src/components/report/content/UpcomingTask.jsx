import React from 'react';
import { Typography, Avatar, CircularProgress } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';

const getColor = (taskCount, maxTasks) => {
  const intensity = Math.min(1, taskCount / maxTasks);
  return `rgba(69, 156, 237, ${intensity})`;
};

const UpcomingTask = ({ usersWithData }) => {
  const maxTasks = Math.max(...usersWithData.map((user) => user.taskCount), 0);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '32px',
        marginTop: '-2%',
        marginBottom: '1.2vh',
        borderRadius: '12px',
        border: '1px solid #E0E3E8',
        marginInline: '18px',
        position: 'relative',
        minHeight: '330px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          marginTop: 'auto',
        }}
      >
        {usersWithData?.length > 0 ? (
          usersWithData?.map((user, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                flexDirection: 'column-reverse',
                alignItems: 'center',
              }}
            >
              {user.name ? (
                <Tooltip
                  title={
                    user && user.name
                      ? `${user?.name} / Tasks: ${user?.taskCount}`
                      : ''
                  }
                  placement="top"
                  style={{ zIndex: 9999 }}
                >
                  <Avatar
                    sx={{
                      bgcolor: user?.colorbg ? user.colorbg : 'gray',
                      borderRadius: '50%',
                      fontWeight: 700,
                      boxShadow: '1px 1px lightgray',
                      textShadow: '1px 1px gray',
                    }}
                  >
                    {user.name ? user.name.split(' ')[0].charAt(0) : '?'}
                    {user?.name?.split(' ').length > 0
                      ? user?.name?.split(' ')[1]?.charAt(0)
                      : ''}
                  </Avatar>
                </Tooltip>
              ) : (
                <CircularProgress />
              )}
              <div
                style={{
                  width: '24px',
                  height: `${user.taskCount}px`,
                  backgroundColor: getColor(user.taskCount, maxTasks),
                  borderTopLeftRadius: '12px',
                  borderTopRightRadius: '12px',
                }}
              />
            </div>
          ))
        ) : (
          <p>No task with users</p>
        )}
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: '0',
          left: '0',
          width: '100%',
          padding: '40px 0px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="body2"
            style={{
              fontSize: '14px',
              fontWeight: 'normal',
              color: 'lightgray',
              textAlign: 'center',
              marginBlock: '22px',
              marginRight: '12px',
            }}
          >
            150
          </Typography>
          <div
            style={{
              borderBottom: '1px solid lightgray',
              width: '85%',
              marginRight: '14px',
            }}
          />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="body2"
            style={{
              fontSize: '14px',
              fontWeight: 'normal',
              color: 'lightgray',
              textAlign: 'center',
              marginBlock: '22px',
              marginRight: '12px',
            }}
          >
            100
          </Typography>
          <div
            style={{
              borderBottom: '1px solid lightgray',
              width: '85%',
              marginRight: '14px',
            }}
          />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="body2"
            style={{
              fontSize: '14px',
              fontWeight: 'normal',
              color: 'lightgray',
              textAlign: 'center',
              marginBlock: '22px',
              marginRight: '12px',
            }}
          >
            50
          </Typography>
          <div
            style={{
              borderBottom: '1px solid lightgray',
              width: '85%',
              marginRight: '14px',
            }}
          />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="body2"
            style={{
              fontSize: '14px',
              fontWeight: 'normal',
              color: 'lightgray',
              textAlign: 'center',
              marginBlock: '22px',
              marginRight: '12px',
            }}
          >
            0
          </Typography>
          <div
            style={{
              borderBottom: '1px solid lightgray',
              width: '85%',
              marginRight: '14px',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default UpcomingTask;
