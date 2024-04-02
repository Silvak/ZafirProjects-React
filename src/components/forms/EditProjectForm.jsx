import AddIcon from "@mui/icons-material/Add";
import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import user1 from "../../assets/Img/png/userImageMan.png";
import { useEditProjectForm } from "@/hooks/useEditProjectForm";

function EditProjectForm({ project }) {
  const {
    theme,
    isMobile,
    formData,
    handleChange,
    handleSubmit,
    handleLeaderToChange,
    handleMemberToChange,
    handleAddLeaders,
    handleAddMembers,
    handleRemoveLeader,
    handleRemoveMember,
    isLoading,
    handleClose,
    selectedUser,
    selectedMember,
    teamMembers,
    teamLeaders,
  } = useEditProjectForm(project);

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
            value={formData.name}
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
        <Grid
          item
          sx={{
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
            value={formData.link}
            sx={{
              width: "100%",
            }}
          />
        </Grid>

        <Grid
          item
          sx={{
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
            value={formData.github}
            sx={{
              width: "100%",
            }}
          />
        </Grid>
        <Grid
          item
          sx={{
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
                src={user1}
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
                src={user1}
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
            {isLoading ? "Updating..." : "Save"}
          </Button>
        </Grid>
      </Paper>
    </ThemeProvider>
  );
}

export default EditProjectForm;
