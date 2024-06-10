import { useState, useEffect } from "react";
import { format } from "date-fns";
import useDateRange from "@/hooks/ganttChart/useDateRange";
import TaskElement from "@/components/ganttChart/TaskElement";
import {
  Container,
  UtilsTable,
  TaskTable,
  TableElement,
  TableElementHead,
  TableElementBody,
} from "./GanttStyles";
import { useBoundStore } from "@/stores/index";
import { shallow } from "zustand/shallow";
import { useNewTaskArr } from "@/hooks/ganttChart/useNewTaskArr";

// ----------------- gantt chart ----------------------
const GanttChart = () => {
  const [view, setView] = useState("month");
  const [result, setResult] = useState([]);

  const handleChange = (event) => {
    setView(event.target.value);
  };

  const { myTasks } = useBoundStore((state) => state, shallow);

  useEffect(() => {
    setResult(useNewTaskArr(myTasks));
    //console.log(myTasks.length + "-total  Task:", myTasks);
  }, [myTasks]);

  let dateRange = useDateRange(result, view);

  if (result.length == 0) return <>Loading</>;
  return (
    <Container>
      <UtilsTable>
        <select
          name="view"
          id="view"
          value={view}
          onChange={handleChange}
          disabled={false}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            width: "140px",
            border: "1px solid #E0E3E8",
          }}
        >
          <option value="day">Day</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
        </select>
      </UtilsTable>

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
                  dateRange={dateRange}
                  tasksList={result}
                />
              </TableElementBody>
            </TableElement>
          ))}
        </TaskTable>
      </div>
    </Container>
  );
};

export default GanttChart;
