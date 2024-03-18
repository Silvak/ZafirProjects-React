import { mockTasksGantt } from "@/mockData/taskData";
import { styled } from "@mui/system";
import {
  differenceInDays,
  differenceInCalendarDays,
  differenceInMonths,
  getDaysInMonth,
  format,
  addDays,
  addWeeks,
  addMonths,
  startOfMonth,
  endOfMonth,
} from "date-fns";
import React, { useState } from "react";

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

const TaskRow = styled("div")({
  display: "flex",
  height: "70px",
  width: "100px", // el ancho debe ser el mismo que el de <TableElement/>
  alignItems: "center",
  padding: "0px",
  //borderBottom: "1px solid #E0E3E8",
});

const Task = styled("div")({
  height: "100%",
  width: "100%",
  //backgroundColor: "#a0c9c030",
});

const TaskBar = styled("div")({
  borderRadius: "12px",
  height: "40px",
  overflow: "hidden",
});

// ----------------- gantt chart ----------------------
const GanttChart = () => {
  const [view, setView] = useState("month"); // Estado para almacenar la vista actual

  const minDate = mockTasksGantt.reduce((min, task) => {
    const taskDate = new Date(task.date.start.replace(/-/g, "/"));
    return taskDate < min ? taskDate : min;
  }, new Date());

  const maxDate = mockTasksGantt.reduce((max, task) => {
    const taskDate = new Date(task.date.end.replace(/-/g, "/"));
    return taskDate > max ? taskDate : max;
  }, new Date());

  const calculateDateRange = (startDate, endDate, typeView) => {
    const dateRange = [];
    let iterator = startDate;

    const addTime = {
      day: addDays,
      week: addWeeks,
      month: addMonths,
    }[typeView];

    while (iterator <= endDate) {
      dateRange.push(iterator);
      iterator = addTime(iterator, 1);
    }

    return dateRange;
  };

  const dateRange = calculateDateRange(minDate, maxDate, view);
  //console.log(format(dateRange[0].getTime(), "M-d-yyyy"));

  const handleChange = (event) => {
    setView(event.target.value);
  };

  const calculateTaskWidth = (view, date, taskStartDate, taskEndDate) => {
    const taskDurationInDays =
      Math.floor((taskEndDate - taskStartDate) / (1000 * 60 * 60 * 24)) + 1;

    if (view === "day") {
      return { width: taskDurationInDays * 100, left: 0 }; // Ancho fijo para la vista de día
    } else if (view === "week") {
      // Devolver el porcentaje total del ancho de la tarea
      const taskWidthPercentage = (taskDurationInDays / 7).toFixed(2) * 100;
      const taskLeft =
        differenceInDays(taskStartDate, date) * (100 / dateRange.length);
      return { width: taskWidthPercentage, left: taskLeft };
    } else if (view === "month") {
      // Calcular el número de meses entre las fechas
      const monthsRange = differenceInMonths(taskEndDate, taskStartDate) + 1;

      // Si la tarea dura menos de un mes, devolver el porcentaje correspondiente
      if (monthsRange === 1) {
        const taskWidthPercentage = (
          (taskDurationInDays / getDaysInMonth(taskStartDate)) *
          100
        ).toFixed(2);

        const daysFromStartOfMonth = differenceInDays(
          taskStartDate,
          startOfMonth(taskStartDate)
        );
        const taskLeftPercentage =
          (daysFromStartOfMonth / getDaysInMonth(taskStartDate)) * 100;

        return {
          width: taskWidthPercentage,
          left: taskLeftPercentage.toFixed(2),
        };
      }

      // Calcular la fracción del primer mes
      const startMonthDays =
        differenceInCalendarDays(endOfMonth(taskStartDate), taskStartDate) + 1;
      const startMonthFraction = startMonthDays / getDaysInMonth(taskStartDate);

      // Calcular la fracción del último mes
      const endMonthDays =
        differenceInCalendarDays(taskEndDate, startOfMonth(taskEndDate)) + 1;
      const endMonthFraction = endMonthDays / getDaysInMonth(taskEndDate);

      // Calcular el total de fracción de meses
      const totalFraction =
        startMonthFraction + (monthsRange - 2) + endMonthFraction;

      const taskWidthPercentage = (totalFraction * 100).toFixed(2);

      const daysFromStartOfMonth = differenceInDays(
        taskStartDate,
        startOfMonth(taskStartDate)
      );
      const taskLeftPercentage =
        (daysFromStartOfMonth / getDaysInMonth(taskStartDate)) * 100;

      return { width: taskWidthPercentage, left: taskLeftPercentage };
    }
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
                <TaskElement
                  date={date}
                  view={view}
                  calculateTaskWidth={calculateTaskWidth}
                />
              </TableElementBody>
            </TableElement>
          ))}
        </TaskTable>
      </div>
    </div>
  );
};

function TaskElement({ date, view, calculateTaskWidth }) {
  return (
    <>
      {mockTasksGantt.map((task) => {
        const taskStartDate = new Date(task.date.start);
        const taskEndDate = new Date(task.date.end);

        // Range
        const isTaskInRange =
          (view === "day" && date >= taskStartDate && date <= taskEndDate) ||
          (view === "week" &&
            date >= addDays(taskStartDate, -taskStartDate.getDay()) &&
            date <= addDays(taskEndDate, 6 - taskEndDate.getDay())) ||
          (view === "month" &&
            date.getMonth() === taskStartDate.getMonth() &&
            date.getFullYear() === taskStartDate.getFullYear());

        // Calculate if the task start date is within the current view
        const isCurrentDateTaskStart =
          (view === "day" && differenceInDays(taskStartDate, date) === 0) ||
          (view === "week" &&
            date >= addDays(taskStartDate, -taskStartDate.getDay()) &&
            date <= addDays(taskStartDate, 6 - taskStartDate.getDay())) ||
          (view === "month" &&
            date.getMonth() === taskStartDate.getMonth() &&
            date.getFullYear() === taskStartDate.getFullYear());

        // Calculate the width of the task bar based on its duration and view
        let taskWidth = 0;

        // Adjust the left position of the task bar based on its start date
        if (isTaskInRange & isCurrentDateTaskStart) {
          taskWidth = calculateTaskWidth(
            view,
            date,
            taskStartDate,
            taskEndDate
          );
        }

        return (
          <TaskRow key={task.id}>
            {isTaskInRange & isCurrentDateTaskStart ? (
              <Task>
                <TaskBar
                  style={{
                    background: `${task.styles.color}99`,
                    width: `${taskWidth.width}px`,
                    left: `${taskWidth.left}px`,
                    position: "relative",
                    top: "15px",
                    zIndex: "1",
                    cursor: "pointer",
                  }}
                  draggable
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      height: "100%",
                      width: "100%",
                      padding: "0 8px",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "12px",
                        fontWeight: 500,
                        color: "white",
                      }}
                    >
                      {task.task}
                    </p>
                    <div>Persons </div>
                  </div>

                  <div
                    style={{
                      position: "relative",
                      left: 0,
                      top: "-40px",
                      height: "100%",
                      width: `${task.progress}%`,
                      background: `${task.styles.color}`,
                      zIndex: "-1",
                    }}
                  ></div>
                </TaskBar>
              </Task>
            ) : null}
          </TaskRow>
        );
      })}
    </>
  );
}

function Gantt() {
  return (
    <div>
      <GanttChart />
    </div>
  );
}

export default Gantt;
