import { IoCartOutline } from "react-icons/io5";
import { FaSpaceAwesome } from "react-icons/fa6";
import { LuCoffee } from "react-icons/lu";
import { PiWindowsLogo } from "react-icons/pi";

import BoxIcon from "@/components/BoxIcon/BoxIcon";

const iconSize = 15;

export const RenderIconByCategory = ({ category }) => {
  switch (category) {
    case "coffee":
      return (
        <BoxIcon bg="#459CED">
          <LuCoffee size={iconSize} />
        </BoxIcon>
      );
    case "work":
      return (
        <BoxIcon bg="#7662EA">
          <FaSpaceAwesome size={iconSize} />
        </BoxIcon>
      );
    case "microsoft":
      return (
        <BoxIcon bg="#459CED">
          <PiWindowsLogo size={iconSize} />
        </BoxIcon>
      );
    case "cart":
      return (
        <BoxIcon bg="#222683">
          <IoCartOutline size={iconSize} />
        </BoxIcon>
      );
    default:
      return null;
  }
};
