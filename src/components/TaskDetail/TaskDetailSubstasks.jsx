import { useEffect, useState } from 'react';
import { Box, Button, useMediaQuery } from '@mui/material';
import { RxEyeOpen } from 'react-icons/rx';
import { useBoundStore } from '../../stores';
import { shallow } from 'zustand/shallow';

import { statusColors } from '../../utils/colors';
import TaskDetail from './TaskDetail';
import css from './style.module.css';
import SubTaskForm from '../forms/subtaskForm';

const tableHeadData = [
  { id: 1, label: 'Name' },
  { id: 2, label: 'Assignee' },
  { id: 3, label: 'Status' },
  { id: 4, label: 'Date' },
  { id: 5, label: 'Action' },
];

const TaskDetailSubstasks = ({ taskId }) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [filterSubtask, setFilterSubtask] = useState([]);

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

  const {
    subtasks,
    fetchSubtasks,
    ChangeStateModal,
    ChangeTitleModal,
    ChangeContentModal,
    ChangeIsVisibleButton,
  } = useBoundStore((state) => state, shallow);

  const handleAddTask = () => {
    ChangeStateModal(true);
    ChangeTitleModal('Add SubTask');
    ChangeContentModal(<SubTaskForm taskId={taskId} />);
  };

  useEffect(() => {
    if (subtasks) {
      const subtasksToTask = subtasks.filter(
        (subtask) => subtask.taskId === taskId
      );
      setFilterSubtask(subtasksToTask);
    }
  }, [taskId, subtasks]);

  const handleViewSubstask = (subtask) => {
    ChangeTitleModal('Substask Detail');
    ChangeContentModal(<TaskDetail task={subtask} isSubtask={true} />);
    ChangeIsVisibleButton(true);
    ChangeStateModal(true);
  };

  return (
    <Box sx={{ padding: '50px 0' }}>
      <p className={css.title}>Subtasks</p>
      <table
        className={css.table}
        style={{ padding: isMobile ? '5px' : '20px' }}
      >
        <tr>
          {tableHeadData.map((item) => (
            <th key={item.id} className={css.headText}>
              {item.label}
            </th>
          ))}
        </tr>

        {filterSubtask &&
          filterSubtask.map((item) => (
            <tr key={item.id}>
              <td>
                <strong>{item.name}</strong>
              </td>
              <td>
                <div>
                  {/* <img
                    src={item.assignees.profilePhoto}
                    alt={`Photo of ${item.assignees.name}`}
                  /> */}
                  <strong>{item.members}</strong>
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
          <Button color="inherit" onClick={handleAddTask}>
            + Add substask
          </Button>
        </tr>
      </table>
    </Box>
  );
};
export default TaskDetailSubstasks;
