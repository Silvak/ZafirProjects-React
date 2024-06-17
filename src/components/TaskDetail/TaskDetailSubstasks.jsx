import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  // useMediaQuery,
  CircularProgress,
  Tooltip,
  TableHead,
  Typography,
} from '@mui/material';
import { RxEyeOpen, RxTrash } from 'react-icons/rx';
import { useBoundStore } from '../../stores';
import { shallow } from 'zustand/shallow';
import { statusColors } from '../../utils/colors';
import TaskDetail from './TaskDetail';
import css from './style.module.css';
import SubTaskForm from '../forms/subtaskForm';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import ConfirmForm from '../forms/ConfirmForm';
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
  // const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [filterSubtask, setFilterSubtask] = useState([]);
  const [cleanForm, setCleanForm] = useState(false);

  const {
    fetchSubtasksById,
    ChangeStateModal,
    ChangeTitleModal,
    ChangeContentModal,
    ChangeIsVisibleButton,
    ChangeTitleAlert,
    ChangeStateAlert,
    removeSubtask,
    ChangeContentTitle,
    ChangeTitleWithBackButton,
  } = useBoundStore((state) => state, shallow);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);
  const [subtaskToDelete, setsubtaskToDelete] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      if (taskId) {
        const updatedSubtasks = await fetchSubtasksById(taskId);
        setFilterSubtask(updatedSubtasks);
      }
    } catch (error) {
      console.error('Error fetching tasks', error);
    }
  };

  const handleAddTask = () => {
    openModal();
  };

  const handleRemoveSubTask = (subtask) => {
    setsubtaskToDelete(subtask);
    setIsModal2Open(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const updatedSubtasks = await removeSubtask(subtaskToDelete);
      setFilterSubtask(updatedSubtasks);

      // DESCOMENTAR ESTO SI QUEREMOS QUE TAMBIEN SE ELIMINEN LOS MIEMBROS DEL PROYECTO
      // const promises = newSubtasks[0]?.members_id?.map((member) => {
      //   return axiosInstance.post(
      //     `/projects/${selectedProject.id}/remove-member`,
      //     {
      //       memberId: member._id,
      //     }
      //   );
      // });

      // // Utilizamos promise.all porque es un array de miembros
      // await Promise.all(promises);

      setIsModal2Open(false);
      ChangeTitleAlert('Subtask deleted');
      ChangeStateAlert(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleCancelDelete = () => {
    setIsModal2Open(false);
  };

  const handleViewSubstask = (subtask) => {
    setCleanForm(true);
    const titleTask = subtask?.taskId?.taskName;

    ChangeTitleWithBackButton(
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Tooltip title="Back to task details" placement="bottom">
          <Button
            onClick={() => handleBack(subtask)}
            style={{ marginRight: '5px' }}
            disableRipple
          >
            <KeyboardBackspaceOutlinedIcon fontSize="large" />
          </Button>
        </Tooltip>
        <span style={{ marginRight: '15px', color: '#6B6E75' }}>Task:</span>
        {/* Typogra */}
        <Typography
          variant="p"
          color="#6B6E75"
          sx={{ cursor: titleTask.length > 68 ? 'default' : 'inherit' }}
        >
          <Tooltip
            title={titleTask.length > 68 ? titleTask : ''}
            placement="bottom"
          >
            {titleTask.slice(0, 68)}
            {titleTask.length > 68 ? '...' : ''}
          </Tooltip>
        </Typography>
      </div>
    );

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

  const handleBack = async (subtask) => {
    if (subtask && subtask.taskId) {
      const { taskId } = subtask;
      clear();
      ChangeTitleModal('Task Detail');
      ChangeContentModal(<TaskDetail task={taskId} isSubtask={false} />);
      ChangeIsVisibleButton(true);
      ChangeStateModal(true);
      setCleanForm(false);
    }
  };

  function clear() {
    ChangeTitleWithBackButton(null);
    ChangeContentTitle('');
  }

  return (
    <>
      {!cleanForm ? (
        <Box sx={{ padding: '10px 0' }} style={{ width: '70vw' }}>
          <p className={css.title}>Subtasks</p>
          <TableHead
            className={css.table}
            style={{
              maxHeight: '65vh',
            }}
          >
            <thead>
              <tr
                style={{
                  width: '66vw',
                  borderBottom:
                    filterSubtask.length > 0 ? '1px solid #e0e3e8' : 'none',
                }}
              >
                {tableHeadData.map((item) => (
                  <th
                    key={item.id}
                    className={css.headText}
                    style={{
                      minWidth: '10rem',
                      marginLeft:
                        item.label === 'Name'
                          ? '0rem'
                          : item.label === 'Status'
                          ? '0rem'
                          : item.label === 'Date'
                          ? '0rem'
                          : item.label === 'Actions'
                          ? '0rem'
                          : item.label === 'Assignee'
                          ? '-0.5rem'
                          : 0,
                      marginRight: item.label === 'Actions' ? '-0.5rem' : 0,
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
                    <td
                      style={{
                        paddingInline: 4,
                        minWidth: 'max-content',
                        width: '20rem',
                      }}
                    >
                      <Tooltip
                        title={item.name ? item.name : ''}
                        placement="bottom-end"
                      >
                        <strong
                          style={{
                            fontSize: '14px',
                            cursor: 'default',
                          }}
                        >
                          {item.name.slice(0, 18)}
                          {item.name.length > 18 ? '...' : ''}
                        </strong>
                      </Tooltip>
                    </td>
                    <td>
                      <div>
                        {item.members_id ? (
                          item.members_id.map((member, key) => (
                            <div
                              key={key}
                              style={{
                                width: '10rem',
                                overflow: 'hidden',
                              }}
                            >
                              <strong
                                style={{
                                  fontSize: '14px',
                                  cursor: 'default',
                                }}
                              >
                                <Tooltip title={member?.name} placement="right">
                                  {member.name.slice(0, 16)}
                                  {member.name.length > 16 ? '...' : ''}
                                </Tooltip>
                              </strong>
                              <br />
                              <Tooltip title={member.email} placement="right">
                                <small style={{ cursor: 'default' }}>
                                  {member?.email?.length > 16
                                    ? member.email.slice(0, 16) + '...'
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
                          ...statusColors[item.state],
                          padding: '2px 8px',
                          width: 'max-content',
                          borderRadius: 8,
                          fontWeight: 500,
                          marginLeft: -10,
                        }}
                      >
                        {item.state}
                      </div>
                    </td>
                    <td>{moment(item.start).format('DD/MM/YYYY')}</td>
                    <td
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: 0,
                      }}
                    >
                      <Button
                        title="Show subtask details"
                        color="inherit"
                        disableRipple
                        onClick={() => handleViewSubstask(item)}
                      >
                        <RxEyeOpen size={25} />
                      </Button>
                      <Button
                        title="Delete subtask"
                        color="inherit"
                        onClick={() => handleRemoveSubTask(item)}
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
            </tbody>
          </TableHead>
          <td
            colSpan={6}
            className={css.icon}
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'center',
              marginTop: '2rem',
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
        // <div
        //   style={{
        //     display: 'flex',
        //     alignItems: 'center',
        //     justifyContent: 'center',
        //     paddingBlock: '26px',
        //     fontSize: '18px',
        //     width: 'max-content',
        //     border: 'none',
        //   }}
        //   className={css.backText}
        //   onClick={() => handleBack()}
        // >
        //   <SubdirectoryArrowLeftIcon sx={{ fontSize: '2rem' }} />
        //   <Tooltip title="Return to main task details" placement="top">
        //     <span>Back to Task</span>
        //   </Tooltip>
        // </div>
        ''
      )}
      <Modal isOpen={isModalOpen || isModal2Open} onClose={closeModal}>
        {isModalOpen ? (
          <SubTaskForm
            taskId={taskId}
            projectId={taskId}
            closeModal={closeModal}
            setFilterSubtask={setFilterSubtask}
          />
        ) : (
          isModal2Open && (
            <ConfirmForm
              handleCancelDelete={handleCancelDelete}
              handleConfirmDelete={handleConfirmDelete}
              itemToDelete={subtaskToDelete}
            />
          )
        )}
      </Modal>
    </>
  );
};

export default TaskDetailSubstasks;
