import {
  Typography,
  Grid,
  Box,
  ThemeProvider,
  createTheme,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import { useBoundStore } from "../../../stores/index";
import { isInThisWeek, isInThisMonth, isToday } from "../../../hooks/useDates";
import { useEffect, useState } from "react";

function ReportTasks({ customProject }) {
  const filtersData = [
    { id: 1, label: "All", value: "All" },
    { id: 2, label: "This month", value: "This Month" },
    { id: 3, label: "This week", value: "This Week" },
    { id: 4, label: "Today", value: "Today" },
  ];

  const theme = createTheme();
  const { customTasks, fetchTasksByIdCustom } = useBoundStore();
  const [filterOption, setFilterOption] = useState("All");
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const handleFilter = (event) => {
    setFilterOption(event.target.value);
  };

  useEffect(() => {
    if (customProject) {
      const fetchData = async () => {
        try {
          await fetchTasksByIdCustom(customProject._id);
        } catch (error) {
          console.error("Error fetching tasks", error);
        }
      };
      fetchData();
    }
  }, [customProject]);

  const filteredTasks = customTasks.filter((task) => {
    const taskDate = new Date(task.start);
    switch (filterOption) {
      case "This Week":
        return isInThisWeek(taskDate);
      case "This Month":
        return isInThisMonth(taskDate);
      case "Today":
        return isToday(taskDate);
      case "All":
        return true;
      default:
        return true;
    }
  });

  const inProgressTasks = filteredTasks.filter(
    (tasks) => tasks.state === "In Progress"
  );
  const pendingTasks = filteredTasks.filter(
    (tasks) => tasks.state === "Pending"
  );
  const issuesTasks = filteredTasks.filter((tasks) => tasks.state === "Issues");
  const reviewTasks = filteredTasks.filter((tasks) => tasks.state === "Review");
  const completedTasks = filteredTasks.filter(
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
            <Tooltip title="Filter">
              <select
                value={filterOption}
                onChange={handleFilter}
                style={{
                  border: "none",
                  outline: " 1px solid #808080",
                  background: "white",
                  borderRadius: "8px",
                  cursor: "pointer",
                  padding: "10px",
                }}
              >
                {filtersData.map((filter) => (
                  <option
                    value={filter.value}
                    key={filter.id}
                    onChange={() => handleFilter("")}
                  >
                    {filter.label}
                  </option>
                ))}
              </select>
            </Tooltip>
          </Grid>
        </Grid>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "20px",
          }}
        >
          <InfoCard data={renderData.progress} />
          <InfoCard data={renderData.pending} />
          <InfoCard data={renderData.issues} />
          <InfoCard data={renderData.review} />
          <InfoCard data={renderData.completed} />
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

export default ReportTasks;
