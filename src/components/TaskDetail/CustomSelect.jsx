import React, { useState } from "react";
import { Typography } from "@mui/material";

const CustomSelect = ({
  label,
  options,
  disabled,
  defaultValue,
  inputRef,
  isEditing,
}) => {
  const [selectedOption, setSelectedOption] = useState(defaultValue || "");

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
  };

  return (
    <div style={{ width: "full", display: "flex", flexDirection: "column" }}>
      <Typography
        variant="h6"
        style={{
          fontSize: 14,
          fontWeight: "normal",
          color: isEditing ? "black" : "darkgray",
        }}
      >
        {label}
      </Typography>
      <select
        value={selectedOption}
        onChange={handleChange}
        disabled={disabled}
        ref={inputRef}
        style={{
          paddingBlock: 12,
          cursor: "pointer",
          borderRadius: 6,
          fontFamily: "Poppins",
          paddingInline: 8,
          border: "1px solid lightgray",
          color: "#6B6E75",
          fontWeight: 500,
          fontSize: 14,
        }}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomSelect;
