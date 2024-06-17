import { Box, Input, TextField } from "@mui/material";
import { useState } from "react";

const TasksBrowserSearch = ({ searchTerm, setSearchTerm }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("term:", term);
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ my: "20px" }}>
      <input
        name="term"
        type="search"
        value={searchTerm}
        placeholder="Search a substask..."
        onChange={handleChange}
        style={{
          padding: "15px",
          borderRadius: "6px",
          background: "transparent",
          width: "min(100%,600px)",
          border: "1px solid gray",
          fontSize: "16px",
        }}
      />
    </Box>
  );
};
export default TasksBrowserSearch;
