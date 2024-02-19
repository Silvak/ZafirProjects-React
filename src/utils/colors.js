// export const getStatusColor = (status) => {
//   switch (status) {
//     case "Pending":
//       return {
//         bg: "#F6F7FA",
//         color: "#6B6E75",
//       };
//     case "In progress":
//       return {
//         bg: "#f6b58a",
//         color: "#D49265",
//       };
//     case "Completed":
//       return {
//         bg: "#E2F3F0",
//         color: "#429482",
//       };
//     default:
//       return {
//         bg: "#FFECB3",
//         color: "#8B4513",
//       };
//   }
// };

export const statusColors = {
  "In Progress": { backgroundColor: "#BED8F5", color: "#2676CF" },
  Issues: { backgroundColor: "#F8D1CB", color: "#D3544B" },
  Review: { backgroundColor: "#F6E5C6", color: "#E19E41" },
  Completed: { backgroundColor: "#CCE3DD", color: "#277F65" },
  Pending: { backgroundColor: "#E0E5E9", color: "#7E838A" },
  Backlog: { backgroundColor: "#F0E1F1", color: "#8E44AD" },
  Working: { backgroundColor: "#E8F4E6", color: "#4C7C4A" },
};

export const priorityColors = {
  High: { backgroundColor: "#FFD1CE", color: "#E24942" },
  Medium: { backgroundColor: "#FDE9D5", color: "#E5922C" },
  Low: { backgroundColor: "#CDD9E5", color: "#4B8DC2" },
};
