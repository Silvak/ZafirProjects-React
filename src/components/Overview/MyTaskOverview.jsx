import FilterSelect from "@/components/Selects/FilterSelect";
import {
  Grid,
  ThemeProvider,
  Typography,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { useBoundStore } from "../../stores/index"; // Importa el hook useBoundStore aquí
import MyTaskList from "./MyTaskList";

const filtersData = [
  { id: 1, label: "This week", value: "week" },
  { id: 2, label: "This month", value: "month" },
  { id: 3, label: "Today", value: "today" },
];

function MyTask() {
  const { tasks, addTask } = useBoundStore();
  const theme = createTheme();
  const [selectedValue, setSelectedValue] = useState("This Week");
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const workingTasks = tasks.filter(
    (task) => task.status !== "Pending" && task.status !== "Backlog"
  );

  return (
    <ThemeProvider theme={theme}>
      <Grid
        sx={{
          backgroundColor: "#ffffff",
          height: "572px",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          flex: 1,
          overflow: "-moz-hidden-unscrollable",
          overflowX: "hidden",
        }}
      >
        {/* My Task Header */}
        <Grid
          item
          sx={{
            display: isMobile ? "inline-table" : "flex",
            justifyContent: "space-between",
            padding: "10px 30px",
            alignItems: "center",
          }}
        >
          <Grid
            item
            sx={{
              marginLeft: "20px",
              marginBottom: "17px",
              marginTop: "22px",
            }}
          >
            <Typography
              sx={{ fontSize: "20px", fontWeight: 500, fontFamily: "Poppins" }}
            >
              My Task
            </Typography>
          </Grid>
          {/* Select Filter */}
          <Grid item>
            <FilterSelect data={filtersData} padding="10px" />
          </Grid>
        </Grid>
        {/* Task list */}
        <MyTaskList
          tasks={workingTasks}
          handleAddTask={() => handleAddTask("", "")}
        />
      </Grid>
    </ThemeProvider>
  );
}

export default MyTask;
