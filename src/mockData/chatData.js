import moment from "moment";
import user1 from "../assets/Img/png/userImage.png";
import user2 from "../assets/Img/png/userImageMan.png";
import user3 from "../assets/Img/png/userImageWoman.png";

 export const mockConversation = [
    {
      pic: user1,
      sender: "David",
      message: ["Hi guys!!!", "Welcome to Cuap Design 💦"],
      timestamp: moment().subtract(8, "minutes"),
    },
    {
      pic: user3,
      sender: "Amanda",
      message: [
        "On this group you can ask and chat anything about design, or some out-of-the-topic design discussions 👅",
      ],
      timestamp: moment().subtract(4, "minutes"),
    },
    {
      sender: "You",
      message: ["Hi all, glad to be invited to this awesome group!"],
      timestamp: moment().subtract(1, "minutes"),
    },
    {
      pic: user2,
      sender: "Bill",
      message: ["Hi guysssss!! This is an awesome beginning!"],
      timestamp: moment(),
    },
  ];