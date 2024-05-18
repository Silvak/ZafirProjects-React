import { Grid, Paper, Typography } from '@mui/material';
import { useDrag, useDrop } from 'react-dnd';

//icons
import {
  AttachFile as AttachFileIcon,
  Circle,
  MarkUnreadChatAltOutlined as MarkUnreadChatAltOutlinedIcon,
  MoreHoriz as MoreHorizIcon,
} from '@mui/icons-material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CircleIcon from '@mui/icons-material/Circle';
import { Avatar, Divider } from '@mui/material';
import AvatarGroup from '@mui/material/AvatarGroup';
import { useBoundStore } from '../../stores';
import TaskDetail from '../TaskDetail/TaskDetail';
import { statusColors, priorityColors } from '../../utils/colors';

const TaskItem = ({ task, isMobile, isKanbanView }) => {
  const formatDate = (dateString) => {
    const today = new Date();
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };

    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      return 'Today';
    } else {
      return date.toLocaleDateString('en-US', options);
    }
  };

  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: 'task',
      item: { id: task._id },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
    }),
    []
  );

  const {
    ChangeStateModal,
    ChangeTitleModal,
    ChangeContentModal,
    ChangeIsVisibleButton,
  } = useBoundStore((state) => state);

  const handleMoreIcon = (task) => {
    ChangeStateModal(true);
    ChangeTitleModal('Task Detail');
    ChangeContentModal(<TaskDetail task={task} />);
    ChangeIsVisibleButton(true);
  };
  const handleClipIcon = () => {
    alert('toqueé el icono del clip');
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: '14px',
        opacity: opacity,
        borderRadius: '12px',
        width: '100%',
        marginInline: 'auto',
        boxShadow:
          ' rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px',
      }}
      ref={dragRef}
    >
      {/* iconos para vista Kanban */}
      {isMobile ||
        (isKanbanView && (
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
              <Typography
                sx={{
                  fontWeight: 'bold',
                  color: '#52555B',
                  fontSize: '14px',
                  marginY: 2.5,
                }}
              >
                {task.taskName}
              </Typography>
              <ArrowForwardIcon
                style={{ color: '#6B6E75', cursor: 'pointer' }}
                onClick={() => handleMoreIcon(task)}
              />
            </div>
            <Divider sx={{ mb: 2 }}></Divider>
            {/* {task.screen && (
              <img
                src={task.screen}
                alt="Task Screen"
                style={{
                  width: "100%",
                  marginBottom: "10px",
                  border: "3px solid #F6F7FA",
                  borderRadius: 8,
                }}
              />
            )} */}
          </div>
        ))}
      <Typography
        variant='h6'
        fontWeight='bold'
        noWrap
        style={{
          fontSize: '14px',
          marginTop: '16px',
          cursor: 'pointer',
        }}
        onClick={() => (isMobile ? handleMoreIcon(task) : undefined)}
      >
        {task.taskName}
      </Typography>
      <Grid
        container
        spacing={0}
        columns={isMobile || isKanbanView ? 6 : 12}
        alignItems='center'
        padding={0}
      >
        <Grid item xs={12} sm={!isKanbanView ? 2 : 1}>
          <Typography
            variant='h6'
            noWrap
            style={{
              fontSize: '12px',
              width: 'min-content',
              fontWeight: 'bold',
              paddingInline: '4px',
              paddingBlock: '2px',
              borderRadius: '6px',
              margin: isMobile ? '10px 0' : '0',
              ...priorityColors[task.priority],
            }}
          >
            <Circle sx={{ fontSize: '10px', marginRight: '2px' }}></Circle>
            {task.priority}
          </Typography>
        </Grid>
        {isKanbanView && (
          <CircleIcon
            style={{
              fontSize: '6px',
              color: 'lightgray',
              marginRight: '0rem',
              marginInline: '1rem',
            }}
          />
        )}
        {!isKanbanView && (
          <Grid item xs={12} sm={2}>
            <Typography
              variant='body1'
              color='textSecondary'
              noWrap
              style={{ fontSize: '14px', fontWeight: 'bold' }}
              sx={{ ml: '3rem' }}
            >
              {task.members.length}
            </Typography>
          </Grid>
        )}
        {/* {!isKanbanView && (
          <Grid item xs={12} sm={1} sx={{ marginRight: "3rem" }}>
            <AvatarGroup max={3} style={{ marginRight: isMobile ? "30%" : "" }}>
              {task.assignees.map((assignee, index) => (
                <
                  key={index}
                  alt={assignee.name}
                  src={assignee.profile}
                />
              ))}
            </AvatarGroup>
          </Grid>
        )} */}
        <Grid item xs={12} sm={2}>
          <div
            style={{
              display: 'flex',
              color: 'darkslategray',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex' }}>
              <MarkUnreadChatAltOutlinedIcon
                sx={{ mr: '5px', color: 'gray' }}
              />
              <Typography
                variant='body1'
                noWrap
                style={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                }}
              >
                {'5'}
              </Typography>
            </div>
            {isKanbanView && (
              <CircleIcon
                style={{
                  fontSize: '6px',
                  color: 'lightgray',
                  marginInline: '1rem',
                }}
              />
            )}
            <div
              style={{
                display: 'flex',
                marginLeft: !isKanbanView ? 30 : 0,
              }}
            >
              <AttachFileIcon
                style={{ cursor: 'pointer', color: 'gray' }}
                onClick={handleClipIcon}
              />
              <Typography
                variant='body1'
                noWrap
                style={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  marginRight: '1rem',
                }}
              >
                {' '}
                {1}
                {isKanbanView && (
                  <CircleIcon
                    style={{
                      fontSize: '6px',
                      color: 'lightgray',
                      marginInline: '2rem',
                    }}
                  />
                )}
              </Typography>
            </div>
            {/* {isMobile ||
              (isKanbanView && (
                <Grid item xs={12} sm={1}>
                  <AvatarGroup max={2}>
                    {task.assignees.map((assignee, index) => (
                      <Avatar
                        key={index}
                        alt={assignee.name}
                        src={assignee.profile}
                      />
                    ))}
                  </AvatarGroup>
                </Grid>
              ))} */}
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          sm={isKanbanView ? 3 : 2}
          sx={{
            mt: isKanbanView ? '20px' : isMobile ? '5px' : '0',
            minWidth: 'max-content',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <CalendarTodayIcon
              style={{
                marginTop: isMobile ? '5px' : '',
                marginRight: isMobile ? '' : '5px',
                color: 'gray',
              }}
            />
            <Typography
              variant='body1'
              color='textSecondary'
              noWrap
              style={{ fontSize: '14px', fontWeight: 'bold' }}
            >
              {formatDate(task.start)}
            </Typography>
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          sm={1}
          sx={{
            mt: isKanbanView ? 4 : 0,
            marginInline: 2,
            minWidth: 'min-content',
          }}
        >
          <Typography
            variant='body1'
            color='textSecondary'
            noWrap
            sx={{
              fontWeight: 'bold',
              fontSize: '14px',
              borderRadius: '8px',
              padding: '4px 8px',
              textAlign: 'center',
              alignItems: 'center',
              ...statusColors[task.state],
            }}
          >
            {task.state}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={1}>
          {!isKanbanView && (
            <MoreHorizIcon
              style={{
                color: 'darkslategray',
                cursor: 'pointer',
                visibility: isMobile ? 'hidden' : 'inherits',
              }}
              onClick={() => handleMoreIcon(task)}
              sx={{ ml: '2rem' }}
            />
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};
export default TaskItem;
