import { Box, TableCell } from "@mui/material";
import { RenderProjectItems } from "./RenderProjectItems";
import EditIcon from '@mui/icons-material/Edit';

const BoxFlex = ({ children, sx, }) => {
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
  item,
  handleEdit
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
        width: "320px",
      }}
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
        <div style={{ marginLeft: 'auto', color: "#6B6E75"}}
          onClick={handleEdit}
        >
          <EditIcon />
        </div>
      </BoxFlex>
    </TableCell>
  );
};
export default ProjectItemsOverview;
