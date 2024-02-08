import { Link } from "react-router-dom";
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
  Stack,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import useSignUp from "@/hooks/useSignUp";

import GoogleIcon from "@/assets/Img/webp/logoGoogle.webp";
import FacebookIcon from "@/assets/Img/png/logoFacebook.png";

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
        height: "100%",
        maxWidth: 500,
        mx: "auto",
        py: 2,
        pr: { xs: "100px", sm: "0px" },
      }}
    >
      {/* title */}
      <Box>
        <Typography variant="h2" mb={1}>
          Sign Up
        </Typography>
        <Typography variant="body2" component="p" fontWeight={400}>
          Already have an account?{" "}
          <Link to="/sign-in" underline="none">
            Sign in here
          </Link>
        </Typography>
      </Box>
      {/* form */}
      <Box
        component="form"
        sx={{
          mt: 5,
          "& .MuiTextField-root": { m: 1, width: "100%" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        {/* layout inputs */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: "normal" }}>
              First Name
            </Typography>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="firstname"
              name="firstname"
              autoComplete="firstname"
              autoFocus
              size="small"
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: "normal" }}>
              Last Name
            </Typography>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="lastname"
              name="lastname"
              autoComplete="lastname"
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: "normal" }}>
              Email
            </Typography>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              name="email"
              autoComplete="email"
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: "normal" }}>
              Password
            </Typography>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="password"
              name="password"
              autoComplete="password"
              size="small"
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: "normal" }}>
              Confirm Password
            </Typography>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="confirmpassword"
              name="confirmpassword"
              autoComplete="confirmpassword"
              size="small"
              type={showConfirmPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
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
        <Box sx={{ display: "flex", gap: 2, alignItems: "center", mt: 4 }}>
          <Checkbox
            aria-label="accept"
            disableRipple
            sx={{
              color: "text.primary",
            }}
          />
          <Typography variant="body2" component="p" fontWeight={"normal"}>
            By clicking Create an account, I agree that i have read and accepted
            the{" "}
            <MuiLink underline="none" href="#">
              Terms of Use
            </MuiLink>{" "}
            and{" "}
            <MuiLink underline="none" href="#">
              Privacy Policy.
            </MuiLink>
          </Typography>
        </Box>
        {/* form btn */}
        <Button variant="contained" size="large" sx={{ width: "100%", mt: 4 }}>
          Create an account
        </Button>
        {/* form or */}
        <Box
          sx={{
            display: "flex",
            mt: 4,
            gap: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Divider sx={{ width: "200px", borderColor: "text.primary" }} />
          <Typography variant="body2" fontWeight="normal">
            Or
          </Typography>
          <Divider sx={{ width: "200px", borderColor: "text.primary" }} />
        </Box>
        {/* form social btns */}
        <Box>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={2}
            sx={{ mt: 4 }}
          >
            <Button
              variant="outlined"
              sx={{ color: "icon.primary", borderColor: "icon.primary" }}
              startIcon={
                <IconButton size="small">
                  <img src={GoogleIcon} alt="google icon" width="30px" />
                </IconButton>
              }
            >
              Sign with Google
            </Button>
            <Button
              variant="outlined"
              sx={{ color: "icon.primary", borderColor: "icon.primary" }}
              startIcon={
                <IconButton size="small">
                  <img src={FacebookIcon} alt="google icon" width="30px" />
                </IconButton>
              }
            >
              Sign with Facebook
            </Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUpForm;
