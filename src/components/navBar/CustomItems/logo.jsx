import StopCircleIcon from "@mui/icons-material/StopCircle";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

export default function Logo() {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <StopCircleIcon style={{ color: "#7662ea" }} />
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{ color: "#1D1F24", fontWeight: 600 }}
      >
        Zafir
      </Typography>
    </Stack>
  );
}
