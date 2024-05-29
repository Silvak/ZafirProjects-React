import React, { useState, useEffect } from 'react';
import { Typography, Divider, useMediaQuery } from '@mui/material';
import { projectsData } from '../../../mockData/projectsData';
import CircleIcon from '@mui/icons-material/Circle';
import { useBoundStore } from '../../../stores/index';
import { shallow } from 'zustand/shallow';

const TaskByProjectRow = () => {
  const { tasks, fetchTasks } = useBoundStore((state) => state, shallow);
  const [result, setResult] = useState([]);
  const isLittleScreen = useMediaQuery('(max-width:800px)');

  const filteredProjects = result.slice(0, 4);

  useEffect(() => {
    fetchTasks();
  }, []);

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
            completed: task.state === 'Completed' ? 1 : 0,
          };
        } else if (project && project._id) {
          uniqueProjects[project._id].totalTasks++;
          if (task.state === 'Completed') {
            uniqueProjects[project._id].completed++;
          }
        }
      });
    }

    const uniqueProjectsArray = Object.values(uniqueProjects);

    setResult(uniqueProjectsArray.slice(0, 3));
  }, [tasks]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '18px',
        marginTop: '-2%',
        marginBottom: '1.2vh',
        borderRadius: '12px',
        marginLeft: 12,
        border: '1px solid #E0E3E8',
        width: '95%',
        paddingTop: 28,
        paddingBlock: 18,
        minHeight: '330px',
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
          {filteredProjects
            .sort((a, b) => b.completed - a.completed)
            .map((project, index) => (
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
                  {project.name}
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
                    {project.totalTasks}
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
                      width: `${
                        (project.completed / project.totalTasks) * 100
                      }%`,
                      height: '100%',
                      backgroundColor: getColor(
                        (project.completed / project.totalTasks) * 100
                      ),
                      borderRadius: '2px',
                    }}
                  />
                </div>
              </div>
            ))}
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
                color: getColor((project.completed / project.totalTasks) * 100),
                fontWeight: 600,
              }}
            >
              {Math.round((project.completed / project.totalTasks) * 100)}%
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
    return '#429482';
  } else {
    return '#429482';
  }
};

export default TaskByProjectRow;
