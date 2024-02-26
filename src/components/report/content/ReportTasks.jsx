import { reportData } from "../../../mockData/myWorkData";
import {
  Typography,
  Grid,
  Box,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from "@mui/material";

function ReportTasks() {
  const theme = createTheme();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const { incompleted, overdue, total, completed } = reportData;

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: "#ffffff",
          height: "auto",
          borderRadius: "20px",
          padding: "20px",
          overflowX: "auto",
        }}
      >
        <Grid
          item
          sx={{
            display: isMobile ? "inline-table" : "flex",
            alignItems: "center",
            justifyContent: "space-between",
            overflowX: "hidden",
          }}
        >
        </Grid>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          <InfoCard data={completed} />
          <InfoCard data={incompleted} />
          <InfoCard data={overdue} />
          <InfoCard data={total} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

function InfoCard({ data }) {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <Grid
      item
      sx={{
        border: "1px solid #E0E3E8",
        borderRadius: "12px",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        height: "91px",
        width: "100%",
        maxWidth: isMobile ? "200px" : "auto", 

      }}
    >
      <div style={{ display: "flex", marginLeft: "16px" }}>
        <div
          style={{
            borderRadius: "4px",
            width: "8px",
            height: "33px",
            backgroundColor: data.color,
            marginBottom: "5px",
          }}
        />
        <Typography
          variant="h5"
          sx={{
            marginLeft: 1.5,
            marginBottom: "5px",
            fontWeight: "bold",
            color: "black",
          }}
        >
          {data.total}
        </Typography>
      </div>
      <Typography sx={{ marginLeft: "38px" }}>{data.title}</Typography>
    </Grid>
  );
}


export default ReportTasks;
