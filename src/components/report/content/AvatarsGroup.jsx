import React from "react";
import { Avatar, AvatarGroup, useMediaQuery } from "@mui/material";
import Typography from "@mui/material/Typography";
import user1 from "../../../assets/Img/png/userImage.png";
import user2 from "../../../assets/Img/png/userImageMan.png";
import user3 from "../../../assets/Img/png/userImageWoman.png";

const AvatarsGroup = ({ projectSelected }) => {
  const isMobile = useMediaQuery("(max-width:640px)");
  const isMobileSmall = useMediaQuery("(max-width:350px)");
  console.log(projectSelected);

  const userAvatar = user1;
  const otherAvatars = [user2, user3, user1, user2];

  return (
    <div
      style={{
        padding: "10px",
        marginBottom: "14px",
        display: "flex",
        alignItems: "center",
        width: "50vw",
        gap: 8,
      }}
    >
      <Avatar alt="Me" src={userAvatar} sx={{ border: "1px solid #ffffff" }} />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          gap: 4,
        }}
      >
        <p>Owned by</p>
        <p style={{ fontWeight: "bold" }}>{projectSelected.responsible}</p>
      </div>
      {/* {!isMobileSmall && (
        <AvatarGroup max={isMobile ? 2 : isMobileSmall ? 1 : 4}>
          {otherAvatars.map((avatar, index) => (
            <Avatar
              key={index}
              alt={`User ${index + 2}`}
              src={avatar}
              sx={{ border: "1px solid #ffffff" }}
            />
          ))}
        </AvatarGroup>
      )} */}
    </div>
  );
};

export default AvatarsGroup;
