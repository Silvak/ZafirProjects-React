import { Accordion, ThemeProvider, createTheme } from "@mui/material";

const CustomTaskAccordion = ({ children, ...props }) => {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Accordion
        {...props}
        sx={{
          borderRadius: "16px",
          "&.MuiAccordion-root": {
            border: "none",
            "&:first-of-type": {
              borderTopLeftRadius: "16px",
              borderTopRightRadius: "16px",
            },
            "&:last-of-type": {
              borderBottomLeftRadius: "16px",
              borderBottomRightRadius: "16px",
            },
          },
        }}
      >
        {children}
      </Accordion>
    </ThemeProvider>
  );
};

export default CustomTaskAccordion;
