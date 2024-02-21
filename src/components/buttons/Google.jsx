import { Button, IconButton } from "@mui/material";

import GoogleIcon from "@/assets/Img/webp/logoGoogle.webp";

const Google = () => {
  return (
    <Button
      variant="outlined"
      sx={{
        color: "icon.primary",
        borderColor: "icon.primary",
        width: "100%",
      }}
      startIcon={
        <IconButton size="small">
          <img src={GoogleIcon} alt="google icon" width="30px" />
        </IconButton>
      }
    >
      Sign with Google
    </Button>
  );
};
export default Google;
