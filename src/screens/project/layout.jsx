import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Layout() {
  const location = useLocation().pathname;
  //const projectName = location.split("/")[2];
  return (
    <Box>
      {/* title & actions */}

      {/* Content */}
      <Box sx={{ paddingTop: "40px" }}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default Layout;
