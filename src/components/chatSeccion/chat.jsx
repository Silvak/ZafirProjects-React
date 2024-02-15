import React, { useState } from "react";
import {
  Typography,
  useTheme,
  Paper,
  ThemeProvider,
  Box,
  Avatar,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";

import moment from "moment";
import { mockConversation as initialMockConversation } from "../../mockData/chatData";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';

const ChatMessage = () => {
  const theme = useTheme();
  const [newMessage, setNewMessage] = useState("");
  const [mockConversation, setMockConversation] = useState(
    initialMockConversation
  );

  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      const newChat = {
        sender: "You",
        message: [newMessage],
        timestamp: moment(),
      };
      setMockConversation([...mockConversation, newChat]);
      setNewMessage("");
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = moment();
    const messageTime = moment(timestamp);

    const minutesDiff = now.diff(messageTime, "minutes");
    const hoursDiff = now.diff(messageTime, "hours");

    if (minutesDiff < 1) {
      return "just now";
    } else if (minutesDiff < 60) {
      return `${minutesDiff} min ago`;
    } else if (hoursDiff < 24) {
      return `${hoursDiff}h ago`;
    } else {
      return messageTime.format("h:mm A");
    }
  };


  const handleClip = () => {
    alert("presioné el icono de clip")
  }
  const handleEmoji = () => {
    alert("presioné el icono de emoji")
  }

  return (
    <ThemeProvider theme={theme}>
      <Paper
        elevation={3}
        style={{
          paddingInline: "1rem",
          paddingBlock: "0.5rem",
          width: "auto",
          maxHeight: "85vh",
          margin: "auto",
          background: "white",
          overflow: "auto",
          borderBottomRightRadius: "16px",
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        }}
      >
        {mockConversation.map((msg, index) => (
          <Box
            key={index}
            display="grid"
            gridTemplateColumns="1fr 11fr"
            alignItems="center"
            mb={2}
          >
            <Box>
              {msg.sender !== "You" && (
                <Avatar
                  alt={msg.sender}
                  src={msg.pic}
                  sx={{ ml: 3, mb: "90%" }}
                />
              )}
            </Box>
            <Box>
              <Typography
                sx={{
                  fontWeight: "bold",
                  marginLeft: msg.sender !== "You" ? "0.8rem" : "95%",
                  marginBottom: "-0.5rem",
                }}
              >
                {msg.sender}
              </Typography>
              <div>
                {msg.message.map((dialog, dialogIndex) => (
                  <>
                    <Paper
                      key={dialogIndex}
                      variant="body1"
                      sx={{
                        border: "1px solid lightgray",
                        padding: 1,
                        borderRadius: 2,
                        borderBottomRightRadius: msg.sender === "You" ? 0 : "",
                        borderTopLeftRadius: msg.sender !== "You" ? 0 : "",
                        marginBlock: 1,
                        backgroundColor:
                          msg.sender === "You" ? "#7662EA" : "white",
                        color: msg.sender === "You" ? "white" : "black",
                        marginLeft:
                          msg.sender === "You"
                            ? "auto"
                            : !msg.pic
                            ? "3.5rem"
                            : "8px",
                        maxWidth: "fit-content",
                      }}
                    >
                      {dialog}
                    </Paper>
                  </>
                ))}
                <Typography
                  variant="span"
                  color="textSecondary"
                  sx={{
                    marginTop: "0.5rem",
                    display: "block",
                    width: "max-content",
                    marginLeft: msg.sender !== "You" ? "0.8rem" : "auto",
                    color: "gray",
                  }}
                >
                  {formatTimestamp(msg.timestamp)}
                </Typography>
              </div>
            </Box>
          </Box>
        ))}

        <Box display="flex" alignItems="center" mt={2} p={1}>
          <OutlinedInput
            placeholder="Write your messages..."
            fullWidth
            value={newMessage}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            sx={{
              borderRadius: "16px",
              backgroundColor: "rgba(0, 0, 0, 0.05)",
            }}
            startAdornment={
              <InputAdornment position="start">
                <IconButton onClick={handleEmoji}>
                  <SentimentSatisfiedOutlinedIcon sx={{color:"gray"}}/>
                </IconButton>
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handleClip}>
                  <AttachFileIcon sx={{color:"gray"}}/>
                </IconButton>
              </InputAdornment>
            }
          />
        </Box>
      </Paper>
    </ThemeProvider>
  );
};

export default ChatMessage;
