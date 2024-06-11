import React from 'react';
import { Typography, useMediaQuery } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';

const TaskByProjectRow = ({ completedTasks }) => {
  const isLittleScreen = useMediaQuery('(max-width:800px)');

  const filteredProjects = completedTasks;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '18px',
        marginBottom: '1.2vh',
        borderRadius: '12px',
        marginLeft: 12,
        border: '1px solid #E0E3E8',
        width: '95%',
        paddingTop: 28,
        paddingBlock: 18,
        minHeight: '320px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '90%',
          }}
        >
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  m: 1,
                }}
              >
                <Typography
                  variant="body1"
                  style={{
                    maxWidth: 'max-content',
                    fontSize: isLittleScreen ? '12px' : '14px',
                    fontWeight: 600,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    textAlign: 'center',
                  }}
                >
                  {project.project}
                </Typography>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    gap: '4px',
                    marginBottom: 2,
                  }}
                >
                  <Typography
                    style={{
                      fontSize: '12px',
                      color: '#1D1F24',
                    }}
                  >
                    Tasks:
                  </Typography>
                  <Typography
                    style={{
                      fontSize: '12px',
                      color: '#1D1F24',
                      fontWeight: 600,
                    }}
                  >
                    {project.total}
                  </Typography>

                  <CircleIcon
                    sx={{
                      fontSize: '6px',
                      mt: 0.7,
                      marginInline: 0.5,
                      color: '#D3D5DA',
                    }}
                  />

                  <Typography
                    style={{
                      fontSize: '12px',
                      color: '#1D1F24',
                    }}
                  >
                    Completed:
                  </Typography>
                  <Typography
                    style={{
                      fontSize: '12px',
                      color: '#1D1F24',
                      fontWeight: 600,
                    }}
                  >
                    {project.completed}
                  </Typography>
                </div>

                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '4px',
                    backgroundColor: '#ECEFF3',
                    marginBottom: 28,
                    borderRadius: '2px',
                  }}
                >
                  <div
                    style={{
                      width: `${(project.completed / project.total) * 100}%`,
                      height: '100%',
                      backgroundColor: getColor(
                        (project.completed / project.total) * 100
                      ),
                      borderRadius: '2px',
                    }}
                  />
                </div>
              </div>
            ))
          ) : (
            <Typography sx={{ fontWeight: 700 }}>No tasks to show</Typography>
          )}
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
          }}
        >
          {filteredProjects.map((project, index) => (
            <Typography
              key={index}
              variant="body1"
              style={{
                marginBottom: 8,
                color: 'black',
                fontWeight: 600,
              }}
            >
              {Math.round((project.completed / project.total) * 100)}%
            </Typography>
          ))}
        </div>
      </div>
    </div>
  );
};

const getColor = (percentage) => {
  if (percentage <= 25) {
    return '#E55D57';
  } else if (percentage <= 50) {
    return '#EBA741';
  } else if (percentage <= 75) {
    return '#00913f';
  } else if (percentage <= 99) {
    return '#F71b82';
  } else {
    return '#00913f';
  }
};

export default TaskByProjectRow;
