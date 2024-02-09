import UserAvatar from "@/assets/Img/png/userImageMan.png";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import WorkIcon from "@mui/icons-material/Work";
import {
  Avatar,
  Box,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  Typography,
} from "@mui/material";

//styles
import { tableItemStyles } from "./styles";

const ProjectItem = ({ projectName, quantityTasks, date, file, username }) => {
  return (
    <ListItem sx={tableItemStyles.item}>
      <Box sx={tableItemStyles.itemInfoWrapper}>
        <ListItemIcon>
          <ListItemIcon sx={tableItemStyles.itemIcon}>
            <WorkIcon />
          </ListItemIcon>
        </ListItemIcon>
        <Box>
          <Typography variant="h6" sx={tableItemStyles.itemProyectName}>
            {projectName}
          </Typography>
          <Typography variant="body2" sx={tableItemStyles.itemQuantity}>
            {quantityTasks} Tasks
          </Typography>
        </Box>
      </Box>

      <Box sx={tableItemStyles.itemAvatarWrapper}>
        <ListItemAvatar>
          <Avatar sx={tableItemStyles.itemAvatar}>
            <img src={UserAvatar} alt="user avatar" />
          </Avatar>
        </ListItemAvatar>
        <Typography variant="h6" sx={tableItemStyles.itemAvatarName}>
          {username}
        </Typography>
      </Box>

      <Box sx={tableItemStyles.itemDateWrapper}>
        <WorkIcon sx={{ color: "#6B6E75" }} />
        <Typography variant="body2" sx={tableItemStyles.itemDate}>
          {date}
        </Typography>
      </Box>

      <ListItemButton color="inherit" sx={tableItemStyles.itemFileWrapper}>
        <AttachFileIcon sx={{ color: "#6B6E75", rotate: "45deg" }} />
        <Typography variant="body2">{file}</Typography>
      </ListItemButton>
    </ListItem>
  );
};
export default ProjectItem;
