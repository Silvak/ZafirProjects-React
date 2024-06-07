import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  useMediaQuery,
  CircularProgress,
  Tooltip,
} from '@mui/material';
import { RxEyeOpen, RxTrash } from 'react-icons/rx';
import { useBoundStore } from '../../stores';
import { shallow } from 'zustand/shallow';
import { statusColors } from '../../utils/colors';
import TaskDetail from './TaskDetail';
import css from './style.module.css';
import SubTaskForm from '../forms/subtaskForm';
import SubdirectoryArrowLeftIcon from '@mui/icons-material/SubdirectoryArrowLeft';
import moment from 'moment';

const tableHeadData = [
  { id: 1, label: 'Name' },
  { id: 2, label: 'Assignee' },
  { id: 3, label: 'Status' },
  { id: 4, label: 'Date' },
  { id: 5, label: 'Action' },
];

const TaskDetailSubstasks = ({ taskId, task }) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [filterSubtask, setFilterSubtask] = useState([]);
  const [cleanForm, setCleanForm] = useState(false);
  const [customTask, setCustomTask] = useState(null);

  const {
    subtasks,
    fetchSubtasksById,
    ChangeStateModal,
    ChangeTitleModal,
    ChangeContentModal,
    ChangeIsVisibleButton,
    ChangeTitleAlert,
    ChangeStateAlert,
    removeSubtask,
    User,
    updateProjects,
  } = useBoundStore((state) => state, shallow);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      if (taskId) {
        await fetchSubtasksById(taskId);
      }
      const result = subtasks.filter((sub) => sub.taskId._id === taskId);
      setFilterSubtask(result);
    } catch (error) {
      console.error('Error fetching tasks', error);
    }
  };

  const handleAddTask = () => {
    // ChangeStateModal(true);
    ChangeTitleModal('Add SubTask');
    ChangeContentModal(<SubTaskForm taskId={taskId} projectId={taskId} />);
  };

  const handleRemoveSubTask = async (idSubtasks) => {
    const result = await removeSubtask(idSubtasks);
    setFilterSubtask(result);
    ChangeTitleAlert('Subtask deleted');
    ChangeStateAlert(true);
  };

  const handleViewSubstask = (subtask) => {
    setCustomTask(subtask.taskId);
    setCleanForm(true);
    ChangeTitleModal('Substask Detail');
    ChangeContentModal(
      <TaskDetail
        task={subtask}
        isSubtask={true}
        setFilterSubtask={setFilterSubtask}
      />
    );
    ChangeIsVisibleButton(true);
    ChangeStateModal(true);
  };

  const handleBack = () => {
    ChangeTitleModal('Task Detail');
    ChangeContentModal(<TaskDetail task={customTask} isSubtask={false} />);
    ChangeIsVisibleButton(true);
    ChangeStateModal(true);
    setCleanForm(false);
  };

  return (
    <>
      {!cleanForm ? (
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
              {filterSubtask ? (
                filterSubtask.map((item) => (
                  <tr key={item._id}>
                    <td style={{ maxWidth: '10rem', paddingInline: 4 }}>
                      <strong style={{ fontSize: '14px' }}>{item.name}</strong>
                    </td>
                    <td>
                      <div>
                        {item.members_id ? (
                          item.members_id.map((member) => (
                            <div
                              key={member._id}
                              style={{
                                width: '7rem',
                                overflow: 'hidden',
                              }}
                            >
                              <strong style={{ fontSize: '14px' }}>
                                {member.name}
                              </strong>
                              <br />
                              <Tooltip title={member.email}>
                                <small style={{ cursor: 'default' }}>
                                  {member?.email?.length > 12
                                    ? member.email.slice(0, 12) + '...'
                                    : member.email}
                                </small>
                              </Tooltip>
                            </div>
                          ))
                        ) : (
                          <CircularProgress
                            style={{ color: '#C02327' }}
                            sx={{ m: 2 }}
                            size="32px"
                          />
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
                        {item.state}
                      </div>
                    </td>
                    <td>{moment(item.start).format('DD/MM/YYYY')}</td>
                    <td
                      className={css.icon}
                      style={{ display: 'flex', alignItems: 'center' }}
                    >
                      <Button
                        color="inherit"
                        onClick={() => handleViewSubstask(item)}
                      >
                        <RxEyeOpen size={25} />
                      </Button>
                      <Button
                        color="inherit"
                        onClick={() => handleRemoveSubTask(item._id)}
                      >
                        <RxTrash size={25} />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <CircularProgress
                  style={{ color: '#C02327' }}
                  sx={{ m: 2 }}
                  size="32px"
                />
              )}
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
      ) : (
        <div
          style={{
            cursor: 'pointer',
            display: 'flex',
            gap: 4,
            paddingBlock: 16,
          }}
          onClick={() => handleBack()}
        >
          <SubdirectoryArrowLeftIcon color="primary" className={css.icon} />
          <span className={css.backText}>Back to Task</span>
        </div>
      )}
    </>
  );
};

export default TaskDetailSubstasks;
