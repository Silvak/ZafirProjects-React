import useSignIn from "@/hooks/useSignIn";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import SocialBtns from "@/components/buttons/SocialBtns";
import { Link } from "react-router-dom";

const SignInForm = () => {
  const { showPassword, handlePasswordVisibility, handleSubmit } = useSignIn();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center !important",
        height: "100% !important",
        maxWidth: 500,
        mx: "auto",
        px: 4,
      }}
    >
      {/* title */}
      <Box>
        <Typography variant="h2" mb={1}>
          Sign In
        </Typography>
        <Typography variant="body2" component="p" fontWeight={400}>
          Don't have an account yet?{" "}
          <Link to="/sign-up" underline="none">
            Sign Up Here
          </Link>
        </Typography>
      </Box>

      {/* form */}
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{
          overflow: "hidden",
          height: "auto",
        }}
      >
        {/* layout inputs */}
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sx={{
              fontSize: "1rem",
              fontWeight: "normal",
              marginTop: 3,
              color: "gray",
            }}
          >
            Email
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              name="email"
              autoComplete="email"
              autoFocus
              size="small"
              sx={{ marginTop: "8px", fontWeight: "normal" }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              fontSize: "1rem",
              fontWeight: "normal",
              marginTop: 3,
              color: "gray",
            }}
          >
            {" "}
            Password
            <TextField
              variant="outlined"
              required
              fullWidth
              id="password"
              name="password"
              autoComplete="password"
              autoFocus
              size="small"
              type={showPassword ? "text" : "password"}
              sx={{ marginTop: "8px", fontWeight: "normal" }}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handlePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                ),
              }}
            />
          </Grid>
          <Grid
            item
            sx={{ fontSize: "1rem", fontWeight: "normal", marginTop: 2 }}
          >
            <Link href="/#" underline="none">
              {"Forgot password?"}
            </Link>
          </Grid>
        </Grid>
        {/* form btn */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ borderRadius: 2 }}
        >
          Sign In
        </Button>
        {/* form or */}
        <Box
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
          <Divider sx={{ flex: 1, borderColor: "lightgray" }} />
          <Typography variant="body2" fontWeight="normal">
            Or
          </Typography>
          <Divider sx={{ flex: 1, borderColor: "lightgray" }} />
        </Box>
        {/* form social btns */}
        <SocialBtns />
      </Box>
    </Box>
  );
};

export default SignInForm;
