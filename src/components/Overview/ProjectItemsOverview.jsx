import { Box, TableCell, useMediaQuery } from "@mui/material";
import { RenderProjectItems } from "./RenderProjectItems";
import EditIcon from '@mui/icons-material/Edit';

const BoxFlex = ({ children, sx, }) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <Box
      sx={{
        display: isMobile ? "grid" : "flex",
        alignItems: "center",
        justifyContent: isMobile ? "center" :"flex-start", // *
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
  item,
  handleEdit
}) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));


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
        height: "auto",
        width: "auto",
      }}
    >
      <BoxFlex sx={{ flex: 2 }}>
        <div
          style={{
            display: isMobile ? "flex" : "grid",
            placeContent: "center",
            backgroundColor: "#ECE9FF",
            borderRadius: "12px",
            padding: "10px",
            width: isMobile ? "auto" : "",
            justifyContent: isMobile ? "center" : ""

          }}
          onClick={() => alert("ir al proyecto")}
        >
          <RenderProjectItems category={category} />
        </div>
        <Box>
          <div onClick={() => alert("ir al proyecto")} style={{fontFamily: "Poppins"}}>
            <h2 className="projectName">{projectName}</h2>
          </div>
          <small className="quantityTasks" style={{fontFamily: "Poppins"}}>
            {quantityTasks} | {item}
          </small>
        </Box>
        <div style={{ display: "flex", marginLeft: isMobile ? "" : 'auto', color: "#6B6E75", justifyContent: isMobile ? "center" : "", backgroundColor: isMobile ? "white" : "", borderRadius: "12px", width: isMobile ? "auto" : ""}}
          onClick={handleEdit}
        >
          <EditIcon />
        </div>
      </BoxFlex>
    </TableCell>
  );
};
export default ProjectItemsOverview;
