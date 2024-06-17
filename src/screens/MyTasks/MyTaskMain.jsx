import TaskHeader from '@/components/taskAccordion/taskHeader';
import { Outlet } from 'react-router-dom';
import { useBoundStore } from '../../stores';
import { shallow } from 'zustand/shallow';

const MyTaskMain = () => {
  const { selectedProject } = useBoundStore((state) => state, shallow);
  return (
    <div>
      <TaskHeader
        title={
          selectedProject.name
            ? `My Tasks from ${selectedProject.name}`
            : 'My Tasks'
        }
      />
      <Outlet />
    </div>
  );
};
export default MyTaskMain;
