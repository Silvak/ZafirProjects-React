import { Link } from 'react-router-dom';
import {
  Box,
  Grid,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Checkbox,
  Button,
  Link as MuiLink,
  Divider,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import useSignUp from '@/hooks/useSignUp';
import SocialBtns from '@/components/buttons/SocialBtns';

const SignUpForm = () => {
  const {
    showPassword,
    showConfirmPassword,
    handleClickShowPassword,
    handleClickShowConfirmPassword,
    handleMouseDownPassword,
    handleSubmit,
  } = useSignUp();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        maxWidth: 500,
        mx: 'auto',
        padding: '30px 0',
      }}
    >
      {/* title */}
      <Box>
        <Typography variant='h2' mb={1}>
          Sign Up
        </Typography>
        <Typography variant='body2' component='p' fontWeight={400}>
          Already have an account?{' '}
          <Link to='/sign-in' underline='none'>
            Sign in here
          </Link>
        </Typography>
      </Box>
      {/* form */}
      <Box
        component='form'
        noValidate
        autoComplete='off'
        onSubmit={handleSubmit}
        sx={{ overflow: 'hidden', mt: 4 }}
      >
        {/* layout inputs */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant='body2' sx={{ mb: 1, fontWeight: 'normal' }}>
              First Name
            </Typography>
            <TextField
              variant='outlined'
              required
              fullWidth
              id='firstname'
              name='firstname'
              autoComplete='firstname'
              autoFocus
              size='small'
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant='body2' sx={{ mb: 1, fontWeight: 'normal' }}>
              Last Name
            </Typography>
            <TextField
              variant='outlined'
              required
              fullWidth
              id='lastname'
              name='lastname'
              autoComplete='lastname'
              size='small'
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant='body2' sx={{ mb: 1, fontWeight: 'normal' }}>
              Email
            </Typography>
            <TextField
              variant='outlined'
              required
              fullWidth
              id='email'
              name='email'
              autoComplete='email'
              size='small'
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant='body2' sx={{ mb: 1, fontWeight: 'normal' }}>
              Password
            </Typography>
            <TextField
              variant='outlined'
              required
              fullWidth
              id='password'
              name='password'
              autoComplete='password'
              size='small'
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant='body2' sx={{ mb: 1, fontWeight: 'normal' }}>
              Confirm Password
            </Typography>
            <TextField
              variant='outlined'
              required
              fullWidth
              id='confirmpassword'
              name='confirmpassword'
              autoComplete='confirmpassword'
              size='small'
              type={showConfirmPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
        {/* form terms */}
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mt: 4 }}>
          <Checkbox
            aria-label='accept'
            disableRipple
            name='terms'
            sx={{
              color: 'text.primary',
            }}
          />
          <Typography variant='body2' component='p' fontWeight={'normal'}>
            By clicking Create an account, I agree that i have read and accepted
            the{' '}
            <MuiLink underline='none' href='#'>
              Terms of Use
            </MuiLink>{' '}
            and{' '}
            <MuiLink underline='none' href='#'>
              Privacy Policy.
            </MuiLink>
          </Typography>
        </Box>
        {/* form btn */}
        <Button
          variant='contained'
          size='large'
          sx={{ width: '100%', mt: 4 }}
          type='submit'
        >
          Create an account
        </Button>
        {/* form or */}
        {/* <Box
          sx={{
            width: "100%",
            height: "50px",
            display: "flex",
            mt: 4,
            gap: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Divider sx={{ flex: 1, borderColor: "text.primary" }} />
          <Typography variant="body2" fontWeight="normal">
            Or
          </Typography>
          <Divider sx={{ flex: 1, borderColor: "text.primary" }} />
        </Box> */}
        {/* form social btns */}
        {/* <SocialBtns /> */}
      </Box>
    </Box>
  );
};

export default SignUpForm;
