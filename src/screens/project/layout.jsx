import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Layout() {
  const location = useLocation().pathname;
  //const projectName = location.split("/")[2];
  return (
    <Box
      sx={{
        padding: "36px 24px",
        m: 0,
        flexDirection: "column",
      }}
    >
      <Outlet />
    </Box>
  );
}

export default Layout;
