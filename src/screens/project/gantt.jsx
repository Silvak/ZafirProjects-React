import { useState } from "react";
import { mockTasks } from "@/mockData/taskData";
import { styled } from "@mui/system";
import { differenceInDays, format, addDays } from "date-fns";

// ----------------- syles ----------------------
const TaskTable = styled("div")({
  height: "auto",
  maxHeight: "640px",
  display: "flex",
  backgroundColor: "#FFFFFF",
  borderRadius: 20,
  overflowX: "scroll",
});

const Task = styled("div")({
  height: "100%",
  width: "100%",
  zIndex: 1,
  overflow: "hidden",
  color: "darkslategray",
  backgroundColor: "#a0c9c0",
  padding: 8,
  //borderRadius: 12,
});

const TaskRow = styled("div")({
  display: "flex",
  height: "100px",
  alignItems: "center",
  padding: "0px",
  borderBottom: "1px solid #E0E3E8",
});

// Day drop element
const TableElement = styled("div")({
  minWidth: "100px",
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
  overflowY: "auto", // Allow vertical scrolling if there are too many tasks
  color: "darkslategray",
  borderBottom: "1px solid #E0E3E8",
  padding: "0",
});

// ----------------- dyas logic ----------------------

// Encuentra la fecha más antigua y la más reciente entre todas las tareas
const minDate = mockTasks.reduce((min, task) => {
  const taskDate = new Date(task.date.start.replace(/-/g, "/"));
  return taskDate < min ? taskDate : min;
}, new Date()); // Inicializa con la fecha de inicio de la primera tarea

const maxDate = mockTasks.reduce((max, task) => {
  const taskDate = new Date(task.date.end.replace(/-/g, "/"));
  return taskDate > max ? taskDate : max;
}, new Date());

// Calculate the difference in days between the oldest and newest dates
const daysDifference = differenceInDays(maxDate, minDate) + 1;

// Generate the array of days within the time interval
let days = Array.from({ length: daysDifference }, (_, index) => {
  const currentDate = addDays(minDate, index);
  return {
    day: format(currentDate, "EEE").toLowerCase(),
    num: format(currentDate, "d"),
    week: format(currentDate, "w"), // Semana del mes al que pertenece el día
    month: format(currentDate, "MMMM"), // Mes al que pertenece el día
    year: format(currentDate, "yyyy"), // Año al que pertenece el día
  };
});

// ----------------- gantt chart ----------------------
const GanttChart = () => {
  const [taskDrawnOnDay, setTaskDrawnOnDay] = useState({});

  return (
    <div
      style={{
        overflow: "hidden",
        borderRadius: "22px",
        border: "1px solid #E0E3E8",
      }}
    >
      <TaskTable>
        {days.map((element, index) => (
          <TableElement key={index}>
            <TableElementHead>
              <p>{element.num}</p>
              <p>
                {element.day}/week {element.week}/{element.month}/{element.year}
              </p>
            </TableElementHead>

            <TableElementBody>
              {mockTasks.map((task) => {
                const taskStartDate = new Date(
                  task.date.start.replace(/-/g, "/")
                );
                const taskEndDate = new Date(task.date.end.replace(/-/g, "/"));
                const isTaskInCurrentDay =
                  taskStartDate <= addDays(minDate, index) &&
                  taskEndDate >= addDays(minDate, index);

                const taskId = task.id;
                const taskAlreadyDrawn = taskDrawnOnDay[taskId];

                if (isTaskInCurrentDay && !taskAlreadyDrawn) {
                  setTaskDrawnOnDay((prevState) => ({
                    ...prevState,
                    [taskId]: true,
                  }));
                  console.log(task.id);
                }

                return (
                  <TaskRow key={task.id}>
                    {isTaskInCurrentDay && (
                      <Task style={{ background: `${task.styles.color}` }}>
                        <div>{task.task}</div>
                      </Task>
                    )}
                  </TaskRow>
                );
              })}
            </TableElementBody>
          </TableElement>
        ))}
      </TaskTable>
    </div>
  );
};

function Gantt() {
  return (
    <div>
      <GanttChart />
    </div>
  );
}

export default Gantt;

/*

{mockTasks.map((task) => {
                const taskStartDate = new Date(
                  task.date.start.replace(/-/g, "/")
                );
                const taskEndDate = new Date(task.date.end.replace(/-/g, "/"));
                const isTaskInCurrentDay =
                  taskStartDate <= addDays(minDate, index) &&
                  taskEndDate >= addDays(minDate, index);

                return (
                  <TaskRow key={task.id}>
                    {isTaskInCurrentDay && (
                      <Task style={{ background: `${task.styles.color}` }}>
                        <div>{task.task}</div>
                      </Task>
                    )}
                  </TaskRow>
                );
              })}
*/
