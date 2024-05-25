import { List } from '@mui/material';

const CustomList = ({ children, showme }) => {
  return (
    <List
      sx={{
        background: '#FFF',
        padding: ' 0',
        color: '#000',
        position: 'absolute',
        bottom: '0',
        top: '64px',
        zIndex: '9999',
        width: '100%',
        height: 'fit-content',
        borderBottomLeftRadius: '6px',
        borderBottomRightRadius: '6px',
        outline: 'thin solid #0002',
        display: showme ? 'block' : 'none',
        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
        '& > *:not(:last-child)': {
          borderBottom: '1px solid #DDD',
        },
      }}
    >
      {children}
    </List>
  );
};
export default CustomList;
