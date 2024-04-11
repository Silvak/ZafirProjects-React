import { Tooltip } from "@mui/material";
import { useState } from "react";
import { isInThisWeek, isInThisMonth, isToday } from "../../hooks/useDates";

const FilterSelect = ({ data, padding }) => {
  const [filter, setFilter] = useState("");

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    alert("filtrando");
  };

  return (
    <Tooltip>
      <select
        value={filter}
        onChange={handleFilterChange}
        style={{
          border: "none",
          padding,
          outline: " 1px solid #808080",
          background: "white",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        {data.map((filter) => (
          <option value={filter.value} key={filter.id}>
            {filter.label}
          </option>
        ))}
      </select>
    </Tooltip>
  );
};
export default FilterSelect;
