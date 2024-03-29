import { Box } from "@mui/material";

const BoxIcon = ({ children, bg }) => {
  return (
    <Box
      sx={{
        display: "grid",
        placeContent: "center",
        backgroundColor: `${bg}`,
        borderRadius: "30px",
        padding: "10px",
        color: "#FFF",
      }}
    >
      {children}
    </Box>
  );
};

export default BoxIcon;
