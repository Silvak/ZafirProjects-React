export const getStatusColor = (status) => {
  switch (status) {
    case "Pending":
      return {
        bg: "#F6F7FA",
        color: "#6B6E75",
      };
    case "In progress":
      return {
        bg: "#f6b58a",
        color: "#D49265",
      };
    case "Completed":
      return {
        bg: "#E2F3F0",
        color: "#429482",
      };
    default:
      return {
        bg: "#FFECB3",
        color: "#8B4513",
      };
  }
};
