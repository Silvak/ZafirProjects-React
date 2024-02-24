import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import { membersData } from "@/mockData/membersData";
import useMediaQuery from "@mui/material/useMediaQuery";
import TableHeader from "@/components/tableMembers/tableHeader.jsx";
import TableRowComponent from "@/components/tableMembers/tableRow.jsx";
import TablePagination from "@/components/tableMembers/tablePagination.jsx";
import Button from "@mui/material/Button";
import ReportHeader from "./ReportHeader"

const ReportComponent = () => {
  const isMobile = useMediaQuery("(max-width:600px)");


  return (
    <div >
      <ReportHeader />
    </div>
  );
};

export default ReportComponent;
