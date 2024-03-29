import React, { useState } from "react";
import {
  Avatar,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  Typography,
  Paper,
  useTheme,
  Grid,
  Box,
  IconButton,
  useMediaQuery,
  ThemeProvider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useBoundStore } from "../../stores/index";
import user1 from "../../assets/Img/png/userImageMan.png";
import user2 from "../../assets/Img/png/userImageWoman.png";
import user3 from "../../assets/Img/png/userImage.png";

const CreateTaskForm = ({ onCreate, placeholderTaskName = "" }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const [taskName, setTaskName] = useState(placeholderTaskName);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [tags, setTags] = useState("");
  const { ChangeStateModal } = useBoundStore();

  const [selectedUser, setSelectedUser] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);

  const handleCreate = () => {
    console.log("Task Name:", taskName);
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
    console.log("Description:", description);
    console.log("Assigned To:", teamMembers);
    console.log("Priority:", priority);
    console.log("Tags:", tags);
    handleClose();
  };

  const handleClose = () => {
    ChangeStateModal(false);
  };

  const handleAssignToChange = (e) => {
    setSelectedUser(e.target.value);
  };

  const handleAddMember = () => {
    if (selectedUser && !teamMembers.includes(selectedUser)) {
      setTeamMembers([...teamMembers, selectedUser]);
      setSelectedUser("");
    }
  };

  const handleRemoveMember = (memberToRemove) => {
    const updatedMembers = teamMembers.filter(
      (member) => member !== memberToRemove
    );
    setTeamMembers(updatedMembers);
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper
        elevation={1}
        style={{
          paddingInline: "2rem",
          maxHeight: "90vh",
          width: isMobile ? "" : "35vw",
          margin: "auto",
          background: "white",
          overflowY: "auto",
          borderBottomLeftRadius: "16px",
          borderBottomRightRadius: "16px",
          borderTopLeftRadius: "0px",
          borderTopRightRadius: "0px",
          paddingBottom: "15px",
        }}
      >
        <Grid container spacing={2} sx={{marginTop:"13px"}}>
          <Grid item xs={12}>
            <Typography sx={{ fontSize: "0.2rem", fontWeight: "normal" }}>
              Task name
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              size="small"
              sx={{ fontSize: "2rem" }}
            />
          </Grid>

          <Grid item xs={6}>
            <Typography sx={{ fontSize: "0.85rem" }}>Start date</Typography>
            <TextField
              fullWidth
              value={startDate}
              variant="outlined"
              size="small"
              onChange={(e) => setStartDate(e.target.value)}
              sx={{ fontSize: "2rem" }}
            />
          </Grid>

          <Grid item xs={6}>
            <Typography sx={{ fontSize: "0.85rem" }}>End date</Typography>
            <TextField
              variant="outlined"
              fullWidth
              value={endDate}
              size="small"
              onChange={(e) => setEndDate(e.target.value)}
              sx={{ fontSize: "2rem" }}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography sx={{ fontSize: "0.85rem" }}>
              Add a description
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={1}
              size="small"
              variant="outlined"
              placeholder="..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{ fontSize: "2rem" }}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography sx={{ fontSize: "0.85rem" }}>Assigne to</Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              sx={{ fontSize: "2", fontWeight: "normal" }}
              placeholder="Search Leader"
              value={selectedUser}
              onChange={handleAssignToChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddMember();
                }
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                gap: "8px",
                marginBottom: "4px",
                cursor: "pointer",
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
                  onClick={handleAddMember}
                >
                  <AddIcon />
                </IconButton>
              )}
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Typography sx={{ fontSize: "0.85rem" }}>Priority</Typography>
            <FormControl fullWidth>
              <Select
                value={priority}
                variant="outlined"
                size="small"
                sx={{ fontSize: "2rem", bgcolor: "white" }}
                onChange={(e) => setPriority(e.target.value)}
                displayEmpty
                renderValue={(selected) => (selected ? selected : "Type: All")}
              >
                <CustomMenuItem value="High">High</CustomMenuItem>
                <CustomMenuItem value="Medium">Medium</CustomMenuItem>
                <CustomMenuItem value="Low">Low</CustomMenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Typography sx={{ fontSize: "0.85rem" }}>Tags</Typography>
            <FormControl fullWidth>
              <Select
                value={tags}
                variant="outlined"
                size="small"
                sx={{ fontSize: "2rem", bgcolor: "white" }}
                onChange={(e) => setTags(e.target.value)}
                displayEmpty
                renderValue={(selected) => (selected ? selected : "Type: All")}
              >
                <CustomMenuItem value="In Progress">In Progress</CustomMenuItem>
                <CustomMenuItem value="Issues">Issues</CustomMenuItem>
                <CustomMenuItem value="Review">Review</CustomMenuItem>
                <CustomMenuItem value="Completed">Completed</CustomMenuItem>
                <CustomMenuItem value="Working">Working</CustomMenuItem>
                <CustomMenuItem value="Pending">Pending</CustomMenuItem>
                <CustomMenuItem value="Backlog">Backlog</CustomMenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        {/* botones */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBlock: "2rem",
          }}
        >
          <Button
            onClick={handleClose}
            variant="outlined"
            sx={{
              color: "black",
              bgcolor: "white",
              borderRadius: "0.5rem",
              border: "1px gray solid",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreate}
            variant="contained"
            sx={{ color: "white", bgcolor: "#7662EA", borderRadius: "0.5rem" }}
          >
            Create
          </Button>
        </div>
      </Paper>
    </ThemeProvider>
  );
};

export default CreateTaskForm;

const CustomMenuItem = ({ children, selected, ...props }) => {
  return (
    <MenuItem
      sx={{
        height: "min-content",
        bgcolor: selected ? "white" : "#B5B5B5",
        color: selected ? "black" : "white",
        "&:focus, &:hover": {
          bgcolor: "cyan",
          color: "blue",
        },
      }}
      {...props}
    >
      {children}
    </MenuItem>
  );
};
