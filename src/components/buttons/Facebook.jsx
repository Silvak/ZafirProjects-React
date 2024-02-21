import { Button, IconButton } from "@mui/material";

import FacebookIcon from "@/assets/Img/png/logoFacebook.png";

const Facebook = () => {
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
          <img src={FacebookIcon} alt="google icon" width="30px" />
        </IconButton>
      }
    >
      Sign with Facebook
    </Button>
  );
};
export default Facebook;
