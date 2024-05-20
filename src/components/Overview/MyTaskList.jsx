import MyTaskItems from './MyTaskItems';

function MyTaskList({ tasks, handleAddTask }) {
  console.log(tasks);
  return (
    <div style={{ margin: '20px' }}>
      {tasks.length > 0 ? (
        <MyTaskItems tasks={tasks} handleAddTask={handleAddTask} />
      ) : (
        <p
          style={{
            display: 'flex',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: '1.2rem',
          }}
        >
          No tasks to show
        </p>
      )}
    </div>
  );
}

export default MyTaskList;
