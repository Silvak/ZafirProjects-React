import useMediaQuery from '@mui/material/useMediaQuery';
import React, { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import CreateTaskForm from '@/components/forms/createTaskForm';
import TaskHeader from '@/components/taskAccordion/taskHeader';
import TaskList from '@/components/taskAccordion/taskList';
import { useBoundStore } from '@/stores/index';
import { shallow } from 'zustand/shallow';

import { useParams } from 'react-router-dom';

const App = () => {
  const [view, setView] = useState('Format List');

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const params = useParams();

  const {
    myTasks,
    ChangeStateModal,
    ChangeContentModal,
    ChangeTitleModal,
    fetchTasksById,
    selectedProject,
  } = useBoundStore((state) => state, shallow);

  useEffect(() => {
    if (params.id) {
      const fetchData = async () => {
        try {
          // Only fetch tasks if idProject has changed
          await fetchTasksById(params.id);
        } catch (error) {
          console.error('Error fetching tasks', error);
        }
      };

      fetchData();
    }
  }, [params.id, fetchTasksById]);

  const [pendingTasks, setPendingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [workingTasks, setWorkingTasks] = useState([]);

  useEffect(() => {
    if (Array.isArray(myTasks)) {
      setPendingTasks(myTasks.filter((task) => task.state === 'Pending'));
      setCompletedTasks(myTasks.filter((task) => task.state === 'Completed'));
      setWorkingTasks(myTasks.filter((task) => task.state === 'In Progress'));
    }
  }, [myTasks]);

  const handleButton = (buttonName) => {
    setView(buttonName);
  };

  const handleAddTask = (title, description) => {
    ChangeTitleModal('Create Task');
    ChangeContentModal(
      <CreateTaskForm placeholderTaskName="task 1" projectId={params.id} />
    );
    ChangeStateModal(true);
  };

  const setColumnsStyle = () => {
    if (view === 'View Kanban' && !isMobile) return 'repeat(3,1fr)';
    if (view === 'View Kanban' && isMobile) return '1fr';
    return '1fr'; // Default style
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div sx={{ minWidth: '250px' }}>
        <TaskHeader
          title={selectedProject?.name ? selectedProject.name : 'No projects'}
          handleAddTask={handleAddTask}
          handleButton={handleButton}
        />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: setColumnsStyle(),
            gap: '1rem',
            padding: '0 20px',
          }}
        >
          <div>
            <TaskList
              title="In progress Tasks"
              tasks={workingTasks}
              view={view}
              state="In Progress"
              handleAddTask={() => handleAddTask()}
            />
          </div>
          <div>
            <TaskList
              title="Pending Tasks"
              tasks={pendingTasks}
              view={view}
              state="Pending"
              handleAddTask={() => handleAddTask()}
            />
          </div>
          <div>
            <TaskList
              title="Completed Tasks"
              tasks={completedTasks}
              view={view}
              state="Completed"
              handleAddTask={() => handleAddTask()}
            />
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default App;
