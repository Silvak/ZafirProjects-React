import React from 'react';
import { Avatar, AvatarGroup, useMediaQuery } from '@mui/material';
import user1 from '../../../assets/Img/png/userImage.png';
import avatar from '@/assets/Img/png/defaultUser.png';

const AvatarsGroup = ({ projectSelected }) => {
  const userAvatar = avatar;
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
        <Avatar
          alt="Me"
          src={userAvatar}
          sx={{
            border: '1px solid #ffffff',
            marginRight: 1,
          }}
        />
        <p>Owned by</p>
        <p style={{ fontWeight: 'bold' }}>
          {projectSelected?.leaders ? projectSelected.leaders.name : 'Leader'}
        </p>
      </div>
    </div>
  );
};

export default AvatarsGroup;
