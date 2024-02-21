import StopCircle from "@mui/icons-material/StopCircle";

import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import * as React from "react";
import bgSignIn from "../assets/Img/jpg/bgSignIn.jpg";

import SignInForm from "@/components/forms/SignInForm";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    padding: "0px",
    height: "100vh",
    margin: 0,
    "& > .MuiGrid-item": {
      padding: 0,
      height: "100%",
    },
  },
}));

export default function SignIn() {
  const classes = useStyles();

  return (
    <Grid container spacing={3} className={classes.container}>
      {/* left */}
      <Grid
        item
        xs={0}
        md={6}
        sx={{
          backgroundImage: `url(${bgSignIn})`,
          backgroundSize: "cover",
          backgroundPosition: "center 0%",
          position: "relative",
          color: "#fff",
          display: { xs: "none", md: "flex" },
          justifyContent: "center",
          alignItems: "flex-start",
          flexDirection: "column",

          "&::after": {
            content: "''",
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            zIndex: 1,
          },
          "& > *": {
            position: "relative",
            zIndex: 5,
            marginLeft: "60px",
            padding: "30px 0",
          },
        }}
      >
        <Box
          sx={{
            height: "auto",
            flexGrow: 1,
            display: "flex",
            gap: 1,
            alignItems: "start",
          }}
        >
          <Box sx={{ display: "flex", marginTop: "1rem", gap: "1rem" }}>
            <IconButton
              sx={{
                backgroundColor: "background.default",
                p: 0,
              }}
              disableRipple
            >
              <StopCircle sx={{ fontSize: "30px", color: "icon.third" }} />
            </IconButton>
            <Typography variant="h6">Sunstone</Typography>
          </Box>
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
      </Grid>
      {/* right */}
      <Grid item xs={12} md={6} mx={"auto"}>
        <SignInForm />
      </Grid>
    </Grid>
  );
}
