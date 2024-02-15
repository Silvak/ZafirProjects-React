import { userData } from "../../mockData/userData";
import {
  Typography,
  Grid,
  Button,
  Box,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function OverviewHeader() {
  const theme = createTheme();
  const { name } = userData;

  //Date
  const currentDate = new Date();

  // Obtiene el día de la semana
  const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const dayOfWeek = days[currentDate.getDay()];

  // Obtiene el día del mes
  const dayOfMonth = currentDate.getDate();

  // Obtiene el mes
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const month = months[currentDate.getMonth()];

  // Obtiene el año
  const year = currentDate.getFullYear();

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "19px"
        }}
      >
        <Grid
          item
          sx={{
            display: "flex",
            flexDirection: "column",
            color: "text.primary",
            width: "300px",
          }}
        >
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: 600,
              fontFamily: "Poppins",
              lineHeight: "36px",
              width: "200px",
            }}
          >
            Hi, {name}
          </Typography>
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: 400,
              lineHeight: "18px",
              width: "200px",
              marginTop: "6px"
            }}
          >
            {dayOfWeek}, {month} {dayOfMonth}
          </Typography>
        </Grid>
        <Grid sx={{ width: "100px", marginRight: "30px" }}>
          <Button
            sx={{
              textTransform: "none",
              color: "white",
              backgroundColor: "#7662EA",
              height: "40px",
              width: "133px",
              borderRadius: "12px",
              fontSize: "13px",
              fontWeight: 500,
              fontFamily: "Poppins",
              '&:hover': {backgroundColor: "black"}
            }}
          >
            <AddIcon sx={{ marginRight: "10px" }} />
            Create new
          </Button>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default OverviewHeader;
