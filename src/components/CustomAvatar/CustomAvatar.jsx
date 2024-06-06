import { useCallback, useMemo } from 'react';
import Tooltip from '@mui/material/Tooltip';

// const size = '45px';

const CustomAvatar = ({
  member,
  bgColor,
  textColor,
  disabled,
  fontSize = '1rem',
  size = '45px',
  deleteMode = true,
  ...props
}) => {
  const handleMouseOver = useCallback((e) => {
    e.currentTarget.style.opacity = '0.7';
  }, []);

  const handleMouseOut = useCallback((e) => {
    e.currentTarget.style.opacity = '1';
  }, []);

  return (
    <Tooltip
      title={deleteMode && member ? `Delete ${member.name}` : `${member.name}`}
    >
      <div
        style={{
          transition: 'opacity 0.3s ease-in-out',
          width: `${size}`,
          height: `${size}`,
          borderRadius: '50%',
          // display: 'grid',
          // placeContent: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor:
            member && member.colorbg ? `${member.colorbg}` : 'gray',
        }}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        {...props}
      >
        <p
          style={{
            fontSize,
            fontWeight: 'bold',
            textTransform: 'uppercase',
            color: 'white',
          }}
        >
          {member ? member.name?.split(' ')[0][0].toUpperCase() : '?'}
          {member && member.name?.split(' ').length > 1
            ? member.name?.split(' ')[1][0].toUpperCase()
            : ''}
        </p>
      </div>
    </Tooltip>
  );
};
export default CustomAvatar;
