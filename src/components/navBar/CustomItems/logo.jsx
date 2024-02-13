import StopCircleIcon from "@mui/icons-material/StopCircle";
import { Typography } from "@mui/material";

export default function Logo() {
  return (
    <>
      <StopCircleIcon style={{ color: "#7662ea" }} />
      <Typography
        variant="h6"
        noWrap
        component="div"
        color="black"
        sx={{ marginLeft: 1, marginRight: 3 }}
      >
        Sunstone
      </Typography>
    </>
  );
}
