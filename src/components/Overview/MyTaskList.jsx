import MyTaskItems from "./MyTaskItems";

function MyTaskList({ tasks, handleAddTask }) {
  return (
    <div style={{margin: "20px"}}>
      <MyTaskItems
        tasks={tasks}
        handleAddTask={handleAddTask}
      />
    </div>
  );
}

export default MyTaskList;
