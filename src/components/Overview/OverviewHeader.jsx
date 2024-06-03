import { userData } from '../../mockData/userData';
import {
  Typography,
  Grid,
  Button,
  Box,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useBoundStore } from '../../stores';
import { shallow } from 'zustand/shallow';
import useFormatText from '@/hooks/useFormatText';
import CreateProjectForm from '../forms/CreateProjectForm';

function OverviewHeader() {
  const theme = createTheme();
  const { name } = userData;
  const { User, ChangeStateModal, ChangeContentModal, ChangeTitleModal } =
    useBoundStore((state) => state, shallow);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const handleCreate = () => {
    ChangeTitleModal('Add Project');
    ChangeContentModal(<CreateProjectForm />);
    ChangeStateModal(true);
  };
  //Date
  const currentDate = new Date();

  // Obtiene el día de la semana
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const dayOfWeek = days[currentDate.getDay()];

  // Obtiene el día del mes
  const dayOfMonth = currentDate.getDate();

  // Obtiene el mes
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const month = months[currentDate.getMonth()];

  // Obtiene el año
  const year = currentDate.getFullYear();

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: isMobile ? 'inline-table' : 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '19px',
        }}
      >
        <Grid
          item
          sx={{
            display: 'flex',
            flexDirection: 'column',
            color: 'text.primary',
            width: '300px',
          }}
        >
          <Typography
            sx={{
              fontSize: '24px',
              fontWeight: 600,
              fontFamily: 'Poppins',
              lineHeight: '36px',
              width: '200px',
              minWidth: 'max-content',
            }}
          >
            Hi, {useFormatText(User?.name)}
          </Typography>
          <Typography
            sx={{
              fontSize: '12px',
              fontWeight: 400,
              lineHeight: '18px',
              width: '200px',
              marginTop: '6px',
              color: '#6B6E75',
            }}
          >
            {dayOfWeek}, {month} {dayOfMonth}
          </Typography>
        </Grid>
        {/* Create Project */}
        <Grid sx={{ width: '100px', marginRight: '30px' }}>
          <Button
            onClick={handleCreate}
            sx={{
              textTransform: 'none',
              color: 'white',
              backgroundColor: '#7662EA',
              height: '40px',
              width: '133px',
              borderRadius: '12px',
              fontSize: '13px',
              fontWeight: 500,
              fontFamily: 'Poppins',
              '&:hover': { backgroundColor: 'black' },
            }}
          >
            <AddIcon sx={{ marginRight: '10px' }} />
            Create new
          </Button>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default OverviewHeader;
