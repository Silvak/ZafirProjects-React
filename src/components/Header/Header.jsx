import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@mui/material";
import React from "react";

const useStyles = makeStyles((theme) => ({
  header: {
    width: "100%",
    margin: "10px 0",
    padding: "0 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  textContainer: {
    textAlign: "left",
    marginBottom: "10px",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
  title: {
    fontSize: "clamp(20px,2vw, 30px)",
    fontWeight: "bold",
    textAlign: "left",
    color: "#1D1F24",
    margin: "5px 0",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
  subtitle: {
    fontSize: "clamp(10px,2vw, 12px)",
    textAlign: "left",
    color: "#6B6E75",
  },
  rightContainter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "0",
    flexDirection: "row",
    gap: "20px",
    "& > *": {
      width: "fit-content",
      height: "40px",
      textAlign: "center",
      padding: "0px 10px",
      borderRadius: "8px",
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: "10px",
      flexDirection: "column",
      "& > *": {
        width: "100%",
      },
    },
  },
}));

const Header = ({ title, subtitle, children }) => {
  const classes = useStyles();

  return (
    <Box component="header" className={classes.header}>
      <Box className={classes.textContainer}>
        {title && (
          <Typography variant="h2" className={classes.title}>
            {title}
          </Typography>
        )}

        {subtitle && (
          <Typography variant="p" className={classes.subtitle}>
            {subtitle}
          </Typography>
        )}
      </Box>
      {children && <Box className={classes.rightContainter}>{children}</Box>}
    </Box>
  );
};
export default Header;
