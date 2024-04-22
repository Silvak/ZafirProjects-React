import React from "react";
import { Typography, useTheme, useMediaQuery } from "@mui/material";
import CustomSelect from "./CustomSelect";

function ReportHeader() {
  const options = ["This Month", "Last Month", "This Year", "Last Year"];
  const theme = useTheme();
  const isSmallScreen = useMediaQuery("(max-width: 480px)");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isSmallScreen ? "column" : "row",
        justifyContent: "space-between",
        alignItems: isSmallScreen ? "center" : "flex-start",
        marginTop: "19px",
        padding: "0 24px",
        gap: isSmallScreen ? "8px" : "0",
      }}
    >
      <Typography
        style={{ fontSize: "24px" }}
        sx={{
          color: "#1D1F24",
          fontWeight: 600,
          fontFamily: "Poppins",
          lineHeight: "36px",
          marginRight: isSmallScreen ? 8 : 0,
        }}
      >
        Project Report
      </Typography>
      <CustomSelect options={options} />
    </div>
  );
}

export default ReportHeader;
