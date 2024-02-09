import * as React from "react";
import {
  Button,
  CssBaseline,
  TextField,
  Link,
  Box,
  Grid,
  Typography,
  IconButton,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme } from "@mui/material";
import bgSignIn from "../assets/Img/jpg/bgSignIn.jpg";
import { useMediaQuery } from "@mui/material";
import GoogleIcon from "../assets/Img/webp/logoGoogle.webp";
import FacebookIcon from "../assets/Img/png/logoFacebook.png";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function SignIn() {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:600px)");

  const [showPassword, setShowPassword] = React.useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        spacing={3}
        sx={{
          height: "100vh",
        }}
      >
        <CssBaseline />
        {!isMobile && (
          <>
            <Grid
              item
              xs={false}
              sm={4}
              md={6}
              sx={{
                backgroundImage: `url(${bgSignIn})`,
                backgroundSize: "cover",
                marginRight: isMobile ? 0 : 8,
                filter: "brightness(0.7)",
              }}
            />
            <div
              style={{
                display: "flex",
                position: "absolute",
                color: "white",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
                marginLeft: "5%",
              }}
            >
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6" style={{ marginTop: "5rem" }}>
                  Sunstone
                </Typography>
              </Box>
              <Box sx={{ maxWidth: "600px" }}>
                <Typography
                  variant="body1"
                  sx={{ textBalance: "balance", marginBottom: "5rem" }}
                >
                  The ultimate multipurpose dashboard UI Kit for kickstart any
                  project.
                </Typography>
              </Box>
            </div>
          </>
        )}
        <Grid
          item
          xs={false}
          sm={4}
          md={4}
          sx={{ marginTop: isMobile ? 6 : 12 }}
        >
          <Typography variant="h2">Sign in</Typography>
          <Grid
            item
            sx={{ fontSize: "1rem", fontWeight: "normal", marginTop: 2 }}
          >
            Don't have an account yet?{" "}
            <Link href="/sign-up" underline="none">
              {"Sign Up Here"}
            </Link>
          </Grid>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 4 }}
          >
            <Grid
              item
              sx={{
                fontSize: "1rem",
                fontWeight: "normal",
                marginTop: 3,
                color: "gray",
              }}
            >
              {" "}
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
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, borderRadius: 2 }}
            >
              Sign In
            </Button>
          </Box>
          <Box
            sx={{ mt: 4, display: "flex", alignItems: "center", color: "gray" }}
          >
            <hr style={{ flexGrow: 1, borderColor: "lightgray" }} />
            <Box sx={{ mx: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: "normal" }}>
                Or
              </Typography>
            </Box>
            <hr style={{ flexGrow: 1, borderColor: "lightgray" }} />
          </Box>
          <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="outlined"
              fullWidth
              sx={{
                borderRadius: 2,
                mr: 1,
                color: "black",
                height: "40px",
                p: 2,
              }}
              startIcon={
                <img
                  src={GoogleIcon}
                  alt="Google Logo"
                  style={{ width: 24, height: "auto" }}
                />
              }
            >
              Sign in with Google
            </Button>
            <Button
              variant="outlined"
              fullWidth
              sx={{
                borderRadius: 2,
                ml: 1,
                color: "black",
                height: "40px",
                p: 2,
              }}
              startIcon={
                <img
                  src={FacebookIcon}
                  alt="Facebook Logo"
                  style={{ width: 24, height: "auto" }}
                />
              }
            >
              Sign in with Facebook
            </Button>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
