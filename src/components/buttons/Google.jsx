import { Button, IconButton } from "@mui/material";

import GoogleIcon from "@/assets/Img/webp/logoGoogle.webp";

const Google = () => {
  return (
    <Button
      variant="outlined"
      sx={{
        color: "icon.primary",
        borderColor: "icon.primary",
        padding: "6px 12px",
        width: "100%",
        height: "44px",
        borderRadius: "8px",
      }}
      startIcon={
        <IconButton size="small">
          <img src={GoogleIcon} alt="google icon" width="28px" />
        </IconButton>
      }
    >
      Sign with Google
    </Button>
  );
};
export default Google;
