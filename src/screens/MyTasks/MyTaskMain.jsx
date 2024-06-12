import TaskHeader from "@/components/taskAccordion/taskHeader";
import { Outlet } from "react-router-dom";

const MyTaskMain = () => {
  return (
    <div>
      <TaskHeader title="My Tasks" />
      <Outlet />
    </div>
  );
};
export default MyTaskMain;
