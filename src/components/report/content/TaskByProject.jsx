import React, { useState, useEffect } from 'react';
import { Typography, Divider, useMediaQuery, Tooltip } from '@mui/material';
import { useBoundStore } from '../../../stores/index';
import { shallow } from 'zustand/shallow';

const CustomTaskCounter = ({ quantityTasks }) => {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: `${quantityTasks * 5}px`,
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

const TaskByProject = () => {
  const { tasks } = useBoundStore((state) => state, shallow);
  const isLittleScreen = useMediaQuery('(max-width:800px)');
  const [result, setResult] = useState([]);

  // useEffect(() => {
  //   fetchTasks();
  // }, []);

  useEffect(() => {
    let uniqueProjects = {};

    if (tasks) {
      tasks.forEach((task) => {
        const project = task.projectId;
        if (project && project._id && !uniqueProjects[project._id]) {
          uniqueProjects[project._id] = {
            name: project.name,
            progress: project.progress,
            totalTasks: 1,
          };
        } else if (project && project._id) {
          uniqueProjects[project._id].totalTasks++;
        }
      });
    }
    const uniqueProjectsArray = Object.values(uniqueProjects);

    setResult(uniqueProjectsArray.slice(0, 3));
  }, [tasks]);

  const colors = ['#459CED', '#D377F3', '#5D923D'];

  const sumOfTasks = tasks?.length;

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
          sx={{
            color: '#1D1F24',
            fontFamily: 'Poppins',
            fontSize: '18px',
            fontWeight: 'bold',
          }}
        >
          {sumOfTasks}
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
        {result &&
          result.map((project, index) => (
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
                  height: `${project.totalTasks * 5}px`,
                  width: '44px',
                  backgroundColor: colors[index],
                  borderTopLeftRadius: '12px',
                  borderTopRightRadius: '12px',
                }}
              >
                {/* Elemento sobre la barra */}
                {!isLittleScreen && (
                  <CustomTaskCounter quantityTasks={project.totalTasks} />
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
        {result.map((project, index) => (
          <div
            key={index}
            style={{ display: 'flex', alignItems: 'center', cursor: 'default' }}
          >
            <Tooltip title={project.name}>
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
                {project.name.slice(0, 12)}
                {project.name.slice(0, 12).length >= 12 ? '...' : ''}
              </Typography>
            </Tooltip>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskByProject;
