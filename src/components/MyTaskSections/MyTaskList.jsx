import MyTaskAccordion from "./MyTaskAccordion";

function MyTaskList({ title, tasks, state, view }) {
  return (
    <div>
      <MyTaskAccordion title={title} tasks={tasks} view={view} state={state} />
    </div>
  );
}
export default MyTaskList;
