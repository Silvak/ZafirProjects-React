import { useState } from "react";

const usePagination = ({ initiaPage = 1, initialRowsPerPage = 10 }) => {
  const [page, setPage] = useState(initiaPage);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, initialRowsPerPage));
    setPage(initiaPage);
  };

  return {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
  };
};

export default usePagination;
