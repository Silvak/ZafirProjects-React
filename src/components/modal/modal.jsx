import * as React from "react";
import { Box, Button, Divider, Modal, Typography } from "@mui/material";
import { useBoundStore } from "@/stores/index";
import { shallow } from "zustand/shallow";

const modalStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "10px",
  borderRadius: "20px",
};

const ModalGlobal = () => {
  const { stateModal, titleModal, ChangeStateModal, contentModal } =
    useBoundStore((state) => state, shallow);

  const handleClose = () => {
    ChangeStateModal(false);
  };

  return (
    <Modal
      open={stateModal}
      onClose={handleClose}
      disableEnforceFocus
      sx={{
        "& .MuiBackdrop-root": {
          backgroundColor: "transparent",
          backdropFilter: "blur(3px)",
        },
      }}
    >
      <Box sx={{ ...modalStyle, width: "auto", height: "auto" }}>
        <Box>
          <Typography
            variant="h4"
            sx={{
              padding: "1rem",
              bgcolor: "white",
              color: "black",
              fontWeight: "bold",
              borderTopLeftRadius: "16px",
              borderTopRightRadius: "16px",
            }}
          >
            {titleModal}
            <Button sx={{marginLeft:"60%", bgcolor:"lightgray", padding:"1px", width:"0.5rem"}} title="Close" variant="text" onClick={handleClose}>
              Close
            </Button>
          </Typography>
          <div>{contentModal}</div>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalGlobal;
