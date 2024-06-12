import MyTaskViewAccordion from "./MyTaskViewAccordion";

function MyTaskViewList({ title, tasks, state, view }) {
  return (
    <div>
      <MyTaskViewAccordion
        title={title}
        tasks={tasks}
        view={view}
        state={state}
      />
    </div>
  );
}
export default MyTaskViewList;
