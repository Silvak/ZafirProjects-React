import React from "react";
import { Typography, Divider, useMediaQuery } from "@mui/material";
import { mockTasks } from "../../../mockData/taskData"; 

const UpcomingTask = () => {
  const isLittleScreen = useMediaQuery("(max-width:800px)");

  const tasksWithProfilePhotos = mockTasks.slice(0, 4);
  const taskQuantities = [11, 15, 12, 8];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "32px",
        marginTop: "-2%",
        marginBottom: "1.2vh",
        borderRadius: "12px",
        border: "1px solid #E0E3E8",
        marginInline: "18px",
        position: "relative", 
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {tasksWithProfilePhotos.map((task, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "column-reverse",
              alignItems: "center",
            }}
          >
            <img
              src={task.profilePhoto}
              alt={`User ${index + 1}`}
              style={{ width: "32px", height: "32px", marginTop:"8px" }}
            />
            <div
              style={{
                width: "24px",
                height: `${taskQuantities[index] * 15}px`,
                backgroundColor: "#459CED",
                borderTopLeftRadius: "12px",
                borderTopRightRadius: "12px",
              }}
            />
          </div>
        ))}
      </div>

      <div style={{ position: "absolute", bottom: "0", left: "0", width: "100%", padding: "40px 0px" }}>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
          <Typography variant="body2" style={{ fontSize: "14px", fontWeight:"normal", color: "lightgray", textAlign: "center", marginBlock: "22px", marginRight:"12px" }}>15</Typography>
          <div style={{ borderBottom: "1px solid lightgray", width:"85%", marginRight:"14px" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
          <Typography variant="body2" style={{ fontSize: "14px", fontWeight:"normal", color: "lightgray", textAlign: "center", marginBlock: "22px", marginRight:"12px" }}>10</Typography>
          <div style={{ borderBottom: "1px solid lightgray", width:"85%", marginRight:"14px" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
          <Typography variant="body2" style={{ fontSize: "14px", fontWeight:"normal", color: "lightgray", textAlign: "center", marginBlock: "22px", marginRight:"12px" }}>5</Typography>
          <div style={{ borderBottom: "1px solid lightgray", width:"85%", marginRight:"14px" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
          <Typography variant="body2" style={{ fontSize: "14px", fontWeight:"normal", color: "lightgray", textAlign: "center", marginBlock: "22px", marginRight:"12px" }}>0</Typography>
          <div style={{ borderBottom: "1px solid lightgray", width:"85%", marginRight:"14px" }} />
        </div>
      </div>
    </div>
  );
};

export default UpcomingTask;
