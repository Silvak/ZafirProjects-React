import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  ThemeProvider,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import user1 from "../../assets/Img/png/userImageMan.png";
import user2 from "../../assets/Img/png/userImageWoman.png";
import user3 from "../../assets/Img/png/userImage.png";
import { useProject } from "@/hooks/useProject";
import SuggestionList from "@/components/SuggestionList/SuggestionList";

function CreateProjectForm() {
  const {
    theme,
    isMobile,
    handleChange,
    handleSubmit,
    handleAddLeaders,
    handleAddMembers,
    handleRemoveLeader,
    handleRemoveMember,
    isLoading,
    handleClose,
    teamMembers,
    teamLeaders,
    selectedLeader,
    selectedMember,
    filteredLeaders,
    filteredMembers,
    handleSuggestionChange,
    handleSuggestionClick,
  } = useProject({ project: null, isCreated: true });

  return (
    <ThemeProvider theme={theme}>
      {/* row - colum */}
      <Paper
        elevation={1}
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: isMobile ? "90vw" : "fit-content",
          padding: "39px",
          maxHeight: "90vh",
          height: isMobile ? "90vh" : "",
          borderTopLeftRadius: "0px",
          borderTopRightRadius: "0px",
          overflowY: "auto",
          borderBottomLeftRadius: "16px",
          borderBottomRightRadius: "16px",
        }}
      >
        <Grid
          item
          sx={{
            marginBottom: "20px",
          }}
        >
          <Typography fontFamily={"Poppins"} color={"#6B6E75"}>
            Enter a project name
          </Typography>
          <TextField
            size="small"
            placeholder="Project name..."
            name="name"
            onChange={handleChange}
            sx={{
              width: "100%",
            }}
          />
        </Grid>
        {/* flex */}
        <div
          style={{
            display: "flex",
            marginBottom: "20px",
          }}
        >
          <Grid
            item
            sx={{
              marginRight: "12px",
            }}
          >
            <Typography fontFamily={"Poppins"} color={"#6B6E75"}>
              Start date
            </Typography>
            <TextField
              size="small"
              name="start"
              type="date"
              onChange={handleChange}
              sx={{
                width: "100%",
              }}
            />
          </Grid>
          <Grid item>
            <Typography fontFamily={"Poppins"} color={"#6B6E75"}>
              End date
            </Typography>
            <TextField
              size="small"
              name="end"
              type="date"
              onChange={handleChange}
              sx={{
                width: "100%",
              }}
            />
          </Grid>
        </div>

        <Grid
          item
          sx={{
            // width: "444px",
            marginBottom: "20px",
          }}
        >
          <Typography fontFamily={"Poppins"} color={"#6B6E75"}>
            Add a description...
          </Typography>
          <TextField
            size="small"
            name="description"
            onChange={handleChange}
            placeholder="..."
            sx={{
              width: "100%",
            }}
          />
        </Grid>
        <Grid
          item
          sx={{
            // width: "444px",
            marginBottom: "20px",
          }}
        >
          <Typography fontFamily={"Poppins"} color={"#6B6E75"}>
            Project link...
          </Typography>
          <TextField
            size="small"
            name="link"
            onChange={handleChange}
            sx={{
              width: "100%",
            }}
          />
        </Grid>

        <Grid
          item
          sx={{
            // width: "444px",
            marginBottom: "20px",
          }}
        >
          <Typography fontFamily={"Poppins"} color={"#6B6E75"}>
            Github
          </Typography>
          <TextField
            size="small"
            name="github"
            onChange={handleChange}
            sx={{
              width: "100%",
            }}
          />
        </Grid>
        {/* leader */}
        <Box sx={{ position: "relative" }}>
          <Grid
            item
            sx={{
              // width: "444px",
              marginBottom: "20px",
            }}
          >
            <Typography fontFamily={"Poppins"} color={"#6B6E75"}>
              Team leaders
            </Typography>
            <TextField
              size="small"
              name="leaders"
              value={selectedLeader}
              onChange={(e) => handleSuggestionChange(e, "leader")}
              placeholder="Search leader"
              sx={{
                width: "100%",
              }}
            />
          </Grid>

          <SuggestionList
            usersList={filteredLeaders}
            onClick={handleSuggestionClick}
          />
        </Box>

        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              gap: "8px",
              marginBottom: "20px",
              cursor: "pointer",
              width: "fit-content",
            }}
          >
            {teamLeaders.map((member, index) => (
              <Avatar
                title="Remove"
                key={index}
                alt={member}
                src={
                  member === "user1"
                    ? user1
                    : member === "user2"
                    ? user2
                    : member === "user3"
                    ? user3
                    : ""
                }
                onClick={() => handleRemoveLeader(member)}
                style={{ transition: "opacity 0.3s ease-in-out" }}
                onMouseOver={(e) => (e.currentTarget.style.opacity = "0.7")}
                onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
              />
            ))}
            {teamLeaders.length < 4 && (
              <IconButton
                title="Add Leader"
                sx={{ bgcolor: "lightgray" }}
                onClick={handleAddLeaders}
              >
                <AddIcon />
              </IconButton>
            )}
          </Box>
        </Grid>

        {/* members */}
        <Box sx={{ position: "relative" }}>
          <Grid
            item
            sx={{
              // width: "444px",
              marginBottom: "20px",
            }}
          >
            <Typography fontFamily={"Poppins"} color={"#6B6E75"}>
              Add members
            </Typography>
            <TextField
              size="small"
              name="members"
              value={selectedMember}
              onChange={(e) => handleSuggestionChange(e, "member")}
              placeholder="Search a member"
              sx={{
                width: "100%",
              }}
            />
          </Grid>
          <SuggestionList
            usersList={filteredMembers}
            onClick={handleSuggestionClick}
          />
        </Box>

        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              gap: "8px",
              marginBottom: "20px",
              cursor: "pointer",
              width: "fit-content",
            }}
          >
            {teamMembers.map((member, index) => (
              <Avatar
                title="Remove"
                key={index}
                alt={member}
                src={
                  member === "user1"
                    ? user1
                    : member === "user2"
                    ? user2
                    : member === "user3"
                    ? user3
                    : ""
                }
                onClick={() => handleRemoveMember(member)}
                style={{ transition: "opacity 0.3s ease-in-out" }}
                onMouseOver={(e) => (e.currentTarget.style.opacity = "0.7")}
                onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
              />
            ))}
            {teamMembers.length < 4 && (
              <IconButton
                title="Add Leader"
                sx={{ bgcolor: "lightgray" }}
                onClick={handleAddMembers}
              >
                <AddIcon />
              </IconButton>
            )}
          </Box>
        </Grid>

        {/* buttons */}
        <Grid
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "40px",
          }}
        >
          <Button
            title="Cancel"
            onClick={handleClose}
            sx={{
              textTransform: "none",
              color: "black",
              backgroundColor: "white",
              height: "40px",
              width: "75px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 500,
              fontFamily: "Poppins",
              border: "1px solid #D3D5DA",
            }}
          >
            Cancel
          </Button>
          <Button
            title="Save"
            onClick={handleSubmit}
            sx={{
              textTransform: "none",
              color: "white",
              backgroundColor: "#7662EA",
              height: "40px",
              width: "84px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 500,
              fontFamily: "Poppins",
              "&:hover": { backgroundColor: "black" },
            }}
          >
            {isLoading ? "Creating..." : "Save"}
          </Button>
        </Grid>
      </Paper>
    </ThemeProvider>
  );
}

export default CreateProjectForm;
