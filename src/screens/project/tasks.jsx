import CreateTaskForm from '@/components/forms/createTaskForm';
import TaskHeader from '@/components/taskAccordion/taskHeader';
import { useBoundStore } from '@/stores/index';
import React, { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { shallow } from 'zustand/shallow';

const tasks = () => {
  const [view, setView] = useState('Format List');
  const params = useParams();

  const {
    myTasks,
    ChangeStateModal,
    ChangeContentModal,
    ChangeTitleModal,
    fetchTasksById,
    selectedProject,
  } = useBoundStore((state) => state, shallow);

  //   const [pendingTasks, setPendingTasks] = useState([]);
  //   const [completedTasks, setCompletedTasks] = useState([]);
  //   const [workingTasks, setWorkingTasks] = useState([]);

  //   useEffect(() => {
  //     if (Array.isArray(myTasks)) {
  //       setPendingTasks(myTasks.filter((task) => task.state === 'Pending'));
  //       setCompletedTasks(myTasks.filter((task) => task.state === 'Completed'));
  //       setWorkingTasks(myTasks.filter((task) => task.state === 'In Progress'));
  //     }
  //   }, [myTasks]);

  const handleButton = (buttonName) => {
    setView(buttonName);
  };

  const handleAddTask = (title, description) => {
    ChangeTitleModal('Create Task');
    ChangeContentModal(
      <CreateTaskForm placeholderTaskName='task 1' projectId={params.id} />
    );
    ChangeStateModal(true);
  };

  return (
    <div>
      <TaskHeader
        title={
          selectedProject?.name
            ? `${selectedProject.name} Tasks`
            : 'No projects'
        }
        handleAddTask={handleAddTask}
        handleButton={handleButton}
      />
      <Outlet />
    </div>
  );
};
export default tasks;
