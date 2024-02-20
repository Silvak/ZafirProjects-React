import { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
  Avatar,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { useBoundStore } from "../../stores";

import AddIcon from "@mui/icons-material/Add";
import user1 from "../../assets/Img/png/userImageMan.png";
import user2 from "../../assets/Img/png/userImageWoman.png";
import user3 from "../../assets/Img/png/userImage.png";

function CreateProjectForm() {
  const { ChangeStateModal } = useBoundStore();
  const theme = createTheme();
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedMember, setSelectedMember] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);
  const [teamLeaders, setLeaders] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    start: "",
    end: "",
    description: "",
    link: "",
    github: "",
    leaders: teamLeaders,
    members: teamMembers,
  });

  const handleClose = () => {
    ChangeStateModal(false);
  };

  const handleSubmit = () => {
    SubmitEvent(formData);
  };

  const handleLeaderToChange = (e) => {
    setSelectedUser(e.target.value);
  };
  const handleMemberToChange = (e) => {
    setSelectedMember(e.target.value);
  };

  const handleAddLeaders = () => {
    if (selectedUser && !teamLeaders.includes(selectedUser)) {
      setLeaders([...teamLeaders, selectedUser]);
      setSelectedUser("");
    }
  };
  const handleAddMembers = () => {
    if (selectedMember && !teamMembers.includes(selectedMember)) {
      setTeamMembers([...teamMembers, selectedMember]);
      setSelectedMember("");
    }
  };

  const handleRemoveLeader = (memberToRemove) => {
    const updatedMembers = teamLeaders.filter(
      (member) => member !== memberToRemove
    );
    setLeaders(updatedMembers);
  };

  const handleRemoveMember = (memberToRemove) => {
    const updatedMembers = teamMembers.filter(
      (member) => member !== memberToRemove
    );
    setTeamMembers(updatedMembers);
  };

  const handleChange = (event) => {
    const eventName = event.target.name;
    const eventValue = event.target.value;
    setFormData({
      ...formData,
      [eventName]: [...formData[eventName], eventValue],
    });

    console.log(formData);
  };

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <ThemeProvider theme={theme}>
      {/* row - colum */}
      <Paper
        elevation={1}
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
        {/* <Grid
          item
          sx={{
            marginBottom: "30px",
          }}
        >
          <Typography variant="h5" fontFamily={"Poppins"} fontWeight={"bold"}>
            Add Project
          </Typography>
        </Grid> */}

        <Grid
          item
          sx={{
            // width: "444px",
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
              // width: "216px",
              marginRight: "12px",
            }}
          >
            <Typography fontFamily={"Poppins"} color={"#6B6E75"}>
              Start date
            </Typography>
            <TextField
              size="small"
              name="start"
              onChange={handleChange}
              sx={{
                width: "100%",
              }}
            />
          </Grid>
          <Grid
            item
            sx={{
              // width: "216px",
            }}
          >
            <Typography fontFamily={"Poppins"} color={"#6B6E75"}>
              End date
            </Typography>
            <TextField
              size="small"
              name="end"
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
            value={selectedUser}
            onChange={handleLeaderToChange}
            placeholder="Search leader"
            sx={{
              width: "100%",
            }}
          />
        </Grid>
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
            onChange={handleMemberToChange}
            placeholder="Search a member"
            sx={{
              width: "100%",
            }}
          />
        </Grid>
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
            Save
          </Button>
        </Grid>
      </Paper>
    </ThemeProvider>
  );
}

export default CreateProjectForm;
