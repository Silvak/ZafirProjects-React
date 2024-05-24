import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  useMediaQuery,
  CircularProgress,
  Tooltip,
} from '@mui/material';
import { RxEyeOpen } from 'react-icons/rx';
import { useBoundStore } from '../../stores';
import { shallow } from 'zustand/shallow';
import { statusColors } from '../../utils/colors';
import TaskDetail from './TaskDetail';
import css from './style.module.css';
import SubTaskForm from '../forms/subtaskForm';
import { axiosInstance } from '../../config/apiConfig';

const tableHeadData = [
  { id: 1, label: 'Name' },
  { id: 2, label: 'Assignee' },
  { id: 3, label: 'Status' },
  { id: 4, label: 'Date' },
  { id: 5, label: 'Action' },
];

const TaskDetailSubstasks = ({ taskId }) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [users, setUsers] = useState([]);
  const [filterSubtask, setFilterSubtask] = useState([]);

  const {
    subtasks,
    fetchSubtasks,
    ChangeStateModal,
    ChangeTitleModal,
    ChangeContentModal,
    ChangeIsVisibleButton,
  } = useBoundStore((state) => state, shallow);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchSubtasks();
      } catch (error) {
        console.error('Error fetching tasks', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axiosInstance.get('/user');
        setUsers(data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (subtasks && users.length > 0) {
      const subtasksToTask = subtasks.filter(
        (subtask) => subtask.taskId === taskId
      );
      const subtaskWithMember = subtasksToTask.map((subtask) => {
        const memberInfo = users.find((user) => user._id === subtask.members);
        return { ...subtask, memberInfo };
      });
      setFilterSubtask(subtaskWithMember);
    }
  }, [taskId, subtasks, users]);

  const handleAddTask = () => {
    ChangeStateModal(true);
    ChangeTitleModal('Add SubTask');
    ChangeContentModal(<SubTaskForm taskId={taskId} />);
  };

  const handleViewSubstask = (subtask) => {
    ChangeTitleModal('Substask Detail');
    ChangeContentModal(<TaskDetail task={subtask} isSubtask={true} />);
    ChangeIsVisibleButton(true);
    ChangeStateModal(true);
  };

  console.log(filterSubtask);

  return (
    <Box sx={{ padding: '50px 0' }}>
      <p className={css.title}>Subtasks</p>
      <table
        className={css.table}
        style={{ padding: isMobile ? '5px' : '20px' }}
      >
        <thead>
          <tr>
            {tableHeadData.map((item) => (
              <th key={item.id} className={css.headText}>
                {item.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filterSubtask &&
            filterSubtask.map((item) => (
              <tr key={item.id}>
                <td>
                  <strong style={{ fontSize: '14px' }}>{item.name}</strong>
                </td>
                <td>
                  <div>
                    {item.memberInfo ? (
                      <div
                        style={{
                          width: '7rem',
                          overflow: 'hidden',
                        }}
                      >
                        <strong style={{ fontSize: '14px' }}>
                          {item.memberInfo.name}
                        </strong>
                        <br />
                        <Tooltip title={item.memberInfo.email}>
                          <small style={{ cursor: 'default' }}>
                            {item.memberInfo.email.length > 12
                              ? item.memberInfo.email.slice(0, 12) + '...'
                              : item.memberInfo.email}
                          </small>
                        </Tooltip>
                      </div>
                    ) : (
                      <CircularProgress />
                    )}
                  </div>
                </td>
                <td>
                  <div
                    style={{
                      ...statusColors[item.status],
                      padding: '5px 10px',
                      borderRadius: '5px',
                      textAlign: 'center',
                    }}
                  >
                    {item.status}
                  </div>
                </td>
                <td>{item.start}</td>
                <td className={css.icon}>
                  <Button
                    color="inherit"
                    onClick={() => handleViewSubstask(item)}
                  >
                    <RxEyeOpen size={25} />
                  </Button>
                </td>
              </tr>
            ))}
          <tr>
            <td colSpan={5} className={css.icon}>
              <Button disableRipple color="inherit" onClick={handleAddTask}>
                + Add substask
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </Box>
  );
};

export default TaskDetailSubstasks;
