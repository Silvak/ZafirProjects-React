import { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Box,
  ThemeProvider,
  createTheme,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import { useBoundStore } from "../../stores/index";
import { shallow } from "zustand/shallow";
import { isInThisWeek, isInThisMonth, isToday } from "../../hooks/useDates";

const filtersData = [
  { id: 1, label: "All", value: "All" },
  { id: 2, label: "This month", value: "This Month" },
  { id: 3, label: "This week", value: "This Week" },
  { id: 4, label: "Today", value: "Today" },
];

function MyWorkGlance() {
  const theme = createTheme();
  const {
    myTasks,
    fetchTasksById,
    selectedProject,
    fetchTasksByUser,
    User,
    userTasks,
  } = useBoundStore((state) => state, shallow);
  const [filterOption, setFilterOption] = useState("All");
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const handleFilter = (event) => {
    setFilterOption(event.target.value);
  };

  useEffect(() => {
    if (User) {
      const fetchData = async () => {
        try {
          await fetchTasksByUser(User.uid);
        } catch (error) {
          console.error("Error fetching tasks", error);
        }
      };
      fetchData();
    }
  }, []);

  const filteredTasks = Array.isArray(myTasks)
    ? myTasks.filter((task) => {
        const taskDate = new Date(task.start);
        switch (filterOption) {
          case "This Week":
            return isInThisWeek(taskDate);
          case "This Month":
            return isInThisMonth(taskDate);
          case "Today":
            return isToday(taskDate);
          case "All":
          default:
            return true;
        }
      })
    : [];

  const inProgressTasks = filteredTasks.filter(
    (task) => task.state === "In Progress"
  );
  const pendingTasks = filteredTasks.filter((task) => task.state === "Pending");
  const issuesTasks = filteredTasks.filter((task) => task.state === "Issues");
  const reviewTasks = filteredTasks.filter((task) => task.state === "Review");
  const completedTasks = filteredTasks.filter(
    (task) => task.state === "Completed"
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
      color: "#EBA741",
    },
    review: {
      reviewTasks,
      title: "Review",
      total: reviewTasks.length,
      color: "#E55D57",
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
          borderRadius: "20px",
          padding: "20px",
          overflowX: "auto",
          minHeight: "180px",
        }}
      >
        <Grid
          item
          sx={{
            display: isMobile ? "inline-table" : "flex",
            marginBottom: "20px",
            alignItems: "center",
            justifyContent: "space-between",
            overflowX: "hidden",
          }}
        >
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: 600,
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
                  // border: 'none',
                  background: "white",
                  borderRadius: "8px",
                  cursor: "pointer",
                  padding: "8px 16px",
                  height: "40px",
                  border: "1px solid #E0E3E8",
                }}
              >
                {filtersData.map((filter) => (
                  <option value={filter.value} key={filter.id}>
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
          {/* <InfoCard data={renderData.issues} /> */}
          {/* <InfoCard data={renderData.review} /> */}
          <InfoCard data={renderData.completed} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

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

export default MyWorkGlance;
