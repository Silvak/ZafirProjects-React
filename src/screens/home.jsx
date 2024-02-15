import { useTheme, Box, IconButton, Button, Typography } from "@mui/material";
import OverviewHeader from "../components/Overview/overviewHeader";
import MyWorkGlance from "../components/Overview/myWork";
import MyTaskOverview from "../components/Overview/MyTaskOverview";
import ProjectsOverview from "../components/Overview/ProjectsOverview";

function MyApp() {
  const theme = useTheme();

  const handleOpenAlert = () => {
    ChangeStateAlert(true);
  };
  const handleOpenModal = () => {
    ChangeStateModal(true);
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          // width: "100%",
          // alignItems: "center",
          // justifyContent: "center",
          bgcolor: "background.default",
          color: "text.primary",
          borderRadius: 1,
          // p: 3,
          gap: "20px",
          m: "24px",
        }}
      >
        <OverviewHeader />
        <MyWorkGlance />
        <main style={{
          display: "flex",
          justifyContent: "space-between",
        }}>
          <MyTaskOverview />
          <ProjectsOverview />
        </main>
      </Box>
    </Box>
  );
}

export default function Home() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <MyApp />
    </Box>
  );
}
