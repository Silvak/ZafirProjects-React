import CustomList from '@/components/CustomList/CustomList';
import {
  Box,
  Button,
  Grid,
  ListItem,
  Paper,
  TextField,
  ThemeProvider,
  Typography,
} from '@mui/material';
import { useEditProject } from '../../hooks/useEditProject';
import CustomAvatar from '@/components/CustomAvatar/CustomAvatar';

function EditProjectForm({ project }) {
  const {
    theme,
    isMobile,
    isLoading,
    member,
    setMember,
    members,
    filteredLeaders,
    filteredMembers,
    formData,
    handleSuggestionChange,
    handleSubmit,
    handleChange,
    handleSuggestionClick,
    handleRemoveMember,
    handleClose,
  } = useEditProject(project);

  return (
    <ThemeProvider theme={theme}>
      {/* row - colum */}
      <Paper
        elevation={1}
        component='form'
        onSubmit={handleSubmit}
        sx={{
          maxWidth: isMobile ? '90vw' : 'fit-content',
          padding: '39px',
          maxHeight: '90vh',
          height: isMobile ? '90vh' : '',
          borderTopLeftRadius: '0px',
          borderTopRightRadius: '0px',
          overflowY: 'auto',
          borderBottomLeftRadius: '16px',
          borderBottomRightRadius: '16px',
        }}
      >
        <Grid
          item
          sx={{
            marginBottom: '20px',
          }}
        >
          <Typography fontFamily={'Poppins'} color={'#6B6E75'}>
            Enter a project name
          </Typography>
          <TextField
            size='small'
            value={formData.name}
            placeholder='Project name...'
            name='name'
            onChange={handleChange}
            sx={{
              width: '100%',
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
              size='small'
              name='start'
              type='date'
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
              size='small'
              name='end'
              type='date'
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
            size='small'
            name='description'
            onChange={handleChange}
            value={formData.description}
            placeholder='...'
            sx={{
              width: '100%',
            }}
          />
        </Grid>

        {/* leader */}
        <Box sx={{ position: 'relative' }}>
          <Grid
            item
            sx={{
              marginBottom: '20px',
            }}
          >
            <Typography fontFamily={'Poppins'} color={'#6B6E75'}>
              Leader
            </Typography>
            <TextField
              size='small'
              name='leaders'
              value={formData.leaders.name}
              onChange={(e) => {
                handleChange(e);
                handleSuggestionChange({
                  inputValue: e.target.value,
                  type: 'leader',
                });
              }}
              sx={{
                width: '100%',
              }}
            />
          </Grid>
          <CustomList showme={filteredLeaders.length > 0}>
            {filteredLeaders.map((user) => (
              <ListItem
                key={user._id}
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    background: '#F6F7FA',
                  },
                }}
                onClick={() => {
                  handleSuggestionClick(user, 'leader');
                }}
              >
                {user.name}
              </ListItem>
            ))}
          </CustomList>
        </Box>

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
              size='small'
              name='members_id'
              value={member}
              onChange={(e) => {
                setMember(e.target.value);
                handleSuggestionChange({
                  inputValue: e.target.value,
                  type: 'member',
                });
              }}
              placeholder='Search a member'
              sx={{
                width: '100%',
              }}
            />
          </Grid>
          <CustomList showme={filteredMembers.length > 0}>
            {filteredMembers.map((user) => (
              <ListItem
                key={user._id}
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    background: '#F6F7FA',
                  },
                }}
                onClick={() => {
                  handleSuggestionClick(user, 'member');
                }}
              >
                {user.name}
              </ListItem>
            ))}
          </CustomList>
        </Box>
        {/* avatars */}
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
            {members.map((member) => (
              <CustomAvatar
                title={`Remove ${member._id.name}`}
                key={member._id._id}
                letter={member._id.name.charAt(0)}
                onClick={() => {
                  handleRemoveMember(member);
                }}
              />
            ))}
          </Box>
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
            title='Cancel'
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
            title='Save'
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
            {isLoading ? 'Updating...' : 'Save'}
          </Button>
        </Grid>
      </Paper>
    </ThemeProvider>
  );
}

export default EditProjectForm;
