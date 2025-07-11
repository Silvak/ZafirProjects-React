import CustomList from "@/components/CustomList/CustomList";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  Grid,
  ListItem,
  MenuItem,
  Paper,
  Select,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { shallow } from "zustand/shallow";
import user1 from "../../assets/Img/png/userImageMan.png";
import useSuggestionUsers from "../../hooks/useSuggestionUsers";
import { useBoundStore } from "../../stores";
import { axiosInstance } from "@/config/apiConfig";
import CustomAvatar from "@/components/CustomAvatar/CustomAvatar";
import SuggestionList from "../SuggestionList/SuggestionList";
import getUniqueUsers from "../../utils/getUniqueUsers";

const INITIAL_FORM_DATA = {
  taskName: "",
  description: "",
  start: "",
  end: "",
  leaders: "",
  state: "",
  priority: "",
};

const CreateTaskForm = ({ onCreate, placeholderTaskName = "", projectId }) => {
  const theme = createTheme();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const {
    User,
    addTask,
    fetchTasksById,
    ChangeStateModal,
    ChangeTitleAlert,
    ChangeStateAlert,
    ChangeTitleAlertError,
    ChangeStateAlertError,
    setSelectedProject,
    updateProjects,
    fetchTasksByUser,
  } = useBoundStore((state) => state, shallow);
  const { users } = useSuggestionUsers();

  const [isLoading, setIsLoading] = useState(false);
  //  filtro para mostrar en la lista
  const [filteredLeaders, setFilteredLeaders] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  //  nombre del miembro
  const [member, setMember] = useState("");
  // miembros a renderizar
  const [members, setMembers] = useState([]);
  const [formData, setformData] = useState(INITIAL_FORM_DATA);

  // '/project/:projectId'
  const today = new Date().toISOString().split("T")[0];

  const handleSuggestionChange = ({ inputValue, type }) => {
    // for input leader
    if (type === "leader") {
      if (inputValue === "") {
        setFilteredLeaders([]);
      } else {
        const result = getUniqueUsers(users);

        const filter = result.filter((user) => {
          return user.name.toUpperCase().startsWith(inputValue.toUpperCase());
        });
        setFilteredLeaders(filter);
      }
    } // for input member
    else if (type === "member") {
      if (inputValue === "") {
        setFilteredMembers([]);
      } else {
        const result = getUniqueUsers(users);
        const filter = result.filter((user) => {
          return user.name.toUpperCase().startsWith(inputValue.toUpperCase());
        });
        setFilteredMembers(filter);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = {
        ...formData,
        leaders: formData.leaders._id,
        members_id: members,
      };

      // validamos que no se envie vacio
      if (Object.values(data).includes("")) {
        ChangeStateAlertError(true);
        ChangeTitleAlertError("All fields are required");
        return;
      } else {
        await addTask(data, projectId);
        // await fetchTasksByUser(User?.uid);
        await fetchTasksById(projectId);

        const promises = data.members_id.map((member) => {
          return axiosInstance.post(`projects/${projectId}/add-member`, {
            memberId: member._id,
            newRole: member.rol,
          });
        });

        // Utilizamos promise.all porque es un array de miembros
        await Promise.all(promises);

        // Actualizamos el estado del proyecto
        const response = await axiosInstance.get(`projects/${projectId}`);
        await updateProjects();
        setSelectedProject(response.data);

        // Mostramos mensaje
        ChangeStateAlert(true);
        ChangeTitleAlert("Task created successfully");
        ChangeStateModal(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const handleClose = () => {
    ChangeStateModal(false);
  };

  const handleSuggestionClick = (user, type) => {
    if (type === "leader") {
      setformData({ ...formData, leaders: user });
      setFilteredLeaders([]);
    } else {
      const alreadyExist = members.find(
        (member) => member._id.toString() === user._id.toString()
      );
      if (alreadyExist === undefined) {
        setMembers((prev) => [...prev, user]);
        setFilteredMembers([]);
        setMember("");
      } else {
        return;
      }
    }
  };

  const handleRemoveMember = (memberToRemove) => {
    const updatedMembers = members.filter(
      (member) => member._id.toString() !== memberToRemove._id.toString()
    );
    setMembers(updatedMembers);
  };

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
            Enter a task name
          </Typography>
          <TextField
            size="small"
            value={formData.taskName}
            placeholder="Task name..."
            name="taskName"
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
              // InputProps={{ inputProps: { min: today } }}
              value={formData.start}
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
              InputProps={{ inputProps: { min: formData.start } }}
              value={formData.end}
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
            value={formData.description}
            placeholder="..."
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
              marginBottom: "20px",
            }}
          >
            <Typography fontFamily={"Poppins"} color={"#6B6E75"}>
              Leader
            </Typography>
            <TextField
              size="small"
              name="leaders"
              value={formData.leaders.name}
              onChange={(e) => {
                handleChange(e);
                handleSuggestionChange({
                  inputValue: e.target.value,
                  type: "leader",
                });
              }}
              sx={{
                width: "100%",
              }}
            />
            <SuggestionList
              type="leader"
              usersList={filteredLeaders}
              onClick={handleSuggestionClick}
            />
          </Grid>
          {/* </Grid>
          <CustomList showme={filteredLeaders.length > 0}>
            {filteredLeaders.map((user) => (
              <ListItem
                key={user._id}
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    background: '#F6F7FA',
                  },
                }}
                onClick={() => {
                  handleSuggestionClick(user, 'leader');
                }}
              >
                {user.name}
              </ListItem>
            ))}
          </CustomList> */}
        </Box>

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
              name="members_id"
              value={member}
              onChange={(e) => {
                setMember(e.target.value);
                handleSuggestionChange({
                  inputValue: e.target.value,
                  type: "member",
                });
              }}
              placeholder="Search a member"
              sx={{
                width: "100%",
              }}
            />
          </Grid>
          <SuggestionList
            type="member"
            usersList={filteredMembers}
            onClick={handleSuggestionClick}
          />
          {/* <CustomList showme={filteredMembers.length > 0}>
            {filteredMembers.map((user) => (
              <ListItem
                key={user._id}
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    background: '#F6F7FA',
                  },
                }}
                onClick={() => {
                  handleSuggestionClick(user, 'member');
                }}
              >
                {user.name}
              </ListItem>
            ))}
          </CustomList> */}
        </Box>
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              gap: "8px",
              marginBottom: "0px",
              cursor: "pointer",
              width: "fit-content",
            }}
          >
            {members.map((member) => {
              return (
                <CustomAvatar
                  member={member}
                  key={member._id}
                  bgColor={member.colorBg}
                  textColor={member.colorText}
                  onClick={() => {
                    handleRemoveMember(member);
                  }}
                />
              );
            })}
          </Box>
        </Grid>
        {/* selects */}
        <Grid item xs={12}>
          <Typography sx={{ fontSize: "0.85rem" }}>Priority</Typography>
          <FormControl fullWidth>
            <Select
              required
              value={formData.priority}
              variant="outlined"
              size="small"
              sx={{ fontSize: "14px" }}
              name="priority"
              onChange={handleChange}
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
          <Typography sx={{ fontSize: "0.85rem", marginTop: 2 }}>
            State
          </Typography>
          <FormControl fullWidth>
            <Select
              required
              value={formData.state}
              variant="outlined"
              size="small"
              sx={{ fontSize: "14px" }}
              name="state"
              onChange={handleChange}
              displayEmpty
              renderValue={(selected) => (selected ? selected : "Type: All")}
            >
              <CustomMenuItem value="In Progress">In Progress</CustomMenuItem>
              <CustomMenuItem value="Pending">Pending</CustomMenuItem>
              <CustomMenuItem value="Completed">Completed</CustomMenuItem>
            </Select>
          </FormControl>
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
            {isLoading ? "Updating..." : "Save"}
          </Button>
        </Grid>
      </Paper>
    </ThemeProvider>
  );
};

export default CreateTaskForm;

const CustomMenuItem = ({ children, selected, ...props }) => {
  return (
    <MenuItem className="menu-item " sx={{ height: "min-content" }} {...props}>
      {children}
    </MenuItem>
  );
};
