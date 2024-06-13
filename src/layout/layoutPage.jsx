import Box from "@mui/material/Box";
//import { useLocation } from "react-router-dom";

function LayoutPage({ head, children, title, subtitle }) {
  //const location = useLocation().pathname;
  //const projectName = location.split("/")[2];

  return (
    <Box
      sx={{
        padding: "36px 24px",
        m: 0,
        //background: "#7662EA20",
        flexDirection: "column",
      }}
    >
      {/* title & actions */}
      <Box sx={{ mb: "56px" }}>{head}</Box>

      {/* Content */}
      <Box>{children}</Box>
    </Box>
  );
}

export default LayoutPage;
