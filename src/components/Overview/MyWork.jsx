import { useState } from "react";
import { myWorkData } from "../../mockData/myWorkData";
import {
  Typography,
  Grid,
  Button,
  Box,
  ThemeProvider,
  createTheme,
  Select,
  MenuItem,
} from "@mui/material";


function MyWorkGlance() {
  const theme = createTheme();
  const [selectedValue, setSelectedValue] = useState("This Month");  
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const {pending, progress, issues, review, completed} = myWorkData;


  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: "#ffffff",
          height: "180px",
          borderRadius: "20px",
        }}
      >
        <Box sx={{
          display: "flex",
          justifyContent: "space-between",
          height: "69px"
        }}>
          <Grid item sx={{
            marginLeft: "20px",
            marginBottom: "17px",
            marginTop: "22px"
          }}>
            <Typography sx={{fontSize: "20px", fontWeight: 500, fontFamily: "Poppins"}}>My Work Glance</Typography>
          </Grid>
          <Grid item>
            <Select
              value={selectedValue}
              onChange={handleSelectChange}
              sx={{
                width: "140px",
                height: "34px",
                color: "#1D1F24",
                backgroundColor: "white",
                border: "1px solid gray",
                borderRadius: "8px",
                marginTop: "20px",
                marginRight: "20px",
                marginBottom: "15px",
                paddingTop: 1,
                fontSize: "16px",
              }}
            >
              <MenuItem
                value="This Month"
                sx={{
                  backgroundColor: "white",
                  fontSize: "12px",
                }}
              >
                This Month
              </MenuItem>
              <MenuItem
                value="This Week"
                sx={{
                  backgroundColor: "white",
                  fontSize: "12px",
                }}
              >
                This Week
              </MenuItem>
              <MenuItem
                value="Today"
                sx={{
                  backgroundColor: "white",
                  fontSize: "12px",
                }}
              >
                Today
              </MenuItem>
            </Select>
          </Grid>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "normal",
            alignItems: "center",
            marginLeft: "20px",
            marginRight: "20px"
          }}
        >
          <Grid
            item
            sx={{
              border: "1px solid #E0E3E8",
              width: "208px",
              height: "91px",
              borderRadius: "12px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              padding: 2
            }}
          >
            <div style={{display: "flex"}}>
            <div style={{ borderRadius: "4px",width:"8px", height:"33px", backgroundColor: progress.color}}></div>
            <Typography variant="h5" sx={{marginLeft: 1.5}}>{progress.total}</Typography>
          </div>
            <Typography sx={{marginLeft: 2.5}}>{progress.title}</Typography>
          </Grid>
          <Grid
            item
            sx={{
              border: "1px solid #E0E3E8",
              marginLeft: "20px",
              width: "208px",
              height: "91px",
              borderRadius: "12px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              padding: 2
            }}
          >
            <div style={{display: "flex"}}>
            <div style={{ borderRadius: "4px",width:"8px", height:"33px", backgroundColor: pending.color}}></div>
            <Typography variant="h5" sx={{marginLeft: 1.5}}>{pending.total}</Typography>
          </div>
            <Typography sx={{marginLeft: 2.5}}>{pending.title}</Typography>
          </Grid>
          <Grid
            item
            sx={{
              border: "1px solid #E0E3E8",
              marginLeft: "20px",
              width: "208px",
              height: "91px",
              borderRadius: "12px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              padding: 2
            }}
          >
            <div style={{display: "flex"}}>
            <div style={{ borderRadius: "4px",width:"8px", height:"33px", backgroundColor: issues.color}}></div>
            <Typography variant="h5" sx={{marginLeft: 1.5}}>{issues.total}</Typography>
          </div>
            <Typography sx={{marginLeft: 2.5}}>{issues.title}</Typography>
          </Grid>
          <Grid
            item
            sx={{
              border: "1px solid #E0E3E8",
              marginLeft: "20px",
              width: "208px",
              height: "91px",
              borderRadius: "12px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              padding: 2
            }}
          >
            <div style={{display: "flex"}}>
            <div style={{ borderRadius: "4px",width:"8px", height:"33px", backgroundColor: review.color}}></div>
            <Typography variant="h5" sx={{marginLeft: 1.5}}>{review.total}</Typography>
          </div>
            <Typography sx={{marginLeft: 2.5}}>{review.title}</Typography>
          </Grid>
          <Grid
            item
            sx={{
              border: "1px solid #E0E3E8",
              marginLeft: "20px",
              width: "208px",
              height: "91px",
              borderRadius: "12px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              padding: 2
            }}
          > 
          <div style={{display: "flex"}}>
            <div style={{ borderRadius: "4px",width:"8px", height:"33px", backgroundColor: completed.color}}></div>
            <Typography variant="h5" sx={{marginLeft: 1.5}}>{completed.total}</Typography>
          </div>
            <Typography sx={{marginLeft: 2.5}}>{completed.title}</Typography>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default MyWorkGlance;
