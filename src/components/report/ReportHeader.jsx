import React from "react";
import { Typography, useTheme, useMediaQuery } from "@mui/material";

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
        gap: isSmallScreen ? "8px" : "0",
        marginBottom: "56px",
      }}
    >
      <h6
        style={{
          fontWeight: 500,
          fontSize: "24px",
        }}
      >
        Project Report
      </h6>
      {/* <CustomSelect options={options} /> */}
    </div>
  );
}

export default ReportHeader;
