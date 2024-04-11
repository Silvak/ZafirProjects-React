import React, { useEffect, useState } from "react";
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
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useParams } from "react-router-dom";

const CreateTaskForm = ({ onCreate, placeholderTaskName = "" }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const [taskName, setTaskName] = useState(placeholderTaskName);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [tags, setTags] = useState("");
  const {
    addTask,
    setTask,
    removeTask,
    updateTask,
    fetchTask,
    ChangeStateModal,
  } = useBoundStore();

  // const { id } = useParams();

  useEffect(() => {
    // Actualizamos el objeto taskData con los valores actuales de los estados
    setTaskData({
      data: [
        {
          name: taskName,
          description: description,
          tags: tags,
        },
      ],
      start: selectedDate,
      end: selectedEndDate,
      state: tags,
      priority: priority,
      projectId: 1111,
    });
  }, [taskName, startDate, endDate, description, priority, tags]);

  const [taskData, setTaskData] = useState({
    data: [
      {
        name: taskName,
        description: description,
        tags: tags,
      },
    ],
    start: selectedDate,
    end: selectedEndDate,
    state: tags,
    priority: priority,
    projectId: 1111,
  });
  // console.log(taskData);

  const [selectedUser, setSelectedUser] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);

  const handleCreate = async () => {
    if (
      !taskName ||
      !selectedDate ||
      !selectedEndDate ||
      !description ||
      !priority ||
      !tags
    ) {
      // Si algún campo obligatorio está vacío, muestra un mensaje de error y no crees la tarea
      alert("Por favor, rellena todos los campos obligatorios.");
      return;
    }
    try {
      await addTask(taskData);
    } catch (error) {
      alert("Error creating task", error);
    }
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

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
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
          <Grid container spacing={2} sx={{ marginTop: "13px" }}>
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
                required
                sx={{ fontSize: "2rem" }}
              />
            </Grid>

            <Grid
              item
              xs={6}
              sx={
                {
                  // marginRight: "12px",
                }
              }
            >
              <Typography fontFamily={"Poppins"} color={"#6B6E75"}>
                Start date
              </Typography>
              <TextField
                size="small"
                name="start"
                type="date"
                onChange={handleDateChange}
                sx={{
                  width: "100%",
                }}
              />
            </Grid>
            <Grid xs={6} item>
              <Typography fontFamily={"Poppins"} color={"#6B6E75"}>
                End date
              </Typography>
              <TextField
                size="small"
                name="end"
                type="date"
                onChange={handleEndDateChange}
                sx={{
                  width: "100%",
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography sx={{ fontSize: "0.85rem" }}>
                Add a description
              </Typography>
              <TextField
                required
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
                  required
                  value={priority}
                  variant="outlined"
                  size="small"
                  sx={{ fontSize: "2rem", bgcolor: "white" }}
                  onChange={(e) => setPriority(e.target.value)}
                  displayEmpty
                  renderValue={(selected) =>
                    selected ? selected : "Type: All"
                  }
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
                  required
                  value={tags}
                  variant="outlined"
                  size="small"
                  sx={{ fontSize: "2rem", bgcolor: "white" }}
                  onChange={(e) => setTags(e.target.value)}
                  displayEmpty
                  renderValue={(selected) =>
                    selected ? selected : "Type: All"
                  }
                >
                  <CustomMenuItem value="In Progress">
                    In Progress
                  </CustomMenuItem>
                  <CustomMenuItem value="Pending">Pending</CustomMenuItem>
                  <CustomMenuItem value="Issues">Issues</CustomMenuItem>
                  <CustomMenuItem value="Review">Review</CustomMenuItem>
                  <CustomMenuItem value="Completed">Completed</CustomMenuItem>
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
              sx={{
                color: "white",
                bgcolor: "#7662EA",
                borderRadius: "0.5rem",
              }}
            >
              Create
            </Button>
          </div>
        </Paper>
      </LocalizationProvider>
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
