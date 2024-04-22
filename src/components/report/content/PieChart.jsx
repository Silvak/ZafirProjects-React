import * as React from "react";
import { Grid, Box, Typography, useMediaQuery } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";
// import { pieChartData } from "../../../mockData/pieData";
import { reportData } from "../../../mockData/myWorkData";
import { useBoundStore } from "../../../stores/index";

const size = {
  width: 300,
  height: 250,
};

const StyledText = styled("text")(({ theme }) => ({
  fill: "black",
  fontWeight: 600,
  fontFamily: "Poppins",
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: 24,
}));

function PieCenterLabel({ children }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

export default function CustomPieChart() {
  const { customTasks, fetchTasksByIdCustom } = useBoundStore();

  const inProgressTasks = customTasks.filter(
    (tasks) => tasks.state === "In Progress"
  );
  const pendingTasks = customTasks.filter((tasks) => tasks.state === "Pending");
  const issuesTasks = customTasks.filter((tasks) => tasks.state === "Issues");
  const reviewTasks = customTasks.filter((tasks) => tasks.state === "Review");
  const completedTasks = customTasks.filter(
    (tasks) => tasks.state === "Completed"
  );

  const renderData = {
    progress: {
      inProgressTasks,
      title: "In Progress",
      total: inProgressTasks.length,
      color: "#459CED",
    },
    pending: {
      pendingTasks,
      title: "Pending",
      total: pendingTasks.length,
      color: "#6B6E75",
    },
    issues: {
      issuesTasks,
      title: "Issues",
      total: issuesTasks.length,
      color: "#E55D57",
    },
    review: {
      reviewTasks,
      title: "Review",
      total: reviewTasks.length,
      color: "#EBA741",
    },
    completed: {
      completedTasks,
      title: "Completed",
      total: completedTasks.length,
      color: "#429482",
    },
  };

  const pieChartData = [
    {
      label: "Completed",
      value: renderData.completed.total,
      color: renderData.completed.color,
    },
    {
      label: "Pending",
      value: renderData.pending.total,
      color: renderData.pending.color,
    },
    {
      label: "Issues",
      value: renderData.issues.total,
      color: renderData.issues.color,
    },
    {
      label: "Reviews",
      value: renderData.review.total,
      color: renderData.review.color,
    },
    {
      label: "In Progress",
      value: renderData.progress.total,
      color: renderData.progress.color,
    },
  ];

  const total = customTasks.length;
  console.log("renderdata", renderData);

  const isSmallScreen = useMediaQuery("(max-width:950px)");

  const revertedPieChartData = [...pieChartData].reverse();

  const calculatedSize = {
    width: isSmallScreen ? 250 : size.width,
    height: size.height,
  };

  return (
    <Grid
      container
      columns={{ xs: 1, sm: 2 }}
      alignItems="center"
      justifyContent="center"
      sx={{
        position: "relative",
        border: "1px solid #E0E3E8",
        m: 2,
        mt: "-2%",
        width: "92%",
        borderRadius: "12px",
      }}
    >
      <Grid
        item
        style={{
          marginLeft: isSmallScreen ? "20%" : 0,
          marginRight: isSmallScreen ? 0 : "-4vw",
        }}
      >
        <Box sx={{ marginBlock: 2 }}>
          <PieChart
            series={[{ data: pieChartData, innerRadius: "75%" }]}
            {...calculatedSize}
            slotProps={{
              legend: { hidden: true },
            }}
          >
            {total && <PieCenterLabel>{total}</PieCenterLabel>}
          </PieChart>
        </Box>
      </Grid>
      <Grid item>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            display: "flex",
            flexDirection: isSmallScreen ? "row" : "column",
            flexWrap: isSmallScreen ? "wrap" : "nowrap",
          }}
        >
          {" "}
          {revertedPieChartData.map((item, index) => (
            <li
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "8px",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  backgroundColor: item.color,
                  marginRight: isSmallScreen ? "2px" : "8px",
                  marginLeft: isSmallScreen ? "8px" : "0px",
                  borderRadius: "50%",
                }}
              ></div>
              <Typography
                style={{
                  color: "#1D1F24",
                  fontFamily: "Poppins",
                  fontSize: isSmallScreen ? "10px" : "14px",
                  fontWeight: 500,
                  lineHeight: "21px",
                  letterSpacing: "0.01em",
                  marginBlock: "6px",
                }}
              >
                {item.label}
              </Typography>
            </li>
          ))}
        </ul>
      </Grid>
    </Grid>
  );
}
