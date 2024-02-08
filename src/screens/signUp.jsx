import { Box, Grid, Typography } from "@mui/material";
import bgImage from "@/assets/Img/jpg/bgSignUp.jpg";
import SignUpForm from "@/components/forms/SignUpForm";

const signUp = () => {
  return (
    <Grid
      container
      spacing={3}
      sx={{
        height: "100vh",
      }}
    >
      {/* left */}
      <Grid
        item
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
        <Box sx={{ flexGrow: 1 }}>
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
      <Grid item xs={false} md={6}>
        <SignUpForm />
      </Grid>
    </Grid>
  );
};

export default signUp;
