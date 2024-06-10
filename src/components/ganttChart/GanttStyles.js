import { styled } from "@mui/system";

// ----------------- GanttChart Syles ----------------------
export const Container = styled("div")({
  height: "auto",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#F6F7FA",
  borderRadius: 20,
  padding: "0rem 1rem 1rem 1rem",
  border: "1px solid #E0E3E8",
});

export const UtilsTable = styled("div")({
  display: "flex",
  justifyContent: "end",
  margin: "1.5rem 0rem",
});

export const TaskTable = styled("div")({
  height: "auto",
  maxHeight: "640px",
  display: "flex",
  backgroundColor: "#FFFFFF",
  borderRadius: 20,
  overflowX: "scroll",
});

// Day drop element
export const TableElement = styled("div")({
  width: "100px",
  height: "100%",
  color: "darkslategray",
  borderRight: "1px solid #E0E3E8",
});

export const TableElementHead = styled("div")({
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

export const TableElementBody = styled("div")({
  flex: 1,
  flexDirection: "column",
  width: "100%",
  //overflowY: "auto",
  color: "darkslategray",
  borderBottom: "1px solid #E0E3E8",
  padding: "0",
});

// ----------------- TaskElement syles ----------------------
export const TaskRow = styled("div")({
  display: "flex",
  height: "70px",
  width: "100px", // The width must be the same as that of <TableElement/>.
  alignItems: "center",
  padding: "0px",
  //borderBottom: "1px solid #E0E3E8",
});

export const Task = styled("div")({
  height: "100%",
  width: "100%",
  //backgroundColor: "#a0c9c030",
});

export const TaskBar = styled("div")({
  borderRadius: "12px",
  height: "40px",
  overflow: "hidden",
});
