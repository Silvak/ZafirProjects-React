import {
  useTheme,
  Box,
  IconButton,
  Button,
  Typography,
  Grid,
} from "@mui/material";
import OverviewHeader from "../components/Overview/OverviewHeader";
import MyWorkGlance from "../components/Overview/MyWork";
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
        <Grid container spacing={1}>
          <Grid item xs>
            <MyTaskOverview />
          </Grid>
          <Box
            item
            xs
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "fit-content",
              margin: 1,
            }}
          >
            <ProjectsOverview />
          </Box>
        </Grid>
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
