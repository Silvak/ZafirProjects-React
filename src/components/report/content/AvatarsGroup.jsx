import React from 'react';
import { Avatar, AvatarGroup, useMediaQuery } from '@mui/material';
import Typography from '@mui/material/Typography';
import user1 from "../../../assets/Img/png/userImage.png";
import user2 from '../../../assets/Img/png/userImageMan.png';
import user3 from '../../../assets/Img/png/userImageWoman.png';

const AvatarsGroup = () => {
  const isMobile = useMediaQuery("(max-width:640px)");
  const isMobileSmall = useMediaQuery("(max-width:350px)");

  const userAvatar = user1;
  const otherAvatars = [user2, user3, user1, user2];

  return (
    <div style={{ padding: "10px", marginBottom:"14px" , Width: "max-content", display: "flex", alignItems: "center" }}>
      <Avatar alt="Me" src={userAvatar} sx={{border:"1px solid #ffffff"}} />
      <Typography gutterBottom style={{
        width: "max-content",
        paddingInline: "1vw",
        fontFamily: "Poppins",
        fontSize: "13px",
        fontWeight: 500,
        lineHeight: "20px",
        color: "#6B6E75",
        display: isMobileSmall ? "none" : ""
      }}>
        Owned by you
      </Typography>
      {!isMobileSmall && <AvatarGroup max={isMobile ? 2 : isMobileSmall ? 1 : 4}>
        {otherAvatars.map((avatar, index) => (
          <Avatar key={index} alt={`User ${index + 2}`} src={avatar}  sx={{border:"1px solid #ffffff"}}/>
        ))}
      </AvatarGroup>}
    </div>
  );
}

export default AvatarsGroup;
