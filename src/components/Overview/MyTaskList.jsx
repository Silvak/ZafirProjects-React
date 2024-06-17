import MyTaskItems from './MyTaskItems';
import { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

function MyTaskList({ tasks, handleAddTask }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ padding: '0px  8px' }}>
      {tasks.length > 0 ? (
        <MyTaskItems tasks={tasks} handleAddTask={handleAddTask} />
      ) : isLoading ? (
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 12,
          }}
        >
          <CircularProgress
            style={{ color: '#C02327' }}
            sx={{ m: 2 }}
            size="32px"
          />
          <span>..searching Tasks</span>
        </div>
      ) : (
        <p
          style={{
            display: 'flex',
            justifyContent: 'center',
            fontWeight: 600,
            fontSize: '1.2rem',
            marginTop: '4rem',
          }}
        >
          No tasks to show
        </p>
      )}
    </div>
  );
}

export default MyTaskList;
