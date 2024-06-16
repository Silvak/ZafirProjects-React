import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Select,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
  useMediaQuery,
  IconButton,
} from '@mui/material';
import { useState } from 'react';
import { shallow } from 'zustand/shallow';
import useSuggestionUsers from '../../hooks/useSuggestionUsers';
import { useBoundStore } from '../../stores';
import getUniqueUsers from '../../utils/getUniqueUsers';
import SuggestionList from '../SuggestionList/SuggestionList';
import CustomAvatar from '../CustomAvatar/CustomAvatar';
import CloseIcon from '@mui/icons-material/Close';

const INITIAL_FORM_DATA = {
  subTaskName: '',
  description: '',
  start: '',
  end: '',
  state: '',
  priority: '',
};

const SubTaskForm = ({ taskId, closeModal, setFilterSubtask }) => {
  const theme = createTheme();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const {
    addSubtask,
    ChangeTitleAlert,
    ChangeStateAlert,
    ChangeTitleAlertError,
    ChangeStateAlertError,
  } = useBoundStore((state) => state, shallow);
  const { users } = useSuggestionUsers();

  const [isLoading, setIsLoading] = useState(false);
  //  filtro para mostrar en la lista
  const [filteredLeaders, setFilteredLeaders] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  //  nombre del miembro
  const [member, setMember] = useState('');
  // miembros a renderizar
  const [members, setMembers] = useState([]);
  const [formData, setformData] = useState(INITIAL_FORM_DATA);

  // '/project/:taskId'
  const today = new Date().toISOString().split('T')[0];

  const handleSuggestionChange = ({ inputValue }) => {
    if (inputValue === '') {
      setFilteredMembers([]);
    } else {
      const result = getUniqueUsers(users);
      const filter = result.filter((user) => {
        return user.name.toUpperCase().startsWith(inputValue.toUpperCase());
      });
      setFilteredMembers(filter);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = {
        ...formData,
        members_id: members,
      };

      // validamos que no se envie vacio
      if (Object.values(data).includes('')) {
        ChangeStateAlertError(true);
        ChangeTitleAlertError('All fields are required');
        return;
      } else {
        const newSubtasks = await addSubtask(data, taskId);
        setFilterSubtask(newSubtasks);

        // DESCOMENTAR ESTO SI QUEREMOS QUE TAMBIEN SE AGREGUEN LOS MIEMBROS AL PROYECTO
        // const promises = newSubtasks[0]?.members_id?.map((member) => {
        //   return axiosInstance.post(
        //     `projects/${selectedProject._id}/add-member`,
        //     {
        //       memberId: member._id,
        //       newRole: 'Member',
        //     }
        //   );
        // });
        // // Utilizamos promise.all porque es un array de miembros
        // await Promise.all(promises);
        closeModal();
        ChangeTitleAlert('Subtask created successfully');
        ChangeStateAlert(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const handleClose = () => {
    closeModal();
  };

  const handleSuggestionClick = (user, type) => {
    if (type === 'leader') {
      setformData({ ...formData, leaders: user });
      setFilteredLeaders([]);
    } else {
      const alreadyExist = members.find(
        (member) => member._id.toString() === user._id.toString()
      );
      if (alreadyExist === undefined) {
        setMembers((prev) => [...prev, user]);
        setFilteredMembers([]);
        setMember('');
      } else {
        return;
      }
    }
  };

  const handleRemoveMember = (memberToRemove) => {
    const updatedMembers = members.filter(
      (member) => member._id.toString() !== memberToRemove._id.toString()
    );
    setMembers(updatedMembers);
  };

  return (
    <ThemeProvider theme={theme}>
      {/* row - colum */}
      <Paper
        elevation={1}
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: isMobile ? '90vw' : 'fit-content',
          padding: '30px',
          paddingBlock: '24px',
          maxHeight: '90vh',
          height: isMobile ? '90vh' : '',
          borderTopLeftRadius: '0px',
          borderTopRightRadius: '0px',
          overflowY: 'auto',
          borderRadius: '16px',
        }}
      >
        <Grid item>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: '1.5rem',
                marginBottom: '2rem',
              }}
            >
              Create Subtask
            </Typography>
            <IconButton
              sx={{
                mb: '2rem',
                color: '#7661EA',
                mr: '-1rem',
              }}
              disableRipple
              title="Close"
              variant="text"
              onClick={closeModal}
            >
              <CloseIcon />
            </IconButton>
          </div>
          <Typography fontFamily={'Poppins'} color={'#6B6E75'}>
            Enter a SubTask name
          </Typography>
          <TextField
            size="small"
            value={formData.subTaskName}
            placeholder="SubTask name..."
            name="subTaskName"
            onChange={handleChange}
            sx={{
              width: '100%',
              mb: '1.2rem',
            }}
          />
        </Grid>
        {/* flex */}
        <div
          style={{
            display: 'flex',
            marginBottom: '20px',
          }}
        >
          <Grid
            item
            sx={{
              marginRight: '12px',
            }}
          >
            <Typography fontFamily={'Poppins'} color={'#6B6E75'}>
              Start date
            </Typography>
            <TextField
              size="small"
              name="start"
              type="date"
              InputProps={{ inputProps: { min: today } }}
              value={formData.start}
              onChange={handleChange}
              sx={{
                width: '100%',
              }}
            />
          </Grid>
          <Grid item>
            <Typography fontFamily={'Poppins'} color={'#6B6E75'}>
              End date
            </Typography>
            <TextField
              size="small"
              name="end"
              type="date"
              InputProps={{ inputProps: { min: formData.start || today } }}
              value={formData.end}
              onChange={handleChange}
              sx={{
                width: '100%',
              }}
            />
          </Grid>
        </div>

        <Grid
          item
          sx={{
            marginBottom: '20px',
          }}
        >
          <Typography fontFamily={'Poppins'} color={'#6B6E75'}>
            Add a description...
          </Typography>
          <TextField
            size="small"
            name="description"
            onChange={handleChange}
            value={formData.description}
            placeholder="..."
            sx={{
              width: '100%',
            }}
          />
        </Grid>

        {/* members */}
        <Box sx={{ position: 'relative' }}>
          <Grid
            item
            sx={{
              // width: "444px",
              marginBottom: '20px',
            }}
          >
            <Typography fontFamily={'Poppins'} color={'#6B6E75'}>
              Add members
            </Typography>
            <TextField
              size="small"
              name="members_id"
              value={member}
              onChange={(e) => {
                setMember(e.target.value);
                handleSuggestionChange({
                  inputValue: e.target.value,
                });
              }}
              placeholder="Search a member"
              sx={{
                width: '100%',
              }}
            />
          </Grid>
          <SuggestionList
            type="member"
            usersList={filteredMembers}
            onClick={handleSuggestionClick}
          />
        </Box>
        <Grid item xs={12}>
          <Box
            sx={{
              display: 'flex',
              gap: '8px',
              marginBottom: '20px',
              cursor: 'pointer',
              width: 'fit-content',
            }}
          >
            {members.map((member, key) => (
              <CustomAvatar
                key={key}
                bgColor={member.colorBg}
                textColor={member.colorText}
                member={member}
                onClick={() => {
                  handleRemoveMember(member);
                }}
              />
            ))}
          </Box>
        </Grid>
        {/* selects */}
        <Grid item xs={12}>
          <Typography sx={{ fontSize: '0.85rem' }}>Priority</Typography>
          <FormControl fullWidth>
            <Select
              required
              value={formData.priority}
              variant="outlined"
              size="small"
              sx={{ fontSize: '14px', marginBottom: 2 }}
              name="priority"
              onChange={handleChange}
              displayEmpty
              renderValue={(selected) => (selected ? selected : 'Type: All')}
            >
              <CustomMenuItem value="High">High</CustomMenuItem>
              <CustomMenuItem value="Medium">Medium</CustomMenuItem>
              <CustomMenuItem value="Low">Low</CustomMenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Typography sx={{ fontSize: '0.85rem' }}>State</Typography>
          <FormControl fullWidth>
            <Select
              required
              value={formData.state}
              variant="outlined"
              size="small"
              sx={{ fontSize: '14px' }}
              name="state"
              onChange={handleChange}
              displayEmpty
              renderValue={(selected) => (selected ? selected : 'Type: All')}
            >
              <CustomMenuItem value="In Progress">In Progress</CustomMenuItem>
              <CustomMenuItem value="Pending">Pending</CustomMenuItem>
              <CustomMenuItem disabled value="Completed">
                Completed
              </CustomMenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* buttons */}
        <Grid
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '40px',
          }}
        >
          <Button
            title="Cancel"
            onClick={handleClose}
            sx={{
              textTransform: 'none',
              color: 'black',
              backgroundColor: 'white',
              height: '40px',
              width: '75px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 500,
              fontFamily: 'Poppins',
              border: '1px solid #D3D5DA',
            }}
          >
            Cancel
          </Button>
          <Button
            title="Save"
            onClick={handleSubmit}
            sx={{
              textTransform: 'none',
              color: 'white',
              backgroundColor: '#7662EA',
              height: '40px',
              width: '84px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 500,
              fontFamily: 'Poppins',
              '&:hover': { backgroundColor: 'black' },
            }}
          >
            {isLoading ? 'Saving...' : 'Save'}
          </Button>
        </Grid>
      </Paper>
    </ThemeProvider>
  );
};

export default SubTaskForm;

const CustomMenuItem = ({ children, selected, ...props }) => {
  return (
    <MenuItem className="menu-item " sx={{ height: 'min-content' }} {...props}>
      {children}
    </MenuItem>
  );
};
