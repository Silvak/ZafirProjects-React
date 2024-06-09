import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  useMediaQuery,
  CircularProgress,
  Tooltip,
  TableHead,
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
import Modal from '../modal/modalSubtask';

const tableHeadData = [
  { id: 1, label: 'Name' },
  { id: 2, label: 'Assignee' },
  { id: 3, label: 'Status' },
  { id: 4, label: 'Date' },
  { id: 5, label: 'Actions' },
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
  } = useBoundStore((state) => state, shallow);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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

  // const handleAddTask = () => {
  //   // ChangeStateModal(true);
  //   ChangeTitleModal('Add SubTask');
  //   ChangeContentModal(<SubTaskForm taskId={taskId} projectId={taskId} />);
  // };

  const handleAddTask = () => {
    openModal();
  };

  const handleRemoveSubTask = async (subtask) => {
    const updatedSubtasks = await removeSubtask(subtask);
    setFilterSubtask(updatedSubtasks);
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
          <TableHead
            className={css.table}
            style={{ padding: isMobile ? '5px' : '20px', maxHeight: '650px' }}
          >
            <thead>
              <tr>
                {tableHeadData.map((item) => (
                  <th
                    key={item.id}
                    className={css.headText}
                    style={{
                      marginLeft: item.label === 'Status' ? '1.5rem' : 0,
                    }}
                  >
                    {item.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filterSubtask ? (
                filterSubtask.map((item) => (
                  <tr
                    key={item._id}
                    style={{
                      border: 'none',
                      minWidth: 'max-content',
                    }}
                  >
                    <td style={{ maxWidth: '10rem', paddingInline: 4 }}>
                      <Tooltip title={item.name} placement="bottom">
                        <strong style={{ fontSize: '14px', cursor: 'default' }}>
                          {item.name.slice(0, 10)}
                          {item.name.length > 10 ? '...' : ''}
                        </strong>
                      </Tooltip>
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
                                minWidth: 'max-content',
                              }}
                            >
                              <strong
                                style={{
                                  fontSize: '14px',
                                  cursor: 'default',
                                }}
                              >
                                <Tooltip title={member.name} placement="right">
                                  {member.name.slice(0, 12)}
                                  {member.name.length > 12 ? '...' : ''}
                                </Tooltip>
                              </strong>
                              <br />
                              <Tooltip title={member.email} placement="right">
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
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Tooltip title="Show subtask details" placement="top">
                        <Button
                          color="inherit"
                          disableRipple
                          onClick={() => handleViewSubstask(item)}
                        >
                          <RxEyeOpen size={25} />
                        </Button>
                      </Tooltip>
                      <Tooltip title="Delete subtask" placement="top">
                        <Button
                          color="inherit"
                          onClick={() => handleRemoveSubTask(item)}
                        >
                          <RxTrash size={25} />
                        </Button>
                      </Tooltip>
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
            </tbody>
          </TableHead>
          <td
            colSpan={6}
            className={css.icon}
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'center',
              marginBlock: '2rem',
            }}
          >
            <Button
              // disableRipple
              color="primary"
              variant="outlined"
              onClick={handleAddTask}
              sx={{ border: '1px solid', borderRadius: '16px' }}
            >
              + Add substask
            </Button>
          </td>
        </Box>
      ) : (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingBlock: '26px',
            fontSize: '18px',
            width: 'max-content',
            border: 'none',
          }}
          className={css.backText}
          onClick={() => handleBack()}
        >
          <SubdirectoryArrowLeftIcon sx={{ fontSize: '2rem' }} />
          <Tooltip title="Return to main task details" placement="top">
            <span>Back to Task</span>
          </Tooltip>
        </div>
      )}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <SubTaskForm
          taskId={taskId}
          projectId={taskId}
          closeModal={closeModal}
          setFilterSubtask={setFilterSubtask}
        />
      </Modal>
    </>
  );
};

export default TaskDetailSubstasks;
