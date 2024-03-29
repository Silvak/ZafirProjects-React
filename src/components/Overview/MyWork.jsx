import { useState } from "react";
import { myWorkData } from "../../mockData/myWorkData";
import {
  Typography,
  Grid,
  Box,
  ThemeProvider,
  createTheme,
  Select,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import FilterSelect from "@/components/Selects/FilterSelect";

const filtersData = [
  { id: 1, label: "This week", value: "week" },
  { id: 2, label: "This month", value: "month" },
  { id: 3, label: "Today", value: "today" },
];

function MyWorkGlance() {
  const theme = createTheme();
  const { pending, progress, issues, review, completed } = myWorkData;
  const [selectedValue, setSelectedValue] = useState("This Month");
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: "#ffffff",
          height: "auto", // Cambiado a "auto" para que el contenedor se ajuste al contenido
          borderRadius: "20px",
          padding: "20px", // Agregado espacio interno para separar los elementos
          overflowX: "auto",
        }}
      >
        <Grid
          item
          sx={{
            display: isMobile ? "inline-table" : "flex",
            padding: "20px 10px",
            alignItems: "center",
            justifyContent: "space-between",
            overflowX: "hidden",
          }}
        >
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: "500",
              fontFamily: "Poppins",
              color: "black",
            }}
          >
            My Work Glance
          </Typography>
          <Grid item>
            <FilterSelect data={filtersData} padding="10px" />
          </Grid>
        </Grid>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", // Distribuye automáticamente los elementos y los hace responsivos
            gap: "20px", // Agregado espacio entre los elementos
          }}
        >
          <InfoCard data={progress} />
          <InfoCard data={pending} />
          <InfoCard data={issues} />
          <InfoCard data={review} />
          <InfoCard data={completed} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

// Componente separado para los elementos de información
function InfoCard({ data }) {
  const [selectedValue, setSelectedValue] = useState("This Week");
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };
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
      }}
    >
      <div style={{ display: "flex", marginLeft: "16px" }}>
        <div
          style={{
            borderRadius: "4px",
            width: "8px",
            height: "33px",
            backgroundColor: data.color,
            marginBottom: "5px", // Agregado espacio inferior para separar del siguiente elemento
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

export default MyWorkGlance;
