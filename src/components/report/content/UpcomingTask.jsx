import React, { useState, useEffect } from 'react';
import {
  Typography,
  useMediaQuery,
  Avatar,
  CircularProgress,
} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { mockTasks } from '../../../mockData/taskData';
import { useBoundStore } from '../../../stores/index';
import userImage from '../../../assets/Img/png/userImage.png';
import { shallow } from 'zustand/shallow';
import avatar from '@/assets/Img/png/defaultUser.png';

const UpcomingTask = () => {
  const { tasks, fetchTasks } = useBoundStore((state) => state, shallow);
  const [result, setResult] = useState([]);
  const isLittleScreen = useMediaQuery('(max-width:800px)');

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

  const tasksWithProfilePhotos = result.slice(0, 3);

  const total1 = result[0]?.totalTasks || 0;
  const total2 = result[1]?.totalTasks || 0;
  const total3 = result[2]?.totalTasks || 0;
  const total4 = result[3]?.totalTasks || 0;
  const taskQuantities = [total1, total2, total3, total4];

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
        {tasksWithProfilePhotos.map((task, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              flexDirection: 'column-reverse',
              alignItems: 'center',
            }}
          >
            {/* <img
              src={avatar}
              alt={`User ${index + 1}`}
              style={{ width: '32px', height: '32px', marginTop: '8px' }}
            /> */}
            {/* <Avatar
              sx={{
                borderRadius: '50%',
                bgcolor: `${leader?.colorbg}`,
                color: `${leader?.colorText}`,
              }}
            >
              {leader?.name.split(' ')[0][0].toUpperCase()}
              {leader.name.split(' ').length > 1
                ? leader?.name.split(' ')[1][0].toUpperCase()
                : ''}
            </Avatar> */}
            {task.name ? (
              <Avatar
                sx={{
                  borderRadius: '50%',
                }}
              >
                <Tooltip
                  title={task.name}
                  placement="top"
                  style={{ zIndex: 9 }}
                >
                  {task.name.charAt(0).toUpperCase()}
                </Tooltip>
              </Avatar>
            ) : (
              <CircularProgress />
            )}
            <div
              style={{
                width: '24px',
                height: `${taskQuantities[index] * 15}px`,
                backgroundColor: '#459CED',
                borderTopLeftRadius: '12px',
                borderTopRightRadius: '12px',
              }}
            />
          </div>
        ))}
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
            15
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
            10
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
            5
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
