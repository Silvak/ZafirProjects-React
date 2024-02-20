import { Box, Typography } from "@mui/material";

export default function NotFoundPage() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: "2rem",
      }}
    >
      <Typography variant="body1" color="initial">
        Not Found Page
      </Typography>
    </Box>
  );
}
