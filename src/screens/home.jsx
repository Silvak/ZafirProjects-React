import { useTheme, Box, Grid } from "@mui/material";
import OverviewHeader from "@/components/Overview/OverviewHeader";
import MyWorkGlance from "@/components/Overview/MyWork";
import MyTaskOverview from "@/components/Overview/MyTaskOverview";
import ProjectsOverview from "@/components/Overview/ProjectsOverview";
import LayoutPage from "@/layout/layoutPage";

function MyApp() {
  return (
    <LayoutPage head={<OverviewHeader />}>
      <Grid container spacing={"24px"}>
        <Grid item xs={12}>
          <MyWorkGlance />
        </Grid>
        <Grid item xs={12} lg={8}>
          <MyTaskOverview />
        </Grid>
        <Grid item xs={12} lg={4}>
          <ProjectsOverview />
        </Grid>
      </Grid>
    </LayoutPage>
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
