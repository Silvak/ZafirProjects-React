import { useCallback, useMemo } from 'react';
import Tooltip from '@mui/material/Tooltip';

const size = '45px';

const CustomAvatar = ({ member, bgColor, textColor, disabled, ...props }) => {
  const handleMouseOver = useCallback((e) => {
    e.currentTarget.style.opacity = '0.7';
  }, []);

  const handleMouseOut = useCallback((e) => {
    e.currentTarget.style.opacity = '1';
  }, []);

  return (
    <Tooltip title={`Delete ${member.name}`}>
      <div
        style={{
          transition: 'opacity 0.3s ease-in-out',
          width: `${size}`,
          height: `${size}`,
          borderRadius: '50%',
          display: 'grid',
          placeContent: 'center',
          backgroundColor: `${member.colorbg}`,
        }}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        {...props}
      >
        <span
          style={{
            fontSize: '1rem',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            textColor: `${member.colorText}`,
          }}
        >
          {member.name?.split(' ')[0][0].toUpperCase()}
          {member.name?.split(' ').length > 1
            ? member.name?.split(' ')[1][0].toUpperCase()
            : ''}
        </span>
      </div>
    </Tooltip>
  );
};
export default CustomAvatar;
