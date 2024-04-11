import { List, ListItem } from "@mui/material";

const SuggestionList = ({ usersList, onClick }) => {
  return (
    <List
      sx={{
        background: "#FFF",
        padding: " 0",
        color: "#000",
        position: "absolute",
        bottom: "0",
        top: "64px",
        zIndex: "9999",
        width: "100%",
        height: "fit-content",
        borderBottomLeftRadius: "6px",
        borderBottomRightRadius: "6px",
        outline: "thin solid #0002",
        display: usersList.length > 0 ? "block" : "none",
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        "& > *:not(:last-child)": {
          borderBottom: "1px solid #DDD",
        },
      }}
    >
      {usersList.map((user) => (
        <ListItem
          key={user.id}
          onClick={() => onClick(user, "leader")}
          sx={{
            cursor: "pointer",
            "&:hover": {
              background: "#F6F7FA",
            },
          }}
        >
          {user.name}
        </ListItem>
      ))}
    </List>
  );
};

export default SuggestionList;
