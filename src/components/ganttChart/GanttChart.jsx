import { useState } from "react";
import { mockTasksGantt } from "@/mockData/taskData";
import { styled } from "@mui/system";
import { format } from "date-fns";
import useDateRange from "@/hooks/ganttChart/useDateRange";
import TaskElement from "@/components/ganttChart/TaskElement";

// ----------------- syles ----------------------
const TaskTable = styled("div")({
  height: "auto",
  maxHeight: "640px",
  display: "flex",
  backgroundColor: "#FFFFFF",
  borderRadius: 20,
  overflowX: "scroll",
});

// Day drop element
const TableElement = styled("div")({
  width: "100px",
  height: "100%",
  color: "darkslategray",
  borderRight: "1px solid #E0E3E8",
});

const TableElementHead = styled("div")({
  width: "100%",
  height: "98px",
  overflow: "hidden",
  borderBottom: "1px solid #E0E3E8",
  padding: "20px",
  position: "sticky",
  top: 0,
  zIndex: 10,
  background: "#FFFFFF",
  "& p:first-of-type": {
    // Cambiado de ":first-child" a ":first-of-type"
    color: "#1D1F24",
    fontSize: "22px",
    fontWeight: 500,
  },
  "& p:last-child": {
    // day
    color: "#6B6E75",
    fontSize: "8px", //"14px",
    textTransform: "uppercase",
  },
});

const TableElementBody = styled("div")({
  flex: 1,
  flexDirection: "column",
  width: "100%",
  //overflowY: "auto",
  color: "darkslategray",
  borderBottom: "1px solid #E0E3E8",
  padding: "0",
});

// ----------------- gantt chart ----------------------
const GanttChart = () => {
  const [view, setView] = useState("month");
  const dateRange = useDateRange(mockTasksGantt, view);

  const handleChange = (event) => {
    setView(event.target.value);
  };

  return (
    <div>
      <select
        name="view"
        id="view"
        value={view}
        onChange={handleChange}
        disabled={false}
      >
        <option value="day">Day</option>
        <option value="week">Week</option>
        <option value="month">Month</option>
      </select>

      <div
        style={{
          overflow: "hidden",
          borderRadius: "22px",
          border: "1px solid #E0E3E8",
        }}
      >
        <TaskTable>
          {/* Data Range */}
          {dateRange.map((date, index) => (
            <TableElement key={index}>
              <TableElementHead>
                {view == "day" && <p>{format(date, "d")}</p>}
                {view == "week" && <p>{format(date, "d")}</p>}
                {view == "month" && <p>{format(date, "M")}</p>}

                <p>
                  {format(date, "EEE")}/week {format(date, "w")}
                  {format(date, "MMMM")}/{format(date, "yyyy")}
                </p>
              </TableElementHead>

              <TableElementBody>
                <TaskElement date={date} view={view} dateRange={dateRange} />
              </TableElementBody>
            </TableElement>
          ))}
        </TaskTable>
      </div>
    </div>
  );
};

export default GanttChart;
