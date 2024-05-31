import { useCallback, useMemo } from 'react';
import Tooltip from '@mui/material/Tooltip';

const size = '45px';

const bgColors = {
  0: '#e0f7fa', // Azul Cielo
  1: '#c5dbe2', // Azul Cerúleo Claro
  2: '#8aadcf', // Azul Turquesa Claro
  3: '#5680ae', // Azul Cerúleo
  4: '#c6a67e', // Azul Marino
  5: '#f5f5f5', // Gris Muy Claro (para contraste)
  6: '#d7e2ee', // Azul Pálido (para resaltar)
};

const getRandomColor = () => {
  const keys = Object.keys(bgColors);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return bgColors[randomKey];
};

const CustomAvatar = ({ name, disabled, ...props }) => {
  const backgroundColor = useMemo(() => getRandomColor(), []);

  const handleMouseOver = useCallback((e) => {
    e.currentTarget.style.opacity = '0.7';
  }, []);

  const handleMouseOut = useCallback((e) => {
    e.currentTarget.style.opacity = '1';
  }, []);

  return (
    <Tooltip title={`Delete ${name}`}>
      <div
        style={{
          transition: 'opacity 0.3s ease-in-out',
          width: `${size}`,
          height: `${size}`,
          borderRadius: '50%',
          display: 'grid',
          placeContent: 'center',
          backgroundColor: `${backgroundColor}`,
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
          }}
        >
          {name.charAt(0)}
        </span>
      </div>
    </Tooltip>
  );
};
export default CustomAvatar;
