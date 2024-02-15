import { Box, TableCell } from "@mui/material";
import { RenderProjectItems } from "./RenderProjectItems";

const BoxFlex = ({ children, sx }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: "10px",
        flex: 1,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

const ProjectItemsOverview = ({
  projectName,
  quantityTasks,
  category,
  item
}) => {
  return (
    <TableCell
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "none",
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          cursor: "pointer",
        },
        height: "71px",
        width: "320px"
      }}
      onClick={() => alert("ir al proyecto")}
    >
      <BoxFlex sx={{ flex: 2 }}>
        <div
          style={{
            display: "grid",
            placeContent: "center",
            backgroundColor: "#ECE9FF",
            borderRadius: "12px",
            padding: "10px",
          }}
        >
          <RenderProjectItems category={category} />
        </div>
        <Box >
          <h2 className="projectName">{projectName}</h2>
          <small className="quantityTasks">{quantityTasks} | {item}</small>
        </Box>
      </BoxFlex>
    </TableCell>
  );
};
export default ProjectItemsOverview;