
import { useState } from "react";
import { myWorkData } from "../../mockData/myWorkData";
import {
  Typography,
  Grid,
  Box,
  ThemeProvider,
  createTheme,
} from "@mui/material";


function MyWorkGlance() {
  const theme = createTheme();
  const [selectedValue, setSelectedValue] = useState("This Month");  
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const {pending, progress, issues, review, completed} = myWorkData;


  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: "#ffffff",
          height: "auto", // Cambiado a "auto" para que el contenedor se ajuste al contenido
          borderRadius: "20px",
          padding: "20px", // Agregado espacio interno para separar los elementos
        }}
      >
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: "500",
            fontFamily: "Poppins",
            marginBottom: "20px", // Agregado espacio inferior para separar del siguiente elemento
          }}
        >
          My Work Glance
        </Typography>
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
      }}
    >
      <div
        style={{
          borderRadius: "4px",
          width: "8px",
          height: "33px",
          backgroundColor: data.color,
          marginBottom: "5px", // Agregado espacio inferior para separar del siguiente elemento
        }}
      />
      <Typography variant="h5" sx={{ marginLeft: 1.5, marginBottom: "5px", fontWeight: "bold", color: "black" }}>
        {data.total}
      </Typography>
      <Typography>{data.title}</Typography>
    </Grid>
  );
}

export default MyWorkGlance;