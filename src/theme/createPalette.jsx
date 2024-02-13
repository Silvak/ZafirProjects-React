import { common } from "@mui/material/colors";
import { alpha } from "@mui/material/styles";
import { error, indigo, info, neutral, success, warning } from "./colors";

export function createPalette(mode) {
  return {
    action: {
      active: neutral[500],
      disabled: alpha(neutral[900], 0.38),
      disabledBackground: alpha(neutral[900], 0.12),
      focus: alpha(neutral[900], 0.16),
      hover: alpha(neutral[900], 0.04),
      selected: alpha(neutral[900],),
    },
    background: {
      default: common.white,
      paper: common.white,
    },
    divider: "#FFFFFF",
    error,
    info,
    icon: {
      primary: "#393d44",
      secondary: "#7662ea",
      third: "#6366F1",
      fourth: "#1d1f24",
    },
    mode: mode,
    ...(mode == "light"
      ? {
        background: {
          default: "#ECEFF3",
          paper: "#b5b5b5",
        },
        text: {
          primary: "#6b6e75",
          secondary: "#393d44",
          third: "#6366F1",
          fourth: "#1d1f24",
        },
        icon: {
          primary: "#393d44",
          secondary: "#7662ea",
          third: "#6366F1",
        },
      }
      : {
        background: {
          default: "#3B3B3B",
          paper: "#F5F5F5",
        },
        text: {
          primary: "#F5F5F5",
          secondary: "#3B3B3B",
          third: "#6366F1",
        },
        icon: {
          primary: "#F5F5F5",
          secondary: "#3B3B3B",
          third: "#7662ea",
        },
      }),
    neutral,
    primary: indigo,
    success,
    warning,
  };
}
