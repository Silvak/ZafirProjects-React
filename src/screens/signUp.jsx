import { Box, Grid, Icon, IconButton, Typography } from "@mui/material";
import StopCircle from "@mui/icons-material/StopCircle";

import bgImage from "@/assets/Img/jpg/bgSignUp.jpg";
import SignUpForm from "@/components/forms/SignUpForm";

const signUp = () => {
  return (
    <Grid
      container
      spacing={3}
      sx={{
        height: "100vh",
        padding: "0px",
      }}
    >
      {/* left */}
      <Grid
        item
        xs={0}
        md={6}
        sx={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center 0%",
          position: "relative",
          color: "text.secondary",
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          py: 2,
          "&::after": {
            content: "''",
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            zIndex: 1,
          },
          "& > *": {
            position: "relative",
            zIndex: 2,
            marginLeft: "60px",
          },
        }}
      >
        <Box sx={{ flexGrow: 1, display: "flex", gap: 1, alignItems: "start" }}>
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
        <Box sx={{ maxWidth: "600px" }}>
          <Typography variant="body1" sx={{ textBalance: "balance" }}>
            The ultimate multipurpose dashboard UI Kit for kickstart any
            project.
          </Typography>
        </Box>
      </Grid>
      {/* right */}
      <Grid item xs={12} md={6} mx={"auto"}>
        <SignUpForm />
      </Grid>
    </Grid>
  );
};

export default signUp;
