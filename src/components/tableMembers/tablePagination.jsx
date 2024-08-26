import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import "./styles.css";

const TablePagination = ({
  rowsPerPage,
  handleChangeRowsPerPage,
  page,
  handleChangePage,
  data,
}) => {
  const startIndex = (page - 1) * rowsPerPage + 1;
  const endIndex = Math.min(startIndex + rowsPerPage - 1, data.length);

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      style={{ marginTop: "2rem" }}
    >
      <Grid
        item
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          margin: "0.5rem",
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: "normal" }}>
          View
        </Typography>
        <Select
          size="small"
          value={rowsPerPage}
          onChange={handleChangeRowsPerPage}
          style={{
            width: "5rem",
            borderRadius: "8px",
            backgroundColor: "white",
          }}
          inputProps={{
            backgroundColor: "white",
          }}
          MenuProps={{
            PaperProps: {
              style: {
                borderRadius: "8px",
                marginTop: 2,
                backgroundColor: "white",
              },
            },
          }}
        >
          {[10, 20, 50, 100].map((value) => (
            <MenuItem
              key={value}
              value={value}
              style={{
                fontSize: "12px",
                fontWeight: "normal",
              }}
              sx={{
                backgroundColor: "white",
                "&:hover": {
                  backgroundColor: "rgb(118, 98, 234)",
                  color: "gray",
                },
                "&.Mui-selected": {
                  backgroundColor: "rgb(118, 98, 234)",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "rgb(118, 98, 234)",
                    color: "gray",
                  },
                },
              }}
            >
              {value}
            </MenuItem>
          ))}
        </Select>

        <Typography variant="body2" sx={{ fontWeight: "normal" }}>
          entries per page
        </Typography>
      </Grid>
      <Grid
        item
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          margin: "0.5rem",
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: "normal", margin: 1 }}>
          Showing {startIndex}-{endIndex} of {data.length} entries
        </Typography>
        <Pagination
          count={Math.ceil(data.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          className="pagination"
          sx={{ mb: 1 }}
        />
      </Grid>
    </Grid>
  );
};

export default TablePagination;
