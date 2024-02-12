import { useTheme, Box, IconButton, Button, Typography } from "@mui/material";


function MyApp() {
  const theme = useTheme();

  const handleOpenAlert = () => {
    ChangeStateAlert(true);
  };
  const handleOpenModal = () => {
    ChangeStateModal(true);
  };



  return (
    <Box
    
    >
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        // width: "100%",
        // alignItems: "center",
        // justifyContent: "center",
        bgcolor: "background.default",
        color: "text.primary",
        borderRadius: 1,
        // p: 3,
        gap: "20px",
        m: "24px"
      }}>
        <Typography variant="h3" sx={{color: "#1D1F24"}}>
            Hi, ALexander
        </Typography>
      </Box>
    </Box>
  );
}

export default function Home() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <MyApp />
    </Box>
  );
}
