import React from 'react';
import { Typography, Divider, useMediaQuery, Tooltip } from '@mui/material';

const CustomTaskCounter = ({ quantityTasks }) => {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: `${quantityTasks * 1.5}px`,
        left: '150%',
        transform: 'translateX(-50%)',
        backgroundColor: '#000',
        color: '#fff',
        padding: '4px 8px',
        fontSize: '10px',
        width: 'max-content',
        borderRadius: '30px 30px 30px 0px',
      }}
    >
      {`${quantityTasks} tasks`}
    </div>
  );
};

const TaskByProject = ({ reduceProjects, totalTasks }) => {
  const isLittleScreen = useMediaQuery('(max-width:800px)');

  const colors = ['#459CED', '#D377F3', '#5D923D'];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '28px',
        marginTop: '-2%',
        marginBottom: '1.2vh',
        borderRadius: '12px',
        border: '1px solid #E0E3E8',
        marginInline: '18px',
        minHeight: '290px',
      }}
    >
      {/* Primera fila */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '8px',
        }}
      >
        <Typography
          variant="h3"
          style={{
            color: '#6B6E75',
            fontFamily: 'Poppins',
            fontSize: '14px',
            fontWeight: 400,
          }}
        >
          Total tasks: <span style={{ fontWeight: 800 }}>{totalTasks}</span>
        </Typography>
      </div>
      {/* Segunda fila */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          marginTop: 'auto',
        }}
      >
        {reduceProjects &&
          reduceProjects.map((project, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                position: 'relative',
              }}
            >
              <div
                style={{
                  height: `${project.total * 1.5}px`,
                  width: '44px',
                  backgroundColor: colors[index],
                  borderTopLeftRadius: '12px',
                  borderTopRightRadius: '12px',
                }}
              >
                {/* Elemento sobre la barra */}
                {!isLittleScreen && (
                  <CustomTaskCounter quantityTasks={project.total} />
                )}
              </div>
            </div>
          ))}
      </div>
      {/* Divider */}
      <Divider
        variant="middle"
        style={{
          border: '1px solid #E0E3E8',
        }}
      />
      {/* Tercera fila */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          marginTop: '8px',
        }}
      >
        {reduceProjects?.map((project, index) => (
          <div
            key={index}
            style={{ display: 'flex', alignItems: 'center', cursor: 'default' }}
          >
            <Tooltip title={project.project}>
              <Typography
                variant="body1"
                style={{
                  fontSize: isLittleScreen ? '12px' : '14px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: isLittleScreen ? 'wrap' : 'nowrap',
                  textAlign: 'center',
                  minWidth: 70,
                }}
              >
                {project.project.slice(0, 12)}
                {project.project.length > 12 ? '...' : ''}
              </Typography>
            </Tooltip>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskByProject;
