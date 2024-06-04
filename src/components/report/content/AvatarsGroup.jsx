import React, { useEffect, useState } from 'react';
import { Avatar } from '@mui/material';
import useFormatText from '@/hooks/useFormatText';

const AvatarsGroup = ({ projectSelected }) => {
  const [leader, setLeader] = useState('');

  useEffect(() => {
    if (projectSelected && projectSelected.leaders) {
      setLeader(projectSelected.leaders);
    }
    return () => {
      setLeader('');
    };
  }, [projectSelected]);

  return (
    <div
      style={{
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          width: '100%',
          gap: 4,
          marginRight: '2rem',
        }}
      >
        {/* <Avatar
          alt="Me"
          src={userAvatar}
          sx={{
            border: '1px solid #ffffff',
            marginRight: 1,
          }}
        /> */}
        <p style={{ marginRight: 4 }}>Owned by: </p>
        {leader ? (
          <Avatar
            sx={{
              borderRadius: '50%',
              bgcolor: `${leader?.colorbg}`,
              color: `${leader?.colorText}`,
            }}
          >
            {leader?.name.split(' ')[0][0].toUpperCase()}
            {leader.name.split(' ').length > 1
              ? leader?.name.split(' ')[1][0].toUpperCase()
              : ''}
          </Avatar>
        ) : (
          <strong>No Leader</strong>
        )}
        <p style={{ fontWeight: 'bold' }}>
          {projectSelected?.leaders &&
            useFormatText(projectSelected.leaders.name)}
        </p>
      </div>
    </div>
  );
};

export default AvatarsGroup;
